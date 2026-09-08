import { clamp, getSeedGrowCanvasBackdropState, smooth } from '../math.js';

export function renderSeedGrowHud(frame) {
  const { dom, appState, items, siteProgress, phase, ranges, width } = frame;
  if (dom.stickyStage) {
    dom.stickyStage.classList.toggle('is-seed-phase', !appState.detail.detailMode && siteProgress < ranges.seedEnd);
    dom.stickyStage.classList.toggle('is-ending-phase', !appState.detail.detailMode && siteProgress >= ranges.endingStart);
  }

  if (appState.detail.detailMode && appState.detail.selectedWorkIndex >= 0) {
    const item = items[appState.detail.selectedWorkIndex];
    dom.globalState.textContent = `03 / WORKS / ${item.name.toUpperCase()}`;
    dom.phase.textContent = item.detail.phase;
  } else {
    const labels = {
      SEED: 'SEED / 一念',
      GROW: 'GROW / 生发',
      WORKS: width > 860 ? 'SELECTED WORKS / 已经发生的创造' : '03 / WORKS',
      METHOD: width > 860 ? 'HOW I WORK / 方法' : '04 / METHOD',
      EXPLORING: width > 860 ? 'GROWING / STILL EXPLORING' : '05 / EXPLORING',
      ENDING: 'AGAIN / 回到一点'
    };
    const states = {
      SEED: '01 / SEED',
      GROW: '02 / GROW',
      WORKS: width > 860 ? 'SELECTED WORKS / 已经发生的创造' : '03 / WORKS',
      METHOD: width > 860 ? 'HOW I WORK / 方法' : '04 / METHOD',
      EXPLORING: width > 860 ? 'GROWING / STILL EXPLORING' : '05 / EXPLORING',
      ENDING: '06 / AGAIN'
    };
    dom.globalState.textContent = states[phase];
    dom.phase.textContent = labels[phase];
  }

  dom.pct.textContent = String(Math.round(siteProgress * 100)).padStart(2, '0');
  dom.bar.style.width = `${siteProgress * 100}%`;
  if (dom.scroll) dom.scroll.style.opacity = 1 - smooth(frame.windows.scrollFadeStart, frame.windows.scrollFadeEnd, siteProgress);
}

export function renderSeedGrowCanvasBackdrop(frame) {
  const { dom, siteProgress, width: W, height: H, branches, buds, dust, offset, canvasSurface, canvasTheme, canvasRgba, items, tools, windows } = frame;
  const backdrop = getSeedGrowCanvasBackdropState(siteProgress);
  const p = backdrop.transformProgress;
  const endShift = smooth(windows.canvasEndShiftStart, windows.canvasEndShiftEnd, p);
  dom.canvas.style.transform = `translateY(${-endShift * 1.5}vh) scale(${1 - endShift * .01})`;
  dom.canvas.style.opacity = backdrop.opacity;
  if (!backdrop.shouldDraw) return;
  const { bezierPoint, drawPartialBezier, nearestBud } = tools;
  const { context } = canvasSurface;

  canvasSurface.clear(W, H);

  const ox = offset.x;
  const oy = offset.y;
  const treeFade = 1 - smooth(windows.canvasTreeFadeStart, windows.canvasTreeFadeEnd, p);
  const dustFade = 1 - smooth(windows.canvasDustFadeStart, windows.canvasDustFadeEnd, p);

  context.save();
  for (const particle of dust) {
    const yy = particle.y + Math.sin(performance.now() / 4000 + particle.x) * particle.drift;
    context.beginPath();
    context.arc(particle.x + ox * .15, yy + oy * .15, particle.r, 0, Math.PI * 2);
    context.fillStyle = canvasRgba(canvasTheme().dust, particle.a * dustFade);
    context.fill();
  }

  context.globalAlpha = treeFade;
  const palette = canvasTheme();
  const cx = W * .5 + ox;
  const cy = H * .56 + oy;
  const haloP = smooth(windows.canvasHaloStart, windows.canvasHaloEnd, p);
  const halo = context.createRadialGradient(cx, cy, 0, cx, cy, 45 + haloP * 35);
  halo.addColorStop(0, canvasRgba(palette.warm, palette.haloCore + .08 * haloP));
  halo.addColorStop(.18, canvasRgba(palette.warm, palette.haloRing + .04 * haloP));
  halo.addColorStop(1, canvasRgba(palette.warm, 0));
  context.fillStyle = halo;
  context.fillRect(cx - 120, cy - 120, 240, 240);

  if (p < windows.canvasRippleEnd) {
    const rippleTime = (performance.now() / 1800) % 1;
    for (let i = 0; i < 2; i++) {
      const q = (rippleTime + i * windows.canvasRippleStagger) % 1;
      context.beginPath();
      context.arc(cx, cy, 8 + q * 40, 0, Math.PI * 2);
      context.strokeStyle = canvasRgba(palette.warm, (1 - q) * palette.rippleAlpha * (1 - p / windows.canvasRippleEnd));
      context.lineWidth = palette.rippleWidth;
      context.stroke();
    }
  }

  for (const branch of branches) {
    const t = clamp((p - branch.start) / (branch.end - branch.start));
    if (t > 0) drawPartialBezier(branch, t, ox, oy);
  }

  if (p > windows.canvasSparkStart && p < windows.canvasSparkEnd) {
    const active = branches.filter(branch => p > branch.start && p < branch.end + windows.canvasSparkBranchTail);
    for (let i = 0; i < Math.min(active.length, 8); i++) {
      const branch = active[(i * 3) % active.length];
      const t = clamp((p - branch.start) / (branch.end - branch.start));
      const point = bezierPoint(branch, t);
      context.beginPath();
      context.arc(point.x + ox, point.y + oy, 1.65, 0, Math.PI * 2);
      context.fillStyle = canvasRgba(palette.spark, .76);
      context.fill();
    }
  }

  if (p > windows.canvasWireStart && p < windows.canvasWireEnd) {
    const wireAlpha = smooth(windows.canvasWireStart, windows.canvasWireInEnd, p) * (1 - smooth(windows.canvasWireOutStart, windows.canvasWireEnd, p));
    context.lineWidth = .5;
    for (let i = 0; i < 4; i++) {
      const yy = H * (.29 + i * .12);
      context.beginPath();
      context.moveTo(W * .12, yy);
      context.bezierCurveTo(W * .34, yy - 25, W * .58, yy + 28, W * .86, yy - 10);
      context.strokeStyle = canvasRgba(palette.wire, .024 * wireAlpha);
      context.stroke();
    }
  }

  const used = new Set();
  items.forEach(item => {
    const bud = nearestBud(item.pos[0], item.pos[1], used);
    if (!bud) return;
    const alpha = smooth(bud.start, bud.start + windows.canvasBudAlphaSpan, p);
    if (alpha <= 0) return;
    const pulse = .78 + .22 * Math.sin(performance.now() / 950 + bud.seed);
    const radius = 2.1 + 2.1 * alpha * pulse;
    context.beginPath();
    context.arc(bud.x + ox, bud.y + oy, radius, 0, Math.PI * 2);
    context.fillStyle = canvasRgba(palette.bud, .36 + .44 * alpha);
    context.fill();
    context.beginPath();
    context.arc(bud.x + ox, bud.y + oy, 11 + 5 * pulse, 0, Math.PI * 2);
    context.fillStyle = canvasRgba(palette.bud, .026 * alpha);
    context.fill();
  });

  const networkAlpha = smooth(windows.canvasBudsStart, windows.canvasBudsEnd, p);
  if (networkAlpha > 0) {
    const points = items.map(item => [item.pos[0] * W + ox, item.pos[1] * H + oy]);
    const links = [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [2, 5]];
    context.lineWidth = .8;
    links.forEach(([a, b]) => {
      context.beginPath();
      context.moveTo(points[a][0], points[a][1]);
      context.lineTo(points[b][0], points[b][1]);
      context.strokeStyle = canvasRgba(palette.network, .04 + networkAlpha * .08);
      context.stroke();
    });
  }

  context.beginPath();
  context.arc(cx, cy, palette.seedRadius + smooth(windows.canvasHaloStart, windows.canvasSeedHaloEnd, p) * 1.8, 0, Math.PI * 2);
  context.fillStyle = canvasRgba(palette.seed, palette.seedAlpha * (1 - smooth(windows.canvasSeedFadeStart, windows.canvasSeedFadeEnd, p) * .2));
  context.fill();
  context.restore();

}

export function renderSeedGrowStage(frame) {
  const { dom, normalizedCanvasProgress: p, windows } = frame;
  const introIn = smooth(windows.copyIntroStart, windows.copyIntroEnd, p);
  const copyOut = smooth(windows.copyOutStart, windows.copyOutEnd, p);
  const copyAlpha = introIn * (1 - copyOut);
  dom.copy.style.opacity = copyAlpha;
  dom.copy.style.filter = `blur(${(1 - copyAlpha) * 7}px)`;
  dom.copy.style.transform = `translate(-50%,calc(-50% - ${copyOut * 26}px))`;

  const seedAlpha = smooth(windows.seedNoteInStart, windows.seedNoteInEnd, p) * (1 - smooth(windows.seedNoteOutStart, windows.seedNoteOutEnd, p));
  dom.seedNote.style.opacity = seedAlpha;
  dom.seedNote.style.transform = `translate(-50%,${88 - seedAlpha * 5}px)`;
  dom.copy.style.pointerEvents = 'none';
  return false;
}

export function resetSeedGrowStage({ dom }) {
  dom.copy.style.opacity = 0;
  dom.copy.style.filter = 'blur(7px)';
  dom.copy.style.transform = 'translate(-50%,calc(-50% - 26px))';
  dom.copy.style.pointerEvents = 'none';
  dom.seedNote.style.opacity = 0;
  dom.seedNote.style.transform = 'translate(-50%,88px)';
}
