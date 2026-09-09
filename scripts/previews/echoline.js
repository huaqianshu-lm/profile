const ECHO_WAVE_BARS = Object.freeze([
  ['a', '.1s'], ['c', '.2s'], ['b', '.35s'], ['e', '.5s'], ['d', '.7s'],
  ['h', '.8s'], ['f', '.95s'], ['j', '1.1s'], ['c', '1.3s'], ['g', '1.45s'],
  ['i', '1.6s'], ['e', '1.75s'], ['f', '1.9s'], ['b', '2.05s'], ['h', '2.2s'],
  ['d', '2.4s'], ['j', '2.55s'], ['c', '2.7s'], ['f', '2.85s'], ['a', '3s'],
  ['i', '3.15s'], ['e', '3.3s'], ['b', '3.45s'], ['h', '3.6s'], ['c', '3.8s'],
  ['j', '4s'], ['d', '4.15s'], ['f', '4.3s'], ['b', '4.45s'], ['g', '4.6s']
]);

let stopActiveCycle = null;

export function cleanupEcholinePreview(){
  stopActiveCycle?.();
  stopActiveCycle = null;
}

function startDemoCycle(root){
  cleanupEcholinePreview();

  const subtitle = root.querySelector('[data-echo-subtitle]');
  const focusHint = root.querySelector('[data-echo-focus-hint]');
  const heardCount = root.querySelector('[data-echo-heard-count]');
  const typed = root.querySelector('[data-echo-typed]');
  const dictationState = root.querySelector('[data-echo-dictation-state]');
  let timers = [];
  let disposed = false;

  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers = timers.filter(timer => timer !== id);
      if (!disposed) fn();
    }, ms);
    timers.push(id);
  };

  const resetCycle = () => {
    if (disposed) return;
    timers.forEach(clearTimeout);
    timers = [];

    subtitle.className = 'detail-echo-demo-subtitle is-hidden';
    focusHint.textContent = '字幕隐藏 · 先听一遍';
    heardCount.textContent = '01';

    typed.classList.remove('is-typing');
    typed.style.width = '0';
    dictationState.textContent = '先听，再写下你听到的内容';

    later(() => heardCount.textContent = '02', 5000);
    later(() => heardCount.textContent = '03', 10000);

    later(() => {
      dictationState.textContent = '写下你听到的内容';
      typed.style.width = '';
      typed.classList.add('is-typing');
    }, 11300);

    later(() => heardCount.textContent = '04', 15000);

    later(() => {
      subtitle.className = 'detail-echo-demo-subtitle is-revealed';
      focusHint.textContent = '与原句对照';
      dictationState.textContent = '检查差异';
    }, 16600);

    later(() => {
      heardCount.textContent = '05';
      focusHint.textContent = '带着答案再听一遍';
    }, 19000);

    later(resetCycle, 24000);
  };

  stopActiveCycle = () => {
    disposed = true;
    timers.forEach(clearTimeout);
    timers = [];
  };
  resetCycle();
}

export function renderEcholinePreview({ preview }){
  cleanupEcholinePreview();

  preview.innerHTML = `
    <section class="detail-echo-demo" aria-label="Echoline preview">
      <div class="detail-echo-demo-top">
        <div class="detail-echo-demo-brand">ECHO<span>LINE</span></div>
        <div class="detail-echo-demo-mode">精听训练 / 单句循环</div>
      </div>

      <div class="detail-echo-demo-sentence-meta">
        SENTENCE <b>12</b> / 48 · 00:42 — 00:47
      </div>

      <div class="detail-echo-demo-loop-badge">
        <span class="detail-echo-demo-loop-icon"></span>
        <span class="detail-echo-demo-loop-copy">循环播放当前句</span>
      </div>

      <div class="detail-echo-demo-focus">
        <div class="detail-echo-demo-hint" data-echo-focus-hint>字幕隐藏 · 先听一遍</div>
        <h1 class="detail-echo-demo-subtitle is-hidden" data-echo-subtitle>
          “I <span class="soft">didn’t realize</span> how much time<br>
          we were actually wasting.”
        </h1>
      </div>

      <div class="detail-echo-demo-wave-wrap">
        <div class="detail-echo-demo-wave">
          ${ECHO_WAVE_BARS.map(([size, delay]) => `<span class="bar ${size}" style="--d:${delay}"></span>`).join('')}
        </div>
        <div class="detail-echo-demo-track"></div>
        <div class="detail-echo-demo-range"></div>
        <div class="detail-echo-demo-playhead"></div>
      </div>

      <div class="detail-echo-demo-repeat">
        HEARD
        <strong class="is-current" data-echo-heard-count>01</strong>
        <span>/</span>
        <strong>05</strong>
        TIMES
      </div>

      <div class="detail-echo-demo-dictation">
        <div class="detail-echo-demo-dictation-head">
          <div class="detail-echo-demo-dictation-title">听写</div>
          <div class="detail-echo-demo-state" data-echo-dictation-state>先听，再写下你听到的内容</div>
        </div>

        <div class="detail-echo-demo-input-line">
          <span class="detail-echo-demo-typed" data-echo-typed>
            I didn't realize how much <span class="wrong">times</span> we were actually wasting.
          </span>
        </div>
      </div>

      <div class="detail-echo-demo-footer">
        <span>SPACE · PLAY / REPLAY</span>
        <span class="detail-echo-demo-footer-copy">
          <b>一句话，</b>直到真正听清。
        </span>
      </div>
    </section>`;

  startDemoCycle(preview.querySelector('.detail-echo-demo'));
}
