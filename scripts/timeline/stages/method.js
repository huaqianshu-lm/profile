import { lerp, smooth } from '../math.js';

function getMethodGeometry(frame, rect) {
  const { width: W } = frame;
  if (W < 760) {
    return {
      center: { x: rect.width * .50, y: rect.height * .49 },
      points: [
        { x: rect.width * .27, y: rect.height * .62 },
        { x: rect.width * .50, y: rect.height * .29 },
        { x: rect.width * .73, y: rect.height * .62 }
      ]
    };
  }
  if (W < 860) {
    return {
      center: { x: rect.width * .50, y: rect.height * .52 },
      points: [
        { x: rect.width * .28, y: rect.height * .35 },
        { x: rect.width * .70, y: rect.height * .35 },
        { x: rect.width * .50, y: rect.height * .70 }
      ]
    };
  }
  return {
    center: { x: rect.width * .50, y: rect.height * .72 },
    points: [
      { x: rect.width * .21, y: rect.height * .48 },
      { x: rect.width * .50, y: rect.height * .27 },
      { x: rect.width * .79, y: rect.height * .50 }
    ]
  };
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

export function renderMethod(frame) {
  const { dom, siteProgress, geometry, width: W, runtimeTheme, canvasRgba, windows, tools } = frame;
  const methodRect = geometry.getMethodRect();
  if (!methodRect) return false;
  const methodGeometry = getMethodGeometry(frame, methodRect);
  const { center, points } = methodGeometry;
  const [thinkPoint, buildPoint, connectPoint] = points;
  const methodOut = 1 - smooth(windows.methodOutStart, windows.methodOutEnd, siteProgress);
  const methodIn = smooth(windows.methodInStart, windows.methodInEnd, siteProgress);
  const methodAlpha = methodIn * methodOut;

  dom.methodLayer.style.opacity = methodAlpha;
  [dom.thinkNode, dom.buildNode, dom.connectNode].forEach((node, index) => {
    const point = points[index];
    node.style.left = `${point.x / methodRect.width * 100}%`;
    node.style.top = `${point.y / methodRect.height * 100}%`;
  });
  dom.methodCenter.style.left = `${center.x / methodRect.width * 100}%`;
  dom.methodCenter.style.top = `${center.y / methodRect.height * 100}%`;

  const setMethodLines = opacity => {
    setLine(dom.methodLine1, center.x, center.y, thinkPoint.x, thinkPoint.y, opacity);
    setLine(dom.methodLine2, center.x, center.y, buildPoint.x, buildPoint.y, opacity);
    setLine(dom.methodLine3, center.x, center.y, connectPoint.x, connectPoint.y, opacity);
  };

  const headerIn = smooth(windows.methodHeaderStart, windows.methodHeaderEnd, siteProgress);
  dom.methodHeaderEls.forEach((element, index) => {
    const alpha = smooth(windows.methodHeaderStart + index * windows.methodHeaderStagger, windows.methodHeaderEnd + index * windows.methodHeaderStagger, siteProgress) * methodOut;
    element.style.opacity = alpha;
    element.style.transform = `translateY(${8 * (1 - alpha)}px)`;
  });

  const targets = W < 760 ? [
    { x: methodRect.left + buildPoint.x - 52, y: methodRect.top + buildPoint.y - 76 },
    { x: methodRect.left + connectPoint.x + 44, y: methodRect.top + connectPoint.y - 64 },
    { x: methodRect.left + thinkPoint.x - 40, y: methodRect.top + thinkPoint.y - 66 },
    { x: methodRect.left + thinkPoint.x - 46, y: methodRect.top + thinkPoint.y + 62 },
    { x: methodRect.left + connectPoint.x + 46, y: methodRect.top + connectPoint.y + 62 },
    { x: methodRect.left + buildPoint.x + 52, y: methodRect.top + buildPoint.y - 76 }
  ] : [
    { x: methodRect.left + buildPoint.x - 58, y: methodRect.top + buildPoint.y + 74 },
    { x: methodRect.left + connectPoint.x - 50, y: methodRect.top + connectPoint.y - 82 },
    { x: methodRect.left + thinkPoint.x + 42, y: methodRect.top + thinkPoint.y - 82 },
    { x: methodRect.left + thinkPoint.x - 54, y: methodRect.top + thinkPoint.y + 70 },
    { x: methodRect.left + connectPoint.x + 46, y: methodRect.top + connectPoint.y + 70 },
    { x: methodRect.left + buildPoint.x + 62, y: methodRect.top + buildPoint.y + 76 }
  ];

  dom.methodSources.forEach((token, index) => {
    const start = tools.getWorksFinalGeometry(frame, index);
    const localIn = smooth(windows.methodInStart + index * windows.methodSourceStagger, windows.methodInEnd - windows.methodSourceEndTrim + index * windows.methodSourceStagger, siteProgress);
    const travel = smooth(windows.methodTokenTravelStart + index * windows.methodTokenTravelStagger, windows.methodTokenTravelEnd + index * windows.methodTokenTravelStagger, siteProgress);
    const tokenOut = 1 - smooth(windows.methodTokenOutStart + index * windows.methodTokenOutStagger, windows.methodTokenOutEnd + index * windows.methodTokenOutStagger, siteProgress);
    token.style.left = `${lerp(start.x, targets[index].x, travel)}px`;
    token.style.top = `${lerp(start.y, targets[index].y, travel)}px`;
    token.style.opacity = localIn * tokenOut * methodOut;
    token.style.transform = `translate(-50%,-50%) scale(${.86 + localIn * .14 - travel * .04})`;
    token.style.borderColor = canvasRgba(runtimeTheme().tokenBorder, .08 + .06 * travel);
  });

  const nodeStates = [
    [dom.thinkNode, smooth(windows.methodNodeThinkStart, windows.methodNodeThinkEnd, siteProgress)],
    [dom.buildNode, smooth(windows.methodNodeBuildStart, windows.methodNodeBuildEnd, siteProgress)],
    [dom.connectNode, smooth(windows.methodNodeConnectStart, windows.methodNodeConnectEnd, siteProgress)]
  ];
  nodeStates.forEach(([element, alpha]) => {
    element.style.opacity = alpha * methodOut;
    element.style.transform = `translate(-50%,-50%) scale(${.76 + alpha * .24})`;
    element.style.filter = `blur(${(1 - alpha) * 5}px)`;
  });
  const centerIn = smooth(windows.methodCenterStart, windows.methodCenterEnd, siteProgress);
  dom.methodCenter.style.opacity = centerIn * methodOut;
  const lineAlpha = smooth(windows.methodLineStart, windows.methodLineEnd, siteProgress) * methodOut;
  setMethodLines(lineAlpha);

  if (siteProgress > windows.methodScatterTrigger) {
    const scatter = smooth(windows.methodScatterStart, windows.methodScatterEnd, siteProgress);
    nodeStates.forEach(([element, alpha]) => {
      element.style.opacity = (1 - scatter) * alpha * methodOut;
      element.style.transform = `translate(-50%,-50%) scale(${1 - scatter * .68})`;
      element.style.filter = `blur(${scatter * 3}px)`;
    });
    dom.methodCenter.style.opacity = (1 - scatter) * centerIn * methodOut;
    setMethodLines((1 - scatter) * lineAlpha);
  }
  return false;
}

export function resetMethod({ dom }) {
  dom.methodLayer.style.opacity = 0;
  dom.methodHeaderEls.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(8px)';
  });
  dom.methodSources.forEach(source => {
    source.style.opacity = 0;
  });
  [dom.thinkNode, dom.buildNode, dom.connectNode].forEach(node => {
    node.style.opacity = 0;
    node.style.filter = 'blur(5px)';
  });
  dom.methodCenter.style.opacity = 0;
  [dom.methodLine1, dom.methodLine2, dom.methodLine3].forEach(line => {
    line.style.opacity = 0;
  });
}

export { getMethodGeometry, setLine };
