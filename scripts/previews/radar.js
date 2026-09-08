export function renderRadarPreview({ item, preview }) {

  preview.innerHTML=`
    <div class="detail-radar-stage">
      <div class="detail-radar-app">
        <header class="detail-radar-head">
          <div class="detail-radar-brand">
            <small>PERSONAL AI INTELLIGENCE PIPELINE</small>
            <h3>AI Radar</h3>
            <p>From scattered AI signals to a personal daily radar.</p>
          </div>
          <div class="detail-radar-status">
            <small>DAILY RUN</small>
            <b>PROCESSING · 06:00</b>
          </div>
        </header>

        <div class="detail-radar-body">
          <section class="detail-radar-card detail-radar-sources">
            <span class="detail-radar-section-label">01 / PUBLIC SOURCES</span>
            <div class="detail-radar-source-list">
              <div class="detail-radar-source"><b>RSS</b><span>official blogs / newsletters</span></div>
              <div class="detail-radar-source"><b>WEB</b><span>public pages / releases</span></div>
              <div class="detail-radar-source"><b>X API</b><span>configured accounts only</span></div>
              <div class="detail-radar-source"><b>PRODUCT HUNT</b><span>selected product signals</span></div>
            </div>
            <div class="detail-radar-capture">
              <b>RAW CAPTURE FIRST</b>
              <span>先保存原始资料，再进行结构化处理；浏览器不直接抓取，也不直接调用 AI。</span>
            </div>
          </section>

          <section class="detail-radar-card detail-radar-pipe">
            <span class="detail-radar-section-label">02 / SIGNAL PROCESSING</span>
            <div class="detail-radar-steps">
              <div class="detail-radar-step"><em>1</em><b>CAPTURE</b><span>每日抓取原始资料</span></div>
              <div class="detail-radar-step"><em>2</em><b>STRUCTURE</b><span>提取标题、链接、时间与正文</span></div>
              <div class="detail-radar-step">
                <em>3</em><b>DEDUPLICATE</b><span>URL · Title · Time Window</span>
                <div class="detail-radar-dedup"><i class="drop">same signal</i><i class="drop">same signal</i><i class="keep">KEEP 01</i></div>
              </div>
              <div class="detail-radar-step">
                <em>4</em><b>AI PROCESS</b><span>Gemini · 中文标题 / 摘要</span>
                <div class="detail-radar-translate">New model &amp; API update → <strong>新模型与 API 更新</strong></div>
              </div>
              <div class="detail-radar-step"><em>5</em><b>BUILD</b><span>生成稳定的前端 JSON</span></div>
              <div class="detail-radar-step"><em>6</em><b>PUBLISH</b><span>Website / Optional Daily Brief</span></div>
            </div>
          </section>

          <div class="detail-radar-output">
            <section class="detail-radar-card detail-radar-result">
              <div class="detail-radar-result-head"><b>TODAY'S RADAR</b><span>JSON READY</span></div>
              <div class="detail-radar-story"><small>MODEL / OFFICIAL</small><b>模型能力与开发接口出现新的可用变化</b><p>保留原始来源，并提供中文标题与摘要用于快速判断是否继续阅读。</p></div>
              <div class="detail-radar-story"><small>TOOL / PRODUCT</small><b>新的 AI 工具开始影响现有工作流</b><p>从分散信号中留下值得进入当天视野的变化。</p></div>
            </section>
            <section class="detail-radar-card detail-radar-result detail-radar-brief">
              <div class="detail-radar-result-head"><b>DAILY BRIEF</b><span>OPTIONAL</span></div>
              <blockquote>不是自动替你打分，而是在处理完成后进一步整理“今天哪些变化值得关注”。</blockquote>
              <div class="detail-radar-brief-tags"><span>Translate</span><span>Summarize</span><span>Filter</span><span>Verify Source</span></div>
            </section>
          </div>
        </div>

        <footer class="detail-radar-foot">
          <strong>Signal → Structure → Filter → Translate → Publish</strong>
          <span>DAILY RUN · STATIC JSON · NO AUTO SCORE · MEMORA WRITE OFF</span>
        </footer>
      </div>
    </div>`;
}
