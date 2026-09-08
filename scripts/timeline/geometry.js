export function createGeometryCache({ hero, methodLayout, phaseElements = {} }) {
  const cache = {
    viewport: { width: 0, height: 0, dpr: 1 },
    methodRect: null,
    heroRect: null,
    heroTop: 0,
    scrollRange: 0,
    breakpoint: 'desktop',
    phaseRects: {}
  };

  const updateBreakpoint = width => width < 760 ? 'mobile' : width < 860 ? 'tablet' : 'desktop';

  const measure = ({ width, height, dpr }) => {
    cache.viewport = { width, height, dpr };
    cache.breakpoint = updateBreakpoint(width);
    cache.heroRect = hero ? hero.getBoundingClientRect() : null;
    cache.heroTop = hero && cache.heroRect ? window.scrollY + cache.heroRect.top : 0;
    cache.scrollRange = hero ? Math.max(1, hero.offsetHeight - height) : 0;
    cache.methodRect = methodLayout ? methodLayout.getBoundingClientRect() : null;
    cache.phaseRects = {};
    Object.entries(phaseElements).forEach(([key, value]) => {
      const elements = typeof value === 'function' ? value() : value;
      if (Array.isArray(elements)) {
        cache.phaseRects[key] = elements.map(element => element?.getBoundingClientRect?.() || null);
      } else {
        cache.phaseRects[key] = elements?.getBoundingClientRect?.() || null;
      }
    });
    return cache;
  };

  return Object.freeze({
    measure,
    getViewport: () => ({ ...cache.viewport }),
    getMethodRect: () => cache.methodRect,
    getHeroRect: () => cache.heroRect,
    getHeroTop: () => cache.heroTop,
    getScrollRange: () => cache.scrollRange,
    getPhaseRect: key => cache.phaseRects[key] || null,
    getBreakpoint: () => cache.breakpoint
  });
}
