const CANVAS_THEME_PALETTES = Object.freeze({
  dark: {
    branch:'238,231,211', dust:'255,255,255', warm:'237,227,198', spark:'247,237,209', wire:'223,229,222',
    bud:'240,228,196', network:'228,232,229', seed:'240,234,214', seedAlpha:.55, seedRadius:2.6,
    haloCore:.10, haloRing:.055, rippleAlpha:.12, rippleWidth:.60
  },
  light: {
    branch:'52,60,64', dust:'102,110,114', warm:'95,102,105', spark:'78,88,93', wire:'88,98,103',
    bud:'95,102,105', network:'76,87,92', seed:'95,102,105', seedAlpha:.90, seedRadius:3.15,
    haloCore:.16, haloRing:.075, rippleAlpha:.25, rippleWidth:.82
  }
});

const SITE_THEME_RUNTIME = Object.freeze({
  dark: { cardBorder:'255,255,255', cardSurface:'255,255,255', tokenBorder:'255,255,255', endingGlow:'238,228,200' },
  light: { cardBorder:'23,29,32', cardSurface:'247,248,248', tokenBorder:'23,29,32', endingGlow:'95,102,105' }
});

export function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function canvasTheme() {
  return CANVAS_THEME_PALETTES[currentTheme()];
}

export function runtimeTheme() {
  return SITE_THEME_RUNTIME[currentTheme()];
}

export function canvasRgba(rgb, alpha) {
  return `rgba(${rgb},${alpha})`;
}

export function createThemeController({ toggle, label, meta }) {
  const applyUI = () => {
    if (!toggle || !label) return;
    const light = currentTheme() === 'light';
    label.textContent = light ? 'DARK' : 'LIGHT';
    toggle.setAttribute('aria-pressed', String(light));
    toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    if (meta) meta.setAttribute('content', light ? '#ffffff' : '#07090b');
  };

  const set = (theme, { persist = true } = {}) => {
    const next = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    applyUI();
    if (persist) {
      try { localStorage.setItem('huaqianshu-theme', next); } catch (error) {}
    }
  };

  return Object.freeze({ current: currentTheme, applyUI, set });
}
