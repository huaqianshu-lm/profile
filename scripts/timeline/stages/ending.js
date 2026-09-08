import { lerp, smooth } from '../math.js';

export function renderEnding(frame) {
  const { dom, siteProgress, geometry, windows } = frame;
  const presence = smooth(windows.endingPresenceStart, windows.endingPresenceEnd, siteProgress);
  dom.endLayer.style.opacity = presence;

  const endRect = geometry.getPhaseRect('endLayer');
  const finalPointRect = geometry.getPhaseRect('endPoint');
  if (!endRect || !finalPointRect) return false;
  const targetX = finalPointRect.left - endRect.left + finalPointRect.width / 2;
  const targetY = finalPointRect.top - endRect.top + finalPointRect.height / 2;
  const seedRects = geometry.getPhaseRect('seedEls') || [];
  const endDotRects = geometry.getPhaseRect('endGatherDots') || [];

  dom.endGatherDots.forEach((dot, index) => {
    const seedRect = seedRects[index];
    const source = seedRect || endDotRects[index];
    if (!source) return;
    const x0 = source.left - endRect.left + source.width / 2;
    const y0 = source.top - endRect.top + source.height / 2;
    const appear = smooth(windows.endingDotAppearStart + index * windows.endingDotAppearStagger, windows.endingDotAppearEnd + index * windows.endingDotAppearStagger, siteProgress);
    const travel = smooth(windows.endingDotTravelStart + index * windows.endingDotTravelStagger, windows.endingDotTravelEnd + index * windows.endingDotTravelStagger, siteProgress);
    const merge = 1 - smooth(windows.endingDotMergeStart + index * windows.endingDotMergeStagger, windows.endingDotMergeEnd + index * windows.endingDotMergeStagger, siteProgress);
    const dx = targetX - x0;
    const dy = targetY - y0;
    const tangentLength = Math.max(1, Math.hypot(-dy, dx));
    const side = index % 2 === 0 ? 1 : -1;
    const curve = (32 + index * 6) * Math.sin(travel * Math.PI) * side;
    const x = lerp(x0, targetX, travel) + (-dy / tangentLength) * curve;
    const y = lerp(y0, targetY, travel) + (dx / tangentLength) * curve;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.opacity = appear * merge;
    dot.style.transform = `translate(-50%,-50%) scale(${.72 + appear * .34 - travel * .16})`;
  });

  const pointIn = smooth(windows.endingPointInStart, windows.endingPointInEnd, siteProgress);
  dom.endPoint.style.opacity = pointIn;
  if (siteProgress <= windows.endingPointInEnd) {
    dom.endPoint.classList.remove('is-rippling');
    dom.endPoint.style.transform = `scale(${.55 + pointIn * .45})`;
    dom.endPoint.style.boxShadow = `0 0 ${18 + pointIn * 26}px ${frame.canvasRgba(frame.runtimeTheme().endingGlow, .26 + .34 * pointIn)}`;
  } else {
    dom.endPoint.style.transform = 'scale(1)';
    dom.endPoint.classList.add('is-rippling');
  }

  const headlineIn = smooth(windows.endingHeadlineInStart, windows.endingHeadlineInEnd, siteProgress);
  dom.endHeadline.style.opacity = headlineIn;
  dom.endHeadline.style.transform = `translateY(${10 * (1 - headlineIn)}px)`;
  const nameIn = smooth(windows.endingNameInStart, windows.endingNameInEnd, siteProgress);
  dom.endName.style.opacity = nameIn;
  dom.endName.style.transform = `translateY(${8 * (1 - nameIn)}px)`;
  const tagsIn = smooth(windows.endingTagsInStart, windows.endingTagsInEnd, siteProgress);
  dom.endTags.style.opacity = tagsIn;
  dom.endTags.style.transform = `translateY(${8 * (1 - tagsIn)}px)`;
  const contactIn = smooth(windows.endingContactInStart, windows.endingContactInEnd, siteProgress);
  dom.endContact.style.opacity = contactIn;
  dom.endContact.style.transform = `translateY(${8 * (1 - contactIn)}px)`;
  dom.endContact.style.pointerEvents = contactIn > windows.endingContactPointerThreshold ? 'auto' : 'none';
  const whisperIn = smooth(windows.endingWhisperInStart, windows.endingWhisperInEnd, siteProgress)
    * (1 - smooth(windows.endingWhisperOutStart, windows.endingWhisperOutEnd, siteProgress));
  dom.endWhisper.style.opacity = whisperIn;
  dom.endContent.style.transform = `translate(-50%,-50%) scale(${.985 + headlineIn * .015})`;
  return false;
}

export function resetEnding({ dom }) {
  dom.endLayer.style.opacity = 0;
  dom.endGatherDots.forEach(dot => {
    dot.style.opacity = 0;
  });
  dom.endPoint.style.opacity = 0;
  dom.endPoint.classList.remove('is-rippling');
  dom.endHeadline.style.opacity = 0;
  dom.endName.style.opacity = 0;
  dom.endTags.style.opacity = 0;
  dom.endContact.style.opacity = 0;
  dom.endContact.style.pointerEvents = 'none';
  dom.endWhisper.style.opacity = 0;
}
