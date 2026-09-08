export function renderEcholinePreview({ item, preview }) {

  preview.innerHTML=`
    <div class="detail-echo-stage">
      <div class="detail-echo-app">
        <div class="detail-echo-header">
          <div class="detail-echo-brand">
            <small>LOCAL LISTENING STUDIO</small>
            <strong>Echoline</strong>
          </div>
          <div class="detail-echo-actions">
            <span class="detail-echo-pill is-fill">加载视频</span>
            <span class="detail-echo-pill">加载字幕</span>
            <span class="detail-echo-pill detail-echo-theme"><span class="detail-echo-theme-light">主题 · 浅色</span><span class="detail-echo-theme-dark">主题 · 深色</span></span>
            <span class="detail-echo-pill">快捷键设置</span>
          </div>
          <span class="detail-echo-cta">间隔复习</span>
        </div>

        <div class="detail-echo-shell">
          <div class="detail-echo-player">
            <div class="detail-echo-file"><span>当前视频</span><b>01.mp4</b></div>
            <div class="detail-echo-trackline">
              <span>00:49</span>
              <div class="detail-echo-track" style="--echo-progress:31%"><i></i></div>
              <span>22:48</span>
            </div>
            <div class="detail-echo-controls">
              <span class="detail-echo-chip">上一句</span>
              <span class="detail-echo-chip is-fill">播放</span>
              <span class="detail-echo-chip">下一句</span>
              <span class="detail-echo-chip">单句循环</span>
              <span class="detail-echo-chip is-soft">隐藏字幕</span>
              <span class="detail-echo-chip is-soft">展开画面</span>
              <span class="detail-echo-hint">Option/Alt + Space 播放 / 暂停　Option/Alt + ← → 切句　Option/Alt + R 循环</span>
            </div>
            <div class="detail-echo-speed">
              <span class="detail-echo-label">播放速度</span>
              <span class="detail-echo-mini">0.75x</span>
              <span class="detail-echo-mini is-active">1.0x</span>
              <span class="detail-echo-mini">1.25x</span>
            </div>
            <div class="detail-echo-offset">
              <span class="detail-echo-label">字幕校准</span>
              <span class="detail-echo-ghost">−0.5s</span>
              <span class="detail-echo-ghost">−0.1s</span>
              <span class="detail-echo-ghost">0</span>
              <span class="detail-echo-ghost">+0.1s</span>
              <span class="detail-echo-ghost">+0.5s</span>
              <span class="detail-echo-ghost is-disabled">重置</span>
            </div>
          </div>

          <div class="detail-echo-grid">
            <section class="detail-echo-panel">
              <div class="detail-echo-panelhead">
                <div><span>当前字幕</span><b>第 3 句</b></div>
                <span>Friends.S01E01.chs&eng.sohu.ass</span>
              </div>
              <div class="detail-echo-lesson">
                <div class="detail-echo-sentence-cn">这没什么好说的</div>
                <div class="detail-echo-sentence-en">There's nothing to tell!</div>
              </div>
              <div class="detail-echo-divider"></div>
              <div class="detail-echo-mode">
                <div class="detail-echo-modehead">
                  <span>听写模式</span>
                  <span>播放 28 次 · 循环 15 次</span>
                </div>
                <p>可以先隐藏字幕，再输入你听到的内容。</p>
                <div class="detail-echo-textarea">输入你听到的内容……</div>
                <div class="detail-echo-bottomactions">
                  <span class="detail-echo-submit">检查</span>
                  <span class="detail-echo-cancel">取消难句</span>
                </div>
              </div>
            </section>

            <section class="detail-echo-panel detail-echo-panel--right">
              <div class="detail-echo-panelhead">
                <div><span>字幕列表</span><b>383 句</b></div>
                <span>当前句高亮</span>
              </div>
              <div class="detail-echo-list">
                <div class="detail-echo-listrow is-active">
                  <em>03</em>
                  <div><b>这没什么好说的 There's nothing to tell!</b><span>00:49 → 00:51</span></div>
                </div>
                <div class="detail-echo-listrow">
                  <em>04</em>
                  <div><b>他不过是我的同事 He's just some guy I work with!</b><span>00:51 → 00:53</span></div>
                </div>
                <div class="detail-echo-listrow">
                  <em>05</em>
                  <div><b>少来了 你们都在约会了 C'mon, you're going out with the guy!</b><span>00:53 → 00:55</span></div>
                </div>
              </div>
              <div class="detail-echo-sidebottom">
                <div class="detail-echo-panelhead">
                  <div><span>本集难句</span><b>27 句</b></div>
                  <span>可进入复习</span>
                </div>
                <div class="detail-echo-hardlist">
                  <div class="detail-echo-hardrow">
                    <em>03</em>
                    <div><b>这没什么好说的 There's nothing to tell!</b><span>第 3 句</span></div>
                  </div>
                  <div class="detail-echo-hardrow">
                    <em>04</em>
                    <div><b>他不过是我的同事 He's just some guy I work with!</b><span>第 4 句</span></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>`;
}
