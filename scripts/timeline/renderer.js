import { renderSeedGrowCanvasBackdrop, renderSeedGrowHud, renderSeedGrowStage, resetSeedGrowStage } from './stages/seed-grow.js';
import { renderWorks, resetWorks } from './stages/works.js?v=20260909-works-card-animation';
import { renderMethod, resetMethod } from './stages/method.js';
import { renderExploring, resetExploring } from './stages/exploring.js';
import { renderEnding, resetEnding } from './stages/ending.js';
import { getActiveTimelineStages, TIMELINE_RANGES } from './math.js';

const STAGE_RENDERERS = Object.freeze({
  seedGrow: renderSeedGrowStage,
  works: renderWorks,
  method: renderMethod,
  exploring: renderExploring,
  ending: renderEnding
});

const STAGE_RESETTERS = Object.freeze({
  seedGrow: resetSeedGrowStage,
  works: resetWorks,
  method: resetMethod,
  exploring: resetExploring,
  ending: resetEnding
});

export function createTimelineRenderer(createFrameContext) {
  return Object.freeze({
    render(timestamp, meta) {
      const frame = createFrameContext(timestamp, meta);
      renderSeedGrowCanvasBackdrop(frame);
      renderSeedGrowHud(frame);
      const stageNames = getActiveTimelineStages(frame.siteProgress, frame.ranges);
      Object.keys(STAGE_RESETTERS).forEach(name => {
        if (!stageNames.includes(name)) STAGE_RESETTERS[name](frame);
      });
      const stageKeepRunning = stageNames.some(name => STAGE_RENDERERS[name](frame));
      const keepRunning = frame.canvasAnimationActive || stageKeepRunning || frame.pointerSettling;
      return !frame.reducedMotion && frame.visible && keepRunning;
    }
  });
}

export { TIMELINE_RANGES, STAGE_RENDERERS, STAGE_RESETTERS };
