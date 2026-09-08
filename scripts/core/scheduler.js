export function createScheduler(render, beforeRender = () => undefined) {
  let frameId = 0;
  let dirty = true;
  let lastReason = 'init';

  const tick = timestamp => {
    frameId = 0;
    const wasDirty = dirty;
    dirty = false;
    const meta = Object.freeze({ reason: lastReason, wasDirty });
    const runtime = beforeRender(timestamp, meta);
    const keepRunning = render(timestamp, Object.freeze({ ...meta, runtime }));
    if (dirty || keepRunning) frameId = requestAnimationFrame(tick);
  };

  const invalidate = reason => {
    dirty = true;
    lastReason = reason || 'unknown';
    if (!frameId && document.visibilityState !== 'hidden') frameId = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    dirty = false;
  };

  return Object.freeze({ invalidate, stop, isRunning: () => Boolean(frameId) });
}
