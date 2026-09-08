export function createDetailController({
  state,
  items,
  cards,
  dom,
  canOpenWork,
  getViewport,
  buildDetailPreview,
  cleanupDetailAudio,
  cleanupDetailVideo,
  onInvalidate = () => {}
}) {
  const {
    workDetailLayer: layer,
    workDetailCard: card,
    workDetailClose: closeButton,
    workDetailIndex: indexEl,
    workDetailPreview: preview,
    workDetailKicker: kickerEl,
    workDetailTitle: titleEl,
    workDetailTagline: taglineEl,
    workDetailDescription: descriptionEl,
    workDetailRole: roleEl,
    workDetailStatus: statusEl,
    workDetailYear: yearEl,
    workDetailAction: actionEl,
    workDetailTags: tagsEl
  } = dom;

  const setRect = rect => {
    card.style.left = `${rect.left}px`;
    card.style.top = `${rect.top}px`;
    card.style.width = `${rect.width}px`;
    card.style.height = `${rect.height}px`;
  };

  const resetToSourceRect = rect => {
    card.style.transition = 'none';
    card.classList.remove('is-expanded');
    setRect(rect);
    card.getBoundingClientRect();
    card.style.transition = '';
  };

  const getTargetRect = () => {
    const { width, height } = getViewport();
    if (width < 860) return { left: 18, top: 76, width: width - 36, height: height - 110 };
    const targetWidth = Math.min(width * .80, 1160);
    const targetHeight = Math.min(height * .74, 720);
    return {
      left: (width - targetWidth) / 2,
      top: (height - targetHeight) / 2,
      width: targetWidth,
      height: targetHeight
    };
  };

  const refreshOrigin = workIndex => {
    if (state.detailMode) return;
    const source = cards[workIndex];
    if (!source || !canOpenWork()) return;
    const rect = source.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    state.detailReturnRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    layer.classList.remove('is-open');
    layer.setAttribute('aria-hidden', 'true');
    resetToSourceRect(state.detailReturnRect);
  };

  const render = workIndex => {
    const item = items[workIndex];
    card.dataset.project = item.type;
    card.setAttribute('aria-label', `${item.name} project detail`);
    indexEl.textContent = `${item.idx} / PROJECT`;
    kickerEl.textContent = item.detail.kicker;
    titleEl.textContent = item.name;
    taglineEl.textContent = item.tagline;
    descriptionEl.textContent = item.description;
    roleEl.textContent = item.role.join(' · ');
    statusEl.textContent = item.status;
    yearEl.textContent = item.year;
    tagsEl.innerHTML = (item.tags || []).map(tag => `<span>${tag}</span>`).join('');
    const hasUrl = Boolean(item.url && item.url.trim());
    actionEl.textContent = item.detail.action;
    actionEl.href = hasUrl ? item.url : '#';
    actionEl.classList.toggle('is-placeholder', !hasUrl);
    actionEl.onclick = hasUrl ? null : event => event.preventDefault();
    buildDetailPreview(item, preview);
    const body = card.querySelector('.work-detail-body');
    if (body) body.scrollTop = 0;
  };

  const open = workIndex => {
    if (state.detailMode) return;
    if (!canOpenWork()) return;
    const source = cards[workIndex];
    const item = items[workIndex];
    if (!source || !item) return;
    render(workIndex);
    const rect = source.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    state.detailMode = true;
    state.hoveredWorkIndex = -1;
    state.selectedWorkIndex = workIndex;
    state.detailSourceCard = source;
    state.detailReturnRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    document.body.classList.add('detail-open');
    layer.classList.remove('is-open');
    layer.setAttribute('aria-hidden', 'true');
    resetToSourceRect(state.detailReturnRect);
    source.classList.add('detail-source-hidden');
    layer.classList.add('is-open');
    layer.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setRect(getTargetRect());
      card.classList.add('is-expanded');
    }));
    onInvalidate('detail-open');
  };

  const close = () => {
    if (!state.detailMode) return;
    cleanupDetailAudio();
    cleanupDetailVideo(preview);
    const source = state.detailSourceCard;
    const currentRect = source ? source.getBoundingClientRect() : null;
    const target = currentRect
      ? { left: currentRect.left, top: currentRect.top, width: currentRect.width, height: currentRect.height }
      : state.detailReturnRect;
    card.classList.remove('is-expanded');
    if (target) setRect(target);
    window.setTimeout(() => {
      layer.classList.remove('is-open');
      layer.setAttribute('aria-hidden', 'true');
      if (source) source.classList.remove('detail-source-hidden');
      document.body.classList.remove('detail-open');
      card.classList.remove('is-expanded');
      card.style.transition = '';
      state.detailMode = false;
      state.detailSourceCard = null;
      state.detailReturnRect = null;
      state.selectedWorkIndex = -1;
      onInvalidate('detail-close');
    }, 720);
  };

  closeButton.addEventListener('click', close);
  layer.querySelector('.work-detail-dim').addEventListener('click', close);
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && state.detailMode) close();
  });

  return Object.freeze({ open, close, refreshOrigin, render, getTargetRect, setRect });
}
