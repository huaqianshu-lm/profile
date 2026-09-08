export const appState = {
  viewport: { width: 0, height: 0, dpr: 1 },
  mouse: { x: 0, y: 0, tx: 0, ty: 0 },
  timeline: { progress: 0, phase: 'SEED' },
  hoveredWorkIndex: -1,
  worksAnimationsAreRunning: false,
  detail: {
    detailMode: false,
    detailSourceCard: null,
    detailReturnRect: null,
    selectedWorkIndex: -1
  }
};

export function setTimelineProgress(progress, phase) {
  appState.timeline.progress = progress;
  if (phase) appState.timeline.phase = phase;
}

export function advanceTimelineRuntime({ progress, phase, mouse, canOpenWork }) {
  setTimelineProgress(progress, phase);
  if (!canOpenWork) appState.hoveredWorkIndex = -1;
  mouse.x += (mouse.tx - mouse.x) * .04;
  mouse.y += (mouse.ty - mouse.y) * .04;
  return Object.freeze({
    timeline: Object.freeze({ progress: appState.timeline.progress, phase: appState.timeline.phase }),
    mouse: Object.freeze({ x: mouse.x, y: mouse.y, tx: mouse.tx, ty: mouse.ty }),
    pointerSettling: Math.abs(mouse.tx - mouse.x) > .001 || Math.abs(mouse.ty - mouse.y) > .001,
    canOpenWork: Boolean(canOpenWork)
  });
}
