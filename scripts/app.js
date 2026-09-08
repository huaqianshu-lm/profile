import { WORKS } from './data/works.js';
import { assertDom } from './core/dom.js';
import { createWorkNodes, createWorkCards, bindCardInteractions } from './works/cards.js';
import { createDetailController } from './works/detail.js';
import { cleanupDetailAudio, cleanupDetailVideo } from './media/music-player.js';
import { buildDetailPreview } from './previews/index.js';
import { canvasTheme, canvasRgba, createThemeController } from './core/theme.js';
import { advanceTimelineRuntime, appState } from './core/state.js';
import { createGeometryCache } from './timeline/geometry.js';
import { clamp, resolveTimelinePhase, TIMELINE_RANGES, TIMELINE_WINDOWS } from './timeline/math.js';
import { createScheduler } from './core/scheduler.js';
import { createCanvasSurface, createCanvasScene, createCanvasTools, createNearestBudAccessor } from './timeline/canvas.js';
import { createTimelineRenderer } from './timeline/renderer.js';
import { createTimelineFrame } from './timeline/frame.js';
import { prepareExploringLinks } from './timeline/stages/exploring.js';
import { getWorksFinalGeometry } from './timeline/stages/works.js';

const items = WORKS;
const dom = assertDom();
const {
  hero, stickyStage, canvas, themeToggle, themeToggleLabel, themeColorMeta,
  mobileNavToggle, mobileNavPanel, navJumps, exploreField, methodLayout,
  thinkNode, buildNode, connectNode, endLayer, endPoint, endGatherDots
} = dom;

const canvasSurface = createCanvasSurface(canvas);
const canvasScene = createCanvasScene();
const canvasTools = createCanvasTools({ surface: canvasSurface, getTheme: canvasTheme, rgba: canvasRgba });
const theme = createThemeController({ toggle: themeToggle, label: themeToggleLabel, meta: themeColorMeta });
const mouse = appState.mouse;

prepareExploringLinks(exploreField);
const geometry = createGeometryCache({
  hero,
  methodLayout,
  phaseElements: {
    exploreLayer: dom.exploreLayer,
    exploreField,
    methodNodes: () => [thinkNode, buildNode, connectNode],
    endLayer,
    endPoint,
    seedEls: () => [...exploreField.querySelectorAll('.explore-seed')],
    endGatherDots
  }
});

const nodes = createWorkNodes({ items, nodeLayer: dom.nodeLayer });
const cards = createWorkCards({ items, cardLayer: dom.cardLayer });
let scheduler = null;
let W = 0;
let H = 0;
let dpr = Math.min(devicePixelRatio || 1, 2);
const nearestBud = createNearestBudAccessor({ scene: canvasScene, getWidth: () => W, getHeight: () => H });

function setMobileNavOpen(open) {
  if (!mobileNavToggle || !mobileNavPanel) return;
  const next = Boolean(open);
  mobileNavToggle.setAttribute('aria-expanded', String(next));
  mobileNavToggle.setAttribute('aria-label', next ? 'Close navigation' : 'Open navigation');
  mobileNavPanel.setAttribute('aria-hidden', String(!next));
  mobileNavPanel.classList.toggle('is-open', next);
}

function progress() {
  return clamp((window.scrollY - geometry.getHeroTop()) / geometry.getScrollRange());
}

function scrollToTimelineProgress(targetProgress) {
  const target = clamp(targetProgress);
  const targetY = geometry.getHeroTop() + geometry.getScrollRange() * target;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: targetY, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function resize() {
  W = innerWidth;
  H = innerHeight;
  dpr = Math.min(devicePixelRatio || 1, 2);
  appState.viewport = { width: W, height: H, dpr };
  canvasSurface.resize(W, H, dpr);
  canvasScene.rebuild(W, H);
  geometry.measure({ width: W, height: H, dpr });
  if (appState.detail.detailMode && dom.workDetailCard.classList.contains('is-expanded')) {
    requestAnimationFrame(() => detail.setRect(detail.getTargetRect()));
  }
  scheduler?.invalidate('resize');
}

const detail = createDetailController({
  state: appState.detail,
  items,
  cards,
  dom,
  getProgress: progress,
  getViewport: geometry.getViewport,
  buildDetailPreview: item => buildDetailPreview({ item, preview: dom.workDetailPreview }),
  cleanupDetailAudio,
  cleanupDetailVideo,
  onInvalidate: reason => scheduler?.invalidate(reason)
});

bindCardInteractions({
  cards,
  items,
  isDetailOpen: () => appState.detail.detailMode,
  onOpen: detail.open,
  onRefreshOrigin: index => {
    if (appState.hoveredWorkIndex === index) detail.refreshOrigin(index);
  },
  onHoverChange: (next, previous) => {
    if (next >= 0) appState.hoveredWorkIndex = next;
    else if (appState.hoveredWorkIndex === previous) appState.hoveredWorkIndex = -1;
  }
});

if (dom.endEmailLink) {
  dom.endEmailLink.addEventListener('click', event => {
    const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!desktopPointer) return;
    event.preventDefault();
    const composeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=huaqianshu.lm%40gmail.com';
    const composeWindow = window.open(composeUrl, '_blank', 'noopener,noreferrer');
    if (!composeWindow) window.location.href = 'mailto:huaqianshu.lm@gmail.com';
  });
}

const frameRenderer = createTimelineFrame({
  appState,
  geometry,
  canvasSurface,
  getVisualState: canvasScene.getVisualState,
  items,
  cards,
  nodes,
  dom,
  tools: {
    ...canvasTools,
    nearestBud,
    getWorksFinalGeometry
  }
});
const stageRenderer = createTimelineRenderer(frameRenderer);
scheduler = createScheduler(
  (timestamp, meta) => stageRenderer.render(timestamp, meta),
  () => {
    const siteProgress = progress();
    return advanceTimelineRuntime({
      progress: siteProgress,
      phase: resolveTimelinePhase(siteProgress, TIMELINE_RANGES),
      mouse,
      canOpenWork: !appState.detail.detailMode
        && siteProgress >= TIMELINE_WINDOWS.workOpenStart
        && siteProgress <= TIMELINE_WINDOWS.workOpenEnd
    });
  }
);

navJumps.forEach(button => {
  button.addEventListener('click', () => {
    const target = Number(button.dataset.timelineProgress);
    if (Number.isFinite(target)) scrollToTimelineProgress(target);
    setMobileNavOpen(false);
    scheduler?.invalidate('nav');
  });
});

mobileNavToggle?.addEventListener('click', event => {
  event.stopPropagation();
  setMobileNavOpen(mobileNavToggle.getAttribute('aria-expanded') !== 'true');
});
mobileNavPanel?.addEventListener('click', event => event.stopPropagation());
document.addEventListener('click', () => setMobileNavOpen(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMobileNavOpen(false);
});
addEventListener('resize', () => {
  if (innerWidth > 860) setMobileNavOpen(false);
});

themeToggle?.addEventListener('click', () => {
  theme.set(theme.current() === 'dark' ? 'light' : 'dark');
  scheduler?.invalidate('theme');
});
theme.applyUI();

addEventListener('mousemove', event => {
  mouse.tx = event.clientX / W - .5;
  mouse.ty = event.clientY / H - .5;
  scheduler?.invalidate('pointer');
});
addEventListener('mouseleave', () => {
  mouse.tx = 0;
  mouse.ty = 0;
  scheduler?.invalidate('pointer-leave');
});
addEventListener('resize', resize);
addEventListener('scroll', () => scheduler?.invalidate('scroll'), { passive: true });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') scheduler?.stop();
  else scheduler?.invalidate('visibility');
});

resize();
scheduler.invalidate('init');
