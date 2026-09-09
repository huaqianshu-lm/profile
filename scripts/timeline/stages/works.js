import { clamp, lerp, smooth } from '../math.js';

function getWorksFinalGeometry(frame, index) {
  const { width: W, height: H, items } = frame;
  const item = items[index];
  if (W < 760) {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const rowY = [.31, .52, .73][row] || .73;
    return {
      x: (column ? .735 : .265) * W,
      y: rowY * H,
      w: W * .43,
      h: clamp(H * .176, 116, 142)
    };
  }
  return { x: item.card[0] * W, y: item.card[1] * H, w: item.card[2] * W, h: item.card[3] * H };
}

function layoutNodePhase(frame, progress) {
  const { nodes, width: W, height: H, offset, tools, windows } = frame;
  const { nearestBud } = tools;
  const alpha = smooth(windows.worksNodeInStart, windows.worksNodeInEnd, progress) * (1 - smooth(windows.worksNodeOutStart, windows.worksNodeOutEnd, progress));
  const move = smooth(windows.worksNodeMoveStart, windows.worksNodeMoveEnd, progress);
  const used = new Set();

  nodes.forEach((ui, index) => {
    const bud = nearestBud(ui.item.pos[0], ui.item.pos[1], used);
    if (!bud) {
      ui.wrap.style.opacity = 0;
      return;
    }
    const anchorX = bud.x + offset.x;
    const anchorY = bud.y + offset.y;
    ui.wrap.style.left = `${anchorX}px`;
    ui.wrap.style.top = `${anchorY}px`;
    ui.wrap.style.opacity = alpha;
    ui.wrap.style.transform = `translate(-50%,-50%) scale(${.9 + alpha * .1})`;

    const rightSide = ui.item.pos[0] >= .5;
    const dx = W < 760 ? (rightSide ? 26 : -26) : (rightSide ? 42 : -42);
    const dy = W < 760 ? 0 : (index % 2 === 0 ? -8 : 8);
    const extraX = lerp(0, dx, move);
    const extraY = lerp(0, dy, move);
    const length = Math.hypot(extraX, extraY);
    const angle = Math.atan2(extraY, extraX) * 180 / Math.PI;
    ui.leader.style.left = '0px';
    ui.leader.style.top = '0px';
    ui.leader.style.width = `${length}px`;
    ui.leader.style.transform = `rotate(${angle}deg)`;
    ui.leader.style.opacity = .25 + alpha * .55;
    ui.label.style.left = `${extraX}px`;
    ui.label.style.top = `${extraY}px`;
    ui.label.style.transform = `translate(${rightSide ? 8 : -100}%, -50%)`;
  });
}

function layoutCardPhase(frame, progress) {
  const { cards, items, tools, offset, appState, windows } = frame;
  const { nearestBud } = tools;
  const used = new Set();
  cards.forEach((card, index) => {
    const item = items[index];
    const bud = nearestBud(item.pos[0], item.pos[1], used);
    if (!bud) {
      card.style.opacity = 0;
      return;
    }
    const start = windows.worksCardStart + index * windows.worksCardStagger;
    const local = smooth(start, windows.worksCardEnd, progress);
    const appear = smooth(start, start + windows.worksCardAppearSpan, progress);
    const settle = smooth(start + windows.worksCardSettleOffset, windows.worksCardSettleEnd, progress);
    const finalGeom = getWorksFinalGeometry(frame, index);
    const x = lerp(bud.x + offset.x * 0, finalGeom.x, settle);
    const y = lerp(bud.y + offset.y * 0, finalGeom.y, settle);
    const w = lerp(18, finalGeom.w, local);
    const h = lerp(18, finalGeom.h, local);
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;
    card.style.width = `${w}px`;
    card.style.height = `${h}px`;
    card.style.opacity = appear;
    const hovered = !appState.detail.detailMode && appState.hoveredWorkIndex === index;
    const hoverScale = hovered ? .014 : 0;
    card.style.transform = `translate(-50%,-50%) translateY(${hovered ? -3 : 0}px) scale(${.88 + local * .12 + hoverScale})`;
    card.style.borderRadius = `${lerp(999, 24, local)}px`;
    const meta = card.querySelector('.meta');
    if (meta) meta.style.opacity = smooth(start + windows.worksCardMetaStartOffset, start + windows.worksCardMetaEndOffset, progress);
    if (local > windows.worksCardMorphThreshold) card.classList.add('morphing');
    else card.classList.remove('morphing');
  });
}

export function renderWorks(frame) {
  const { dom, siteProgress, normalizedCanvasProgress: canvasProgress, items, cards, appState, runtimeTheme, canvasRgba, geometry, tools, windows } = frame;
  const animationsActive = !frame.reducedMotion
    && frame.visible
    && !appState.detail.detailMode
    && siteProgress < windows.worksOutEnd;
  dom.cardLayer.classList.toggle('animations-active', animationsActive);
  appState.worksAnimationsAreRunning = animationsActive;

  layoutNodePhase(frame, canvasProgress);
  layoutCardPhase(frame, canvasProgress);

  if (siteProgress < windows.worksAbstractStart) {
    cards.forEach(card => {
      const visual = card.querySelector('.visual');
      const shade = card.querySelector('.shade');
      const meta = card.querySelector('.meta');
      if (visual) visual.style.opacity = 1;
      if (shade) shade.style.opacity = 1;
      if (meta) meta.style.opacity = 1;
      card.style.background = '';
    });
  }

  const cardAbstract = smooth(windows.worksAbstractStart, windows.worksAbstractEnd, siteProgress);
  const worksOut = 1 - smooth(windows.worksOutStart, windows.worksOutEnd, siteProgress);
  cards.forEach(card => {
    const visual = card.querySelector('.visual');
    const shade = card.querySelector('.shade');
    const meta = card.querySelector('.meta');
    if (visual) visual.style.opacity = 1 - cardAbstract;
    if (shade) shade.style.opacity = 1 - cardAbstract * .78;
    if (meta) meta.style.opacity = 1 - cardAbstract;
    card.style.borderColor = canvasRgba(runtimeTheme().cardBorder, .10 * (1 - cardAbstract) + .035);
    card.style.background = canvasRgba(runtimeTheme().cardSurface, .035 * (1 - cardAbstract));
  });

  dom.cardLayer.style.opacity = worksOut;
  dom.cardLayer.style.transform = `scale(${1 - smooth(windows.worksCardScaleStart, windows.worksOutEnd, siteProgress) * .018})`;
  dom.cardLayer.style.filter = `blur(${smooth(windows.worksCardBlurStart, windows.worksCardBlurEnd, siteProgress) * 3}px)`;
  dom.nodeLayer.style.opacity = 1 - smooth(windows.nodeFadeStart, windows.nodeFadeEnd, siteProgress);

  const bridgeAlpha = smooth(windows.bridgeInStart, windows.bridgeInEnd, canvasProgress)
    * (1 - smooth(windows.bridgeOutStart, windows.bridgeOutEnd, canvasProgress))
    * (1 - smooth(windows.bridgeHideStart, windows.bridgeHideEnd, siteProgress));
  dom.bridge.style.opacity = bridgeAlpha;

  const titleIn = smooth(windows.worksTitleInStart, windows.worksTitleInEnd, canvasProgress);
  const titleOut = 1 - smooth(windows.worksTitleOutStart, windows.worksTitleOutEnd, siteProgress);
  dom.worksStageTitle.style.opacity = titleIn * titleOut * .94;
  dom.worksStageTitle.style.transform = `translateY(${10 * (1 - titleIn)}px)`;

  const { canOpenWork } = frame;
  cards.forEach((card, index) => {
    card.style.pointerEvents = canOpenWork ? 'auto' : 'none';
    if (!canOpenWork && appState.hoveredWorkIndex === index) card.classList.remove('is-hovered');
  });
  return false;
}

export function resetWorks({ dom, cards, nodes, appState }) {
  dom.cardLayer.classList.remove('animations-active');
  appState.worksAnimationsAreRunning = false;
  dom.cardLayer.style.opacity = 0;
  dom.cardLayer.style.transform = 'scale(.982)';
  dom.cardLayer.style.filter = 'blur(3px)';
  dom.nodeLayer.style.opacity = 0;
  dom.bridge.style.opacity = 0;
  dom.worksStageTitle.style.opacity = 0;
  dom.worksStageTitle.style.transform = 'translateY(10px)';
  appState.hoveredWorkIndex = -1;

  nodes.forEach(({ wrap }) => {
    wrap.style.opacity = 0;
  });
  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.pointerEvents = 'none';
    card.classList.remove('morphing', 'is-hovered');
  });
}

export { getWorksFinalGeometry };
