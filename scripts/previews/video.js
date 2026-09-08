export function renderVideoPreview({ item, preview }) {

  preview.innerHTML=`
    <div class="detail-harness-stage">
      <div class="detail-harness-app">
        <div class="detail-harness-head">
          <div class="detail-harness-brand">
            <small>VIDEO HARNESS / PERSONAL PRODUCTION SYSTEM</small>
            <h3>Video Production Harness</h3>
            <p>把原始内容稳定转化为可交付视频。可暂停、可检查、可恢复，而不是一键生成。</p>
          </div>
          <div class="detail-harness-metrics">
            <div class="detail-harness-metric"><b>55</b><span>Video Projects</span></div>
            <div class="detail-harness-metric"><b>15</b><span>Stages</span></div>
            <div class="detail-harness-metric"><b>✓</b><span>Human Gates</span></div>
          </div>
        </div>

        <div class="detail-harness-track" aria-label="Video production pipeline">
          <div class="detail-harness-track-step"><b>Source</b><span>Raw Material</span></div>
          <div class="detail-harness-track-step"><b>Analysis</b><span>Content</span></div>
          <div class="detail-harness-track-step"><b>Narrative</b><span>Story</span></div>
          <div class="detail-harness-track-step"><b>Scenes</b><span>Breakdown</span></div>
          <div class="detail-harness-track-step"><b>Prototype</b><span>HTML / CSS</span></div>
          <div class="detail-harness-track-step"><b>TTS</b><span>Voice</span></div>
          <div class="detail-harness-track-step"><b>Timeline</b><span>Sync</span></div>
          <div class="detail-harness-track-step"><b>Remotion</b><span>16:9</span></div>
          <div class="detail-harness-track-step"><b>Review</b><span>Human Gate</span></div>
          <div class="detail-harness-track-step"><b>Render</b><span>Artifact</span></div>
        </div>

        <div class="detail-harness-main detail-harness-main-v3">
          <div class="detail-harness-panel detail-harness-run">
            <div class="detail-harness-project">
              <div>
                <span class="detail-harness-eyebrow">CURRENT RUN · CODEX TUTORIAL</span>
                <h4>01 — What is Codex?</h4>
                <p>内容 → Scene → 声音 → 时间线 → Remotion → 远程渲染</p>
              </div>
            </div>

            <div class="detail-harness-state-area">
              <div class="detail-harness-state-head">
                <span>PIPELINE STATUS</span>
                <span class="detail-harness-chip">E2E VERIFIED</span>
              </div>
              <div class="detail-harness-state-grid">
                <div class="detail-harness-state pass"><small>Content</small><b>PASS</b></div>
                <div class="detail-harness-state pass"><small>Narrative</small><b>PASS</b></div>
                <div class="detail-harness-state gate"><small>Visual Gate</small><b>APPROVED</b></div>
                <div class="detail-harness-state pass"><small>TTS</small><b>SYNCED</b></div>
                <div class="detail-harness-state ready"><small>Remotion</small><b>READY</b></div>
                <div class="detail-harness-state pass"><small>Smoke Render</small><b>PASS</b></div>
              </div>
            </div>
          </div>

          <div class="detail-harness-panel detail-harness-control detail-harness-control-v3">
            <div class="detail-harness-gates">
              <div class="detail-harness-gate">
                <span class="detail-harness-stage-label">HUMAN GATE</span>
                <b>Visual Prototype Review</b>
                <p>先确认叙事、画面语言和节奏，再允许下游声音与 Remotion 继续推进。</p>
                <div class="detail-harness-gate-actions"><span>✓ APPROVE</span><span>↻ RETRY</span></div>
              </div>
              <div class="detail-harness-change">
                <span class="detail-harness-stage-label">DEPENDENCY CHECK</span>
                <b>上游变化，不静默复用旧产物</b>
                <p>脚本或视觉方向变化后，下游结果会重新进入确认状态。</p>
                <strong>visual-script changed → TTS / timeline / render · RECHECK</strong>
              </div>
            </div>

            <div class="detail-harness-remote">
              <b>GitHub Actions · Remote Smoke Render</b>
              <span>● PASS · artifact ready</span>
            </div>
          </div>

          <div class="detail-harness-panel detail-harness-output">
            <div class="detail-harness-output-head">
              <b>FINAL OUTPUT / 16:9</b>
              <span>PROGRAMMATIC VIDEO</span>
            </div>
            <div class="detail-harness-screen">
              <video class="detail-harness-video" controls playsinline preload="metadata">
                <source src="./assets/01-what-is-codex.mp4" type="video/mp4">
                当前浏览器无法播放此视频。
              </video>
            </div>
            <div class="detail-harness-output-info">
              <span>10 SCENES</span>
              <span>04:58</span>
              <span>REMOTION</span>
              <span>16:9</span>
            </div>
          </div>
        </div>

        <div class="detail-harness-foot">
          <strong>Source → Prototype → Sync → Review → Render</strong>
          <span>PAUSABLE · CHECKABLE · RECOVERABLE · React · TypeScript · Remotion · TTS</span>
        </div>
      </div>
    </div>`;
}
