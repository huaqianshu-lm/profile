import { lerp, smooth } from '../math.js';

export function prepareExploringLinks(exploreField) {
  if (!exploreField || exploreField.querySelector('.explore-link')) return;
  [[0, 1], [1, 2], [2, 4], [2, 3], [3, 5]].forEach(([a, b]) => {
    const line = document.createElement('div');
    line.className = 'explore-link';
    line.dataset.a = a;
    line.dataset.b = b;
    exploreField.appendChild(line);
  });
}

function setLine(element, x1, y1, x2, y2, opacity) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  element.style.left = `${x1}px`;
  element.style.top = `${y1}px`;
  element.style.width = `${Math.hypot(dx, dy)}px`;
  element.style.transform = `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)`;
  element.style.opacity = opacity;
}

export function renderExploring(frame) {
  const { dom, siteProgress, geometry, windows } = frame;
  const exploreLayerIn = smooth(windows.exploreInStart, windows.exploreInEnd, siteProgress);
  const exploreOut = 1 - smooth(windows.exploreOutStart, windows.exploreOutEnd, siteProgress);
  dom.exploreLayer.style.opacity = exploreLayerIn * exploreOut;
  prepareExploringLinks(dom.exploreField);

  const seedElements = [...dom.exploreField.querySelectorAll('.explore-seed')];
  const exploreRect = geometry.getPhaseRect('exploreLayer');
  const methodRects = geometry.getPhaseRect('methodNodes') || [];
  const seedRects = geometry.getPhaseRect('seedEls') || [];
  if (!exploreRect || methodRects.length < 3 || seedRects.length < 6) return false;

  const methodSources = [methodRects[0], methodRects[0], methodRects[1], methodRects[1], methodRects[2], methodRects[2]];
  const seedMap = [3, 2, 1, 5, 0, 4];
  [...dom.exploreFragments].forEach((fragment, index) => {
    const source = methodSources[index];
    const target = seedRects[seedMap[index]];
    const x0 = source.left - exploreRect.left + source.width / 2;
    const y0 = source.top - exploreRect.top + source.height / 2;
    const x1 = target.left - exploreRect.left + 4;
    const y1 = target.top - exploreRect.top + 8;
    const appear = smooth(windows.exploreFragmentAppearStart + index * windows.exploreFragmentAppearStagger, windows.exploreFragmentAppearEnd + index * windows.exploreFragmentAppearStagger, siteProgress);
    const travel = smooth(windows.exploreFragmentTravelStart + index * windows.exploreFragmentTravelStagger, windows.exploreFragmentTravelEnd + index * windows.exploreFragmentTravelStagger, siteProgress);
    const vanish = 1 - smooth(windows.exploreFragmentVanishStart + index * windows.exploreFragmentVanishStagger, windows.exploreFragmentVanishEnd + index * windows.exploreFragmentVanishStagger, siteProgress);
    const side = index % 2 === 0 ? -1 : 1;
    const arcX = lerp(x0, x1, travel) + Math.sin(travel * Math.PI) * side * (34 + index * 5);
    const arcY = lerp(y0, y1, travel) - Math.sin(travel * Math.PI) * (34 + (index % 3) * 9);
    fragment.style.left = `${arcX}px`;
    fragment.style.top = `${arcY}px`;
    fragment.style.opacity = appear * vanish * exploreOut;
    fragment.style.transform = `translate(-50%,-50%) scale(${.62 + appear * .48 - travel * .10})`;
  });

  const fieldRect = geometry.getPhaseRect('exploreField');
  if (fieldRect) {
    [...dom.exploreField.querySelectorAll('.explore-link')].forEach((line, index) => {
      const first = seedRects[Number(line.dataset.a)];
      const second = seedRects[Number(line.dataset.b)];
      const x1 = first.left - fieldRect.left + 4;
      const y1 = first.top - fieldRect.top + 8;
      const x2 = second.left - fieldRect.left + 4;
      const y2 = second.top - fieldRect.top + 8;
      const networkIn = smooth(windows.exploreNetworkInStart + index * windows.exploreNetworkInStagger, windows.exploreNetworkInEnd, siteProgress);
      const networkOut = 1 - smooth(windows.exploreNetworkOutStart + index * windows.exploreNetworkOutStagger, windows.exploreNetworkOutEnd + index * windows.exploreNetworkOutStagger, siteProgress);
      setLine(line, x1, y1, x2, y2, networkIn * networkOut * exploreOut);
    });
  }

  seedElements.forEach((element, index) => {
    const mappedArrival = seedMap.indexOf(index);
    const delay = mappedArrival >= 0 ? mappedArrival * windows.exploreSeedArrivalStagger : 0;
    const arrive = smooth(windows.exploreSeedArrivalStart + delay, windows.exploreSeedArrivalEnd + delay, siteProgress);
    const rowFade = 1 - smooth(windows.exploreSeedRowFadeStart, windows.exploreSeedRowFadeEnd, siteProgress);
    const copyFade = 1 - smooth(windows.exploreSeedCopyFadeStart + index * windows.exploreSeedCopyStagger, windows.exploreSeedCopyFadeEnd + index * windows.exploreSeedCopyStagger, siteProgress);
    const dotFade = 1 - smooth(windows.exploreSeedDotFadeStart + index * windows.exploreSeedDotStagger, windows.exploreSeedDotFadeEnd + index * windows.exploreSeedDotStagger, siteProgress);
    const copy = element.querySelector('.seed-copy');
    const dot = element.querySelector('.seed-dot');
    element.style.opacity = arrive * rowFade;
    element.style.transform = `translateY(${10 * (1 - arrive)}px)`;
    if (copy) {
      copy.style.opacity = copyFade;
      copy.style.transform = `translateY(${-4 * (1 - copyFade)}px)`;
    }
    if (dot) {
      dot.style.opacity = dotFade;
      dot.style.transform = `scale(${.92 + dotFade * .08})`;
    }
  });

  dom.exploreHeaders.forEach((element, index) => {
    const headerIn = smooth(windows.exploreHeaderInStart + index * windows.exploreHeaderInStagger, windows.exploreHeaderInEnd + index * windows.exploreHeaderInStagger, siteProgress);
    const headerOut = 1 - smooth(windows.exploreHeaderOutStart + index * windows.exploreHeaderOutStagger, windows.exploreHeaderOutEnd + index * windows.exploreHeaderOutStagger, siteProgress);
    element.style.opacity = headerIn * headerOut * exploreOut;
    element.style.transform = `translateY(${8 * (1 - headerIn) - 5 * (1 - headerOut)}px)`;
  });
  dom.exploreOrigin.style.opacity = smooth(windows.exploreOriginInStart, windows.exploreOriginInEnd, siteProgress)
    * (1 - smooth(windows.exploreOriginOutStart, windows.exploreOriginOutEnd, siteProgress)) * exploreOut;
  return false;
}

export function resetExploring({ dom }) {
  dom.exploreLayer.style.opacity = 0;
  dom.exploreHeaders.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(8px)';
  });
  dom.exploreFragments.forEach(fragment => {
    fragment.style.opacity = 0;
  });
  dom.exploreOrigin.style.opacity = 0;
  dom.exploreField.querySelectorAll('.explore-link').forEach(link => {
    link.style.opacity = 0;
  });
  dom.exploreField.querySelectorAll('.explore-seed').forEach(seed => {
    seed.style.opacity = 0;
    seed.querySelector('.seed-copy').style.opacity = 0;
    seed.querySelector('.seed-dot').style.opacity = 0;
  });
}
