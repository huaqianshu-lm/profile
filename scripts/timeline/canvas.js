import { seededRandom } from './math.js';

export function createCanvasSurface(canvas) {
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D context is unavailable');
  return Object.freeze({
    context,
    resize(width, height, dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    clear(width, height) {
      context.clearRect(0, 0, width, height);
    }
  });
}

export function createCanvasScene({ random = seededRandom } = {}) {
  let visualState = { W: 0, H: 0, branches: [], buds: [], dust: [] };
  return Object.freeze({
    rebuild(width, height) {
      const tree = buildTree({ width, height, random });
      visualState = { W: width, H: height, ...tree };
    },
    getVisualState() {
      return visualState;
    }
  });
}

export function buildTree({ width, height, random }) {
  const branches = [];
  const buds = [];
  const dust = [];
  const addBranch = (x0, y0, angle, len, depth, parentProgress, seed) => {
    const x1 = x0 + Math.cos(angle) * len;
    const y1 = y0 + Math.sin(angle) * len;
    const bend = (random(seed + 11) - .5) * len * .46;
    const cx = (x0 + x1) / 2 + Math.cos(angle + Math.PI / 2) * bend;
    const cy = (y0 + y1) / 2 + Math.sin(angle + Math.PI / 2) * bend;
    const start = parentProgress;
    const duration = .05 + depth * .007;
    const end = start + duration;
    branches.push({ x0, y0, cx, cy, x1, y1, depth, start, end, seed });

    const maxDepth = width < 760 ? 4 : 5;
    if (depth >= maxDepth) {
      buds.push({ x: x1, y: y1, depth, start: end + .03, seed });
      return;
    }
    const count = depth < 2 ? 2 : (random(seed + 22) > .4 ? 2 : 1);
    for (let i = 0; i < count; i++) {
      const side = count === 1 ? (random(seed + 30) > .5 ? 1 : -1) : (i === 0 ? -1 : 1);
      const spread = .38 + depth * .035 + random(seed + 40 + i) * .28;
      const nextAngle = angle + side * spread + (random(seed + 50 + i) - .5) * .16;
      const nextLen = len * (.73 + random(seed + 60 + i) * .11);
      addBranch(x1, y1, nextAngle, nextLen, depth + 1, end + .008, seed * 2 + i + 7);
    }
    if (depth >= 2 && random(seed + 70) > .57) {
      const side = random(seed + 71) > .5 ? 1 : -1;
      addBranch(x1, y1, angle + side * (.82 + random(seed + 72) * .23), len * .46, depth + 1, end + .03, seed + 101);
    }
  };

  const cx = width * .5;
  const cy = height * .56;
  const base = width < 760 ? 86 : 118;
  addBranch(cx, cy, -Math.PI / 2 - .16, base, 1, .11, 3);
  addBranch(cx, cy, -Math.PI / 2 + .16, base, 1, .13, 8);
  addBranch(cx, cy, -Math.PI + .30, base * .72, 1, .21, 15);
  addBranch(cx, cy, -.30, base * .72, 1, .23, 22);

  for (let i = 0; i < (width < 760 ? 42 : 88); i++) {
    dust.push({
      x: random(i + 100) * width,
      y: random(i + 300) * height,
      r: .35 + random(i + 500) * 1.3,
      a: .02 + random(i + 700) * .055,
      drift: (random(i + 800) - .5) * 5
    });
  }
  return { branches, buds, dust };
}

export function bezierPoint(branch, t) {
  const u = 1 - t;
  return {
    x: u * u * branch.x0 + 2 * u * t * branch.cx + t * t * branch.x1,
    y: u * u * branch.y0 + 2 * u * t * branch.cy + t * t * branch.y1
  };
}

export function drawPartialBezier({ context, branch, t, offsetX, offsetY, rgba, branchColor }) {
  if (t <= 0) return;
  const steps = Math.max(6, Math.ceil(18 * t));
  context.beginPath();
  for (let i = 0; i <= steps; i++) {
    const point = bezierPoint(branch, (i / steps) * t);
    const x = point.x + offsetX;
    const y = point.y + offsetY;
    if (i === 0) context.moveTo(x, y); else context.lineTo(x, y);
  }
  const depthFade = Math.max(.16, 1 - branch.depth * .11);
  context.lineWidth = Math.max(.45, 1.1 - branch.depth * .11);
  context.strokeStyle = rgba(branchColor, .11 + depthFade * .12);
  context.stroke();
}

export function createCanvasTools({ surface, getTheme, rgba }) {
  const drawBezier = drawPartialBezier;
  return Object.freeze({
    bezierPoint,
    drawPartialBezier(branch, t, offsetX, offsetY) {
      drawBezier({
        context: surface.context,
        branch,
        t,
        offsetX,
        offsetY,
        rgba,
        branchColor: getTheme().branch
      });
    }
  });
}

export function createNearestBudAccessor({ scene, getWidth, getHeight }) {
  return (targetX, targetY, used) => {
    const { buds } = scene.getVisualState();
    const width = getWidth();
    const height = getHeight();
    let best = null;
    let bestScore = Infinity;
    let bestIndex = -1;
    buds.forEach((bud, index) => {
      if (used.has(index)) return;
      const dx = bud.x / width - targetX;
      const dy = bud.y / height - targetY;
      const score = dx * dx + dy * dy;
      if (score < bestScore) {
        best = bud;
        bestScore = score;
        bestIndex = index;
      }
    });
    if (bestIndex >= 0) used.add(bestIndex);
    return best;
  };
}
