export function createWorkNodes({ items, nodeLayer }) {
  return items.map(item => {
    const wrap = document.createElement('div');
    wrap.className = 'node-ui';
    wrap.innerHTML = `
      <div class="anchor-dot"></div>
      <div class="leader"></div>
      <div class="label">
        <div class="top"><small>${item.idx}</small><b>${item.name}</b></div>
        <div class="sub">${item.sub}</div>
      </div>
    `;
    nodeLayer.appendChild(wrap);
    return {
      wrap,
      anchor: wrap.children[0],
      leader: wrap.children[1],
      label: wrap.children[2],
      item
    };
  });
}

export function createWorkCards({ items, cardLayer }) {
  return items.map(item => {
    const card = document.createElement('div');
    card.className = 'works-card';
    card.dataset.workId = item.id;
    card.innerHTML = `
      <div class="visual"></div>
      <div class="shade"></div>
      <div class="meta">
        <div><h3>${item.name}</h3><div class="sub">${item.sub}</div></div>
        <div class="idx">${item.idx}</div>
      </div>
    `;
    cardLayer.appendChild(card);
    buildVisual(card.querySelector('.visual'), item.type);
    return card;
  });
}

function buildVisual(container, type) {
  if (type === 'video') {
    container.className = 'visual video';
    const frame = document.createElement('div');
    frame.className = 'video-frame';
    container.appendChild(frame);
  } else if (type === 'music') {
    container.className = 'visual music';
    const wave = document.createElement('div');
    wave.className = 'wave';
    for (let i = 0; i < 34; i++) {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${18 + ((i * 37) % 82)}px`;
      bar.style.animationDelay = `${-i * .045}s`;
      wave.appendChild(bar);
    }
    container.appendChild(wave);
  } else if (type === 'graph' || type === 'memora') {
    container.className = 'visual graph';
    buildGraph(container);
  } else if (type === 'news') {
    container.className = 'visual';
    container.innerHTML = `<div class="ticker"><div class="ticker-head"><span>AI RADAR</span><span>DAILY ●</span></div><div class="ticker-track">
      <div class="news-row"><b>OpenAI</b><span>Model / Product / Research</span></div>
      <div class="news-row"><b>Anthropic</b><span>Agents / Safety / Tools</span></div>
      <div class="news-row"><b>Google DeepMind</b><span>Research / Multimodal</span></div>
      <div class="news-row"><b>Open Source</b><span>Models / Frameworks</span></div>
      <div class="news-row"><b>AI Product</b><span>Interface / Workflow</span></div>
      <div class="news-row"><b>Research</b><span>Paper / Benchmark</span></div>
    </div></div>`;
  } else if (type === 'lifeos') {
    container.className = 'visual';
    container.innerHTML = `<div class="workflow">
      <div class="task"><span>Goal → Project</span><span>◎</span></div>
      <div class="task"><span>Project → Next Action</span><span>→</span></div>
      <div class="task"><span>Review → Adjust</span><span>↺</span></div>
    </div>`;
  } else if (type === 'echo') {
    container.className = 'visual echo';
    container.innerHTML = '<div class="echo-ring"></div><div class="echo-ring"></div><div class="echo-ring"></div>';
  }
}

function buildGraph(element) {
  const points = [[18, 62], [31, 34], [48, 52], [60, 26], [72, 57], [82, 39], [55, 74], [36, 72]];
  const connections = [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [2, 6], [6, 7], [7, 0], [1, 7]];
  connections.forEach(([a, b]) => {
    const [x1, y1] = points[a];
    const [x2, y2] = points[b];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const line = document.createElement('div');
    line.className = 'g-line';
    line.style.left = `${x1}%`;
    line.style.top = `${y1}%`;
    line.style.width = `${Math.hypot(dx, dy)}%`;
    line.style.transform = `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)`;
    element.appendChild(line);
  });
  points.forEach(([x, y], index) => {
    const node = document.createElement('div');
    node.className = 'g-node';
    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    node.style.animationDelay = `${-index * .25}s`;
    element.appendChild(node);
  });
}

export function bindCardInteractions({ cards, items, isDetailOpen, onOpen, onRefreshOrigin, onHoverChange }) {
  cards.forEach((card, index) => {
    card.classList.add('is-clickable');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open ${items[index].name} project detail`);

    card.addEventListener('pointerenter', () => {
      if (isDetailOpen()) return;
      onHoverChange(index);
      card.classList.add('is-hovered');
      requestAnimationFrame(() => {
        if (!isDetailOpen()) onRefreshOrigin(index);
      });
    });

    card.addEventListener('pointerleave', () => {
      onHoverChange(-1, index);
      card.classList.remove('is-hovered');
    });

    card.addEventListener('focus', () => {
      onHoverChange(index);
      card.classList.add('is-hovered');
      requestAnimationFrame(() => onRefreshOrigin(index));
    });

    card.addEventListener('blur', () => {
      onHoverChange(-1, index);
      card.classList.remove('is-hovered');
    });

    card.addEventListener('click', () => onOpen(index));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen(index);
      }
    });
  });
}
