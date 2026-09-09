export function renderRadarPreview({ preview }) {
  preview.innerHTML = `
    <div class="detail-radar-stage">
      <article class="detail-radar-app is-reference-filter" aria-label="AI Radar Signal Processing Pipeline">
        <div class="detail-radar-reference-preview">
          <div class="head"><div class="brand">AI <span>RADAR</span></div><div class="mini">FILTERING PUBLIC SIGNALS INTO USEFUL INFORMATION</div></div>
          <div class="section-label incoming-label">RAW SIGNALS <b>LIVE</b></div>
          <div class="section-label signals-label">SIGNALS KEPT · 03</div>
          <svg class="lines" viewBox="0 0 1020 574" preserveAspectRatio="none" aria-hidden="true"><path class="trail desktop-trail" d="M108,158 C270,165 360,248 510,310"/><path class="trail desktop-trail" d="M132,228 C292,232 385,276 510,310"/><path class="trail desktop-trail" d="M118,305 C286,304 378,292 510,310"/><path class="trail desktop-trail" d="M135,372 C295,360 390,334 510,310"/><path class="trail desktop-trail" d="M114,438 C292,425 394,356 510,310"/><path class="trail mobile-trail" d="M92,320 C242,320 382,286 510,252"/><path class="trail mobile-trail" d="M928,320 C778,320 638,286 510,252"/><path class="trail mobile-trail" d="M510,92 C510,150 510,208 510,252"/><path class="trail mobile-trail" d="M510,292 C465,340 270,392 180,452"/><path class="trail mobile-trail" d="M510,292 C510,344 510,397 510,452"/><path class="trail mobile-trail" d="M510,292 C555,340 750,392 840,452"/></svg>
          <div class="flow-layer"></div>
          <div class="filter-zone"><div class="scan"></div><div class="filter-core"><small>FILTERING</small><b>01</b><em>READY</em></div></div>
          <div class="process-chip">ANALYZING SIGNAL</div><div class="reject-ring"></div>
          <div class="filter-caption">NOISE REMOVED<b>SIGNAL THROUGH</b></div>
          <div class="signal-item s1"><span class="tick"></span><div><div class="meta">01 · AGENT</div><div class="title">Persistent memory</div></div></div>
          <div class="signal-item s2"><span class="tick"></span><div><div class="meta">02 · MODEL</div><div class="title">Local small models</div></div></div>
          <div class="signal-item s3"><span class="tick"></span><div><div class="meta">03 · TOOL</div><div class="title">Workflow orchestration</div></div></div>
          <div class="footer"><span><b>NO AUTO SCORE</b> · MEMORA WRITE OFF</span><span class="summary">SIGNAL PROCESSING PIPELINE</span></div>
        </div>
      </article>
    </div>`;

  const root = preview.querySelector('.detail-radar-reference-preview');
  const flowLayer = root.querySelector('.flow-layer');
  const filterZone = root.querySelector('.filter-zone');
  const processChip = root.querySelector('.process-chip');
  const rejectRing = root.querySelector('.reject-ring');
  const coreTop = root.querySelector('.filter-core small');
  const coreCount = root.querySelector('.filter-core b');
  const coreStatus = root.querySelector('.filter-core em');
  const signalItems = [...root.querySelectorAll('.signal-item')];
  const items = [['RSS', 'model release'], ['WEB', 'product update'], ['X', 'agent rumor'], ['GITHUB', 'agent memory'], ['PH', 'AI workflow'], ['HN', 'tool launch'], ['BLOG', 'benchmark note'], ['NEWS', 'new funding'], ['RSS', 'open model'], ['WEB', 'API update'], ['GITHUB', 'agent stack'], ['NEWS', 'chip release']];
  const rejectReasons = ['LOW TRUST', 'DUPLICATE', 'LOW VALUE', 'OFF TOPIC'];
  const random = (min, max) => Math.random() * (max - min) + min;
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const isMobile = () => window.matchMedia?.('(max-width: 860px)').matches ?? root.clientWidth < 860;
  let processed = 0;
  let signalCursor = 0;
  let mobileFlowCursor = 0;
  let busy = false;

  const emitSignal = (target) => {
    if (!root.isConnected) return;
    const previewRect = root.getBoundingClientRect();
    const zoneRect = filterZone.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetPadding = Number.parseFloat(getComputedStyle(target).paddingLeft) || 0;
    const startX = zoneRect.left - previewRect.left + zoneRect.width / 2;
    const startY = zoneRect.top - previewRect.top + zoneRect.height / 2;
    const particle = document.createElement('div');
    particle.className = 'signal-particle';
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.setProperty('--dx', `${targetRect.left - previewRect.left + targetPadding + 8 - startX}px`);
    particle.style.setProperty('--dy', `${targetRect.top - previewRect.top + targetRect.height / 2 - startY}px`);
    root.appendChild(particle);
    requestAnimationFrame(() => particle.classList.add('fly'));
    window.setTimeout(() => target.classList.add('hit'), 720);
    window.setTimeout(() => { target.classList.remove('hit'); particle.remove(); }, 1650);
  };

  const runProcess = (payload) => {
    busy = true;
    processed += 1;
    coreCount.textContent = String(processed).padStart(2, '0');
    coreTop.textContent = 'ANALYZING';
    coreStatus.textContent = 'SCAN';
    filterZone.classList.add('processing');
    processChip.className = 'process-chip show';
    processChip.textContent = `${payload.source} · ${payload.label}`;
    window.setTimeout(() => {
      if (!root.isConnected) return;
      if (payload.keep) {
        coreStatus.textContent = 'PASS';
        processChip.className = 'process-chip show pass';
        processChip.textContent = 'KEEP · HIGH SIGNAL';
        window.setTimeout(() => emitSignal(signalItems[signalCursor++ % signalItems.length]), 280);
      } else {
        coreStatus.textContent = 'OUT';
        processChip.className = 'process-chip show reject';
        processChip.textContent = `× ${payload.reason}`;
        rejectRing.classList.remove('show');
        void rejectRing.offsetWidth;
        rejectRing.classList.add('show');
      }
    }, 520);
    window.setTimeout(() => {
      if (!root.isConnected) return;
      filterZone.classList.remove('processing');
      processChip.className = 'process-chip';
      coreTop.textContent = 'FILTERING';
      coreStatus.textContent = 'READY';
      busy = false;
    }, 1350);
  };

  const queueProcess = (payload) => {
    const attempt = () => {
      if (!root.isConnected) return;
      if (busy) {
        window.setTimeout(attempt, 250);
        return;
      }
      runProcess(payload);
    };
    attempt();
  };

  const spawnFlowItem = () => {
    if (!root.isConnected) return;
    const rect = root.getBoundingClientRect();
    const [source, label] = pick(items);
    const keep = Math.random() < 0.38;
    const reason = keep ? '' : pick(rejectReasons);
    const item = document.createElement('div');
    item.className = `flow-item${keep ? '' : ' dead'}`;
    const mobile = isMobile();
    const mobileDirection = mobile ? mobileFlowCursor++ % 3 : -1;
    let startX;
    let startY;
    if (!mobile) {
      startX = rect.width * random(0.03, 0.15);
      startY = rect.height * random(0.24, 0.83);
    } else if (mobileDirection === 0) {
      startX = rect.width * random(0.06, 0.16);
      startY = rect.height * random(0.35, 0.52);
    } else if (mobileDirection === 1) {
      startX = rect.width * random(0.68, 0.78);
      startY = rect.height * random(0.35, 0.52);
    } else {
      startX = rect.width * random(0.40, 0.60);
      startY = rect.height * random(0.20, 0.28);
    }
    const endX = rect.width * random(mobile ? 0.47 : 0.405, mobile ? 0.53 : 0.435);
    const endY = rect.height * random(mobile ? 0.40 : 0.46, mobile ? 0.47 : 0.62);
    const tx = endX - startX;
    const ty = endY - startY;
    item.style.left = `${startX}px`;
    item.style.top = `${startY}px`;
    item.style.setProperty('--tx', `${tx}px`);
    item.style.setProperty('--ty', `${ty}px`);
    item.style.setProperty('--mx', `${tx * 0.6 + random(-8, 8)}px`);
    item.style.setProperty('--my', `${ty * 0.6 + random(-10, 10)}px`);
    item.style.setProperty('--px', `${tx * 0.84 + random(-5, 5)}px`);
    item.style.setProperty('--py', `${ty * 0.84 + random(-7, 7)}px`);
    item.style.setProperty('--dur', `${random(8.8, 11.8)}s`);
    item.innerHTML = `<span class="tick"></span><div class="main"><strong>${source}</strong> · ${label}</div>${keep ? '' : `<span class="reason">× ${reason}</span>`}`;
    flowLayer.appendChild(item);
    const duration = Number.parseFloat(getComputedStyle(item).getPropertyValue('--dur')) * 1000;
    window.setTimeout(() => {
      if (root.isConnected) queueProcess({ source, label, keep, reason });
      item.remove();
    }, duration - 180);
  };

  for (let index = 0; index < 4; index += 1) window.setTimeout(spawnFlowItem, index * 1200);
  const scheduleNext = () => window.setTimeout(() => {
    if (!root.isConnected) return;
    spawnFlowItem();
    scheduleNext();
  }, random(1800, 2600));
  scheduleNext();
}
