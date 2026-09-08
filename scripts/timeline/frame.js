import { canvasTheme as defaultCanvasTheme, canvasRgba as defaultCanvasRgba, runtimeTheme as defaultRuntimeTheme } from '../core/theme.js';
import { clamp, TIMELINE_OVERLAY_WINDOWS, TIMELINE_RANGES, TIMELINE_WINDOWS } from './math.js';

export function createTimelineFrame(deps) {
  const {
    appState,
    geometry,
    canvasSurface,
    canvasTheme = defaultCanvasTheme,
    canvasRgba = defaultCanvasRgba,
    runtimeTheme = defaultRuntimeTheme,
    getVisualState,
    items,
    cards,
    nodes,
    dom,
    tools = {}
  } = deps;

  return function createFrameContext(timestamp, meta = {}) {
    if (!meta.runtime) throw new Error('Timeline runtime must be advanced before rendering');
    const visual = getVisualState();
    const { timeline, mouse, pointerSettling, canOpenWork } = meta.runtime;
    const frameMouse = Object.freeze({ ...mouse });
    const offset = Object.freeze({ x: frameMouse.x * 7, y: frameMouse.y * 5 });
    const siteProgress = timeline.progress;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return Object.freeze({
      timestamp,
      reason: meta.reason || 'unknown',
      wasDirty: Boolean(meta.wasDirty),
      siteProgress,
      phase: timeline.phase,
      normalizedCanvasProgress: clamp(siteProgress / TIMELINE_WINDOWS.canvasProgressScale),
      width: visual.W,
      height: visual.H,
      branches: visual.branches,
      buds: visual.buds,
      dust: visual.dust,
      offset,
      mouse: frameMouse,
      pointerSettling,
      canOpenWork,
      reducedMotion,
      canvasAnimationActive: !appState.detail.detailMode && siteProgress < TIMELINE_OVERLAY_WINDOWS.seedGrowCanvasEnd,
      visible: document.visibilityState !== 'hidden',
      appState,
      geometry,
      canvasSurface,
      canvasTheme,
      canvasRgba,
      runtimeTheme,
      items,
      cards,
      nodes,
      dom,
      ranges: TIMELINE_RANGES,
      windows: TIMELINE_WINDOWS,
      overlayWindows: TIMELINE_OVERLAY_WINDOWS,
      tools
    });
  };
}
