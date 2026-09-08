import { renderSeedGrowCanvasBackdrop, renderSeedGrowHud, renderSeedGrowStage } from './stages/seed-grow.js';
import { renderWorks } from './stages/works.js';
import { renderMethod } from './stages/method.js';
import { renderExploring } from './stages/exploring.js';
import { renderEnding } from './stages/ending.js';
import { getActiveTimelineStages, TIMELINE_RANGES } from './math.js';

const STAGE_RENDERERS = Object.freeze({
  seedGrow: renderSeedGrowStage,
  works: renderWorks,
  method: renderMethod,
  exploring: renderExploring,
  ending: renderEnding
});

export function createTimelineRenderer(createFrameContext) {
  return Object.freeze({
    render(timestamp, meta) {
      const frame = createFrameContext(timestamp, meta);
      renderSeedGrowCanvasBackdrop(frame);
      renderSeedGrowHud(frame);
      const stageNames = getActiveTimelineStages(frame.siteProgress, frame.ranges);
      const stageKeepRunning = stageNames.some(name => STAGE_RENDERERS[name](frame));
      const keepRunning = frame.canvasAnimationActive || stageKeepRunning || frame.pointerSettling;
      return !frame.reducedMotion && frame.visible && keepRunning;
    }
  });
}

export { TIMELINE_RANGES, STAGE_RENDERERS };
