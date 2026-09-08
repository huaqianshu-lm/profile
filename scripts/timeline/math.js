export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function smooth(start, end, value) {
  const x = clamp((value - start) / (end - start));
  return x * x * (3 - 2 * x);
}

export function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

export function seededRandom(seed) {
  const value = Math.sin(seed * 987.123) * 43758.5453;
  return value - Math.floor(value);
}

export const TIMELINE_RANGES = Object.freeze({
  seedEnd: .09,
  growEnd: .22,
  worksStart: .22,
  worksEnd: .45,
  methodStart: .45,
  methodEnd: .67,
  exploringStart: .67,
  exploringEnd: .87,
  endingStart: .87,
  seedGrowRenderEnd: .485,
  seedGrowSemanticEnd: .405,
  worksRenderEnd: .545,
  methodRenderStart: .405,
  methodSemanticStart: .445,
  methodRenderEnd: .720,
  exploringRenderStart: .650,
  exploringRenderEnd: .970,
  endingRenderStart: .865
});

export const TIMELINE_WINDOWS = Object.freeze({
  canvasProgressScale: .40,
  canvasRippleEnd: .26,
  canvasSparkStart: .18,
  canvasSparkEnd: .72,
  canvasWireStart: .32,
  canvasWireInEnd: .46,
  canvasWireOutStart: .64,
  canvasWireEnd: .78,
  canvasTreeFadeStart: .73,
  canvasTreeFadeEnd: .94,
  canvasDustFadeStart: .82,
  canvasDustFadeEnd: .99,
  canvasHaloStart: .02,
  canvasHaloEnd: .18,
  canvasBudsStart: .70,
  canvasBudsEnd: .86,
  canvasSeedFadeStart: .86,
  canvasSeedFadeEnd: 1,
  canvasBudAlphaSpan: .08,
  canvasRippleStagger: .5,
  canvasSparkBranchTail: .12,
  canvasSeedHaloEnd: .16,
  canvasEndShiftStart: .88,
  canvasEndShiftEnd: 1,
  copyIntroStart: 0,
  copyIntroEnd: .08,
  copyOutStart: .16,
  copyOutEnd: .32,
  seedNoteInStart: .24,
  seedNoteInEnd: .34,
  seedNoteOutStart: .46,
  seedNoteOutEnd: .60,
  scrollFadeStart: .12,
  scrollFadeEnd: .20,
  worksCardStart: .72,
  worksCardEnd: .965,
  worksCardSettleStart: .755,
  worksCardSettleEnd: .98,
  worksCardAppearSpan: .10,
  worksCardMetaStartOffset: .10,
  worksCardMetaEndOffset: .19,
  worksCardMorphThreshold: .18,
  worksNodeInStart: .62,
  worksNodeInEnd: .80,
  worksNodeOutStart: .82,
  worksNodeOutEnd: .90,
  worksNodeMoveStart: .78,
  worksNodeMoveEnd: .90,
  worksCardSettleOffset: .035,
  worksCardStagger: .012,
  worksCardScaleStart: .475,
  worksCardBlurStart: .500,
  worksCardBlurEnd: .545,
  worksAbstractStart: .430,
  worksAbstractEnd: .480,
  worksOutStart: .485,
  worksOutEnd: .540,
  methodInStart: .445,
  methodInEnd: .495,
  methodOutStart: .675,
  methodOutEnd: .720,
  methodHeaderStart: .525,
  methodHeaderEnd: .590,
  methodHeaderStagger: .010,
  methodSourceStagger: .005,
  methodSourceEndTrim: .005,
  methodTokenTravelStagger: .005,
  methodTokenOutStagger: .004,
  methodTokenTravelStart: .475,
  methodTokenTravelEnd: .565,
  methodTokenOutStart: .565,
  methodTokenOutEnd: .610,
  methodNodeThinkStart: .550,
  methodNodeThinkEnd: .605,
  methodNodeBuildStart: .570,
  methodNodeBuildEnd: .625,
  methodNodeConnectStart: .590,
  methodNodeConnectEnd: .645,
  methodCenterStart: .585,
  methodCenterEnd: .635,
  methodLineStart: .610,
  methodLineEnd: .655,
  exploreInStart: .655,
  exploreInEnd: .690,
  exploreOutStart: .915,
  exploreOutEnd: .970,
  methodScatterStart: .670,
  methodScatterEnd: .720,
  methodScatterTrigger: .660,
  exploreFragmentAppearStart: .665,
  exploreFragmentAppearEnd: .688,
  exploreFragmentTravelStart: .680,
  exploreFragmentTravelEnd: .755,
  exploreFragmentVanishStart: .755,
  exploreFragmentVanishEnd: .785,
  exploreFragmentAppearStagger: .004,
  exploreFragmentTravelStagger: .005,
  exploreFragmentVanishStagger: .004,
  exploreSeedArrivalStart: .750,
  exploreSeedArrivalEnd: .795,
  exploreSeedRowFadeStart: .910,
  exploreSeedRowFadeEnd: .950,
  exploreSeedCopyFadeStart: .865,
  exploreSeedCopyFadeEnd: .900,
  exploreSeedDotFadeStart: .915,
  exploreSeedDotFadeEnd: .945,
  exploreHeaderInStart: .775,
  exploreHeaderInEnd: .815,
  exploreHeaderOutStart: .860,
  exploreHeaderOutEnd: .895,
  exploreOriginInStart: .705,
  exploreOriginInEnd: .745,
  exploreOriginOutStart: .800,
  exploreOriginOutEnd: .835,
  exploreNetworkInStart: .795,
  exploreNetworkInEnd: .835,
  exploreNetworkOutStart: .870,
  exploreNetworkOutEnd: .905,
  exploreNetworkInStagger: .005,
  exploreNetworkOutStagger: .004,
  exploreSeedArrivalStagger: .005,
  exploreSeedCopyStagger: .003,
  exploreSeedDotStagger: .002,
  exploreHeaderInStagger: .008,
  exploreHeaderOutStagger: .005,
  endingPresenceStart: .865,
  endingPresenceEnd: .885,
  endingDotAppearStart: .875,
  endingDotAppearEnd: .895,
  endingDotTravelStart: .885,
  endingDotTravelEnd: .940,
  endingDotMergeStart: .938,
  endingDotMergeEnd: .958,
  endingPointInStart: .944,
  endingPointInEnd: .962,
  endingHeadlineInStart: .958,
  endingHeadlineInEnd: .980,
  endingNameInStart: .970,
  endingNameInEnd: .988,
  endingTagsInStart: .978,
  endingTagsInEnd: .993,
  endingContactInStart: .985,
  endingContactInEnd: .998,
  endingWhisperInStart: .945,
  endingWhisperInEnd: .970,
  endingWhisperOutStart: .988,
  endingWhisperOutEnd: 1,
  endingDotAppearStagger: .002,
  endingDotTravelStagger: .003,
  endingDotMergeStagger: .002,
  endingContactPointerThreshold: .72,
  bridgeInStart: .62,
  bridgeInEnd: .76,
  bridgeOutStart: .78,
  bridgeOutEnd: .88,
  bridgeHideStart: .405,
  bridgeHideEnd: .445,
  nodeFadeStart: .405,
  nodeFadeEnd: .455,
  canvasFadeStart: .405,
  canvasFadeEnd: .485,
  worksTitleInStart: .925,
  worksTitleInEnd: .985,
  worksTitleOutStart: .455,
  worksTitleOutEnd: .505,
  workOpenStart: .31,
  workOpenEnd: .50
});

export const TIMELINE_OVERLAY_WINDOWS = Object.freeze({
  seedGrowCanvasEnd: .485
});

export function getSeedGrowCanvasBackdropState(siteProgress) {
  return Object.freeze({
    shouldDraw: siteProgress < TIMELINE_OVERLAY_WINDOWS.seedGrowCanvasEnd,
    transformProgress: clamp(siteProgress / TIMELINE_WINDOWS.canvasProgressScale),
    opacity: 1 - smooth(TIMELINE_WINDOWS.canvasFadeStart, TIMELINE_WINDOWS.canvasFadeEnd, siteProgress)
  });
}

export function resolveTimelinePhase(progress, ranges = TIMELINE_RANGES) {
  if (progress < ranges.seedEnd) return 'SEED';
  if (progress < ranges.growEnd) return 'GROW';
  if (progress < ranges.worksEnd) return 'WORKS';
  if (progress < ranges.methodEnd) return 'METHOD';
  if (progress < ranges.exploringEnd) return 'EXPLORING';
  return 'ENDING';
}

export function getActiveTimelineStages(progress, ranges = TIMELINE_RANGES) {
  const stages = [];
  if (progress < ranges.seedGrowSemanticEnd) stages.push('seedGrow');
  if (progress >= ranges.worksStart && progress < ranges.worksRenderEnd) stages.push('works');
  if (progress >= ranges.methodSemanticStart && progress < ranges.methodRenderEnd) stages.push('method');
  if (progress >= ranges.exploringRenderStart && progress < ranges.exploringRenderEnd) stages.push('exploring');
  if (progress >= ranges.endingRenderStart) stages.push('ending');
  return stages;
}
