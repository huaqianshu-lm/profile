export function renderLifeosPreview({ item, preview }) {
  preview.innerHTML=`
    <div class="detail-lifeos-demo-stage">
      <main class="detail-lifeos-demo-preview">
          <header class="detail-lifeos-demo-masthead">
            <div class="detail-lifeos-demo-brand">
              <small>05 / PERSONAL OPERATING SYSTEM</small>
              <h1>Life OS</h1>
              <p>把所有事情，持续转化为可执行的下一步行动。</p>
            </div>
            <div class="detail-lifeos-demo-status"><i></i><span>FLOW RUNNING</span></div>
          </header>

          <section class="detail-lifeos-demo-flow" aria-label="Life OS 任务决策流程">
            <svg class="detail-lifeos-demo-connectors" viewBox="0 0 1300 640" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="arrow-gray" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#969d98" /></marker>
                <marker id="arrow-green" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#4f8d6e" /></marker>
                <marker id="arrow-orange" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#bf7b42" /></marker>
                <marker id="arrow-purple" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#876f89" /></marker>
              </defs>
              <path d="M650 109V121" marker-end="url(#arrow-gray)" />
              <path class="active" d="M574 161H273V282" marker-end="url(#arrow-green)" />
              <path class="active project-route" d="M726 161H1027V282" marker-end="url(#arrow-orange)" />
              <path d="M273 486V530H540" marker-end="url(#arrow-gray)" />
              <path d="M1027 486V530H760" marker-end="url(#arrow-gray)" />
              <path d="M650 486V530" marker-end="url(#arrow-purple)" />
              <text class="yes" x="420" y="148">能 · 直接行动</text>
              <text class="no" x="795" y="148">不能 · 先建项目</text>
            </svg>

            <article class="detail-lifeos-demo-node detail-lifeos-demo-capture">
              <div class="detail-lifeos-demo-node-copy">
                <span class="detail-lifeos-demo-node-index">00 / CAPTURE</span>
                <strong>想到一件事情</strong>
                <span>先进入收集箱，不让念头丢失</span>
              </div>
            </article>

            <article class="detail-lifeos-demo-decision">
              <div>
                <small>DECISION</small>
                <strong>能否立即<br />开始行动？</strong>
              </div>
            </article>

            <section class="detail-lifeos-demo-lane detail-lifeos-demo-lane-direct">
              <div class="detail-lifeos-demo-lane-title">PATH A / DIRECT</div>
              <div class="detail-lifeos-demo-lane-content">
                <article class="detail-lifeos-demo-node">
                  <div class="detail-lifeos-demo-node-copy">
                    <span class="detail-lifeos-demo-node-index">01 / TASK</span>
                    <strong>直接建立任务</strong>
                    <span>明确一个可完成动作</span>
                  </div>
                </article>
                <div class="detail-lifeos-demo-arrow">→</div>
                <article class="detail-lifeos-demo-node">
                  <div class="detail-lifeos-demo-node-copy">
                    <span class="detail-lifeos-demo-node-index">02 / TODAY</span>
                    <strong>进入今日任务</strong>
                    <span>安排时间，开始执行</span>
                  </div>
                </article>
              </div>
            </section>

            <section class="detail-lifeos-demo-lane detail-lifeos-demo-lane-project">
              <div class="detail-lifeos-demo-lane-title">PATH B / PROJECT</div>
              <div class="detail-lifeos-demo-lane-content">
                <article class="detail-lifeos-demo-node">
                  <div class="detail-lifeos-demo-node-copy">
                    <span class="detail-lifeos-demo-node-index">01 / PROJECT</span>
                    <strong>建立项目</strong>
                    <span>定义阶段性结果</span>
                  </div>
                </article>
                <div class="detail-lifeos-demo-arrow">→</div>
                <article class="detail-lifeos-demo-node">
                  <div class="detail-lifeos-demo-node-copy">
                    <span class="detail-lifeos-demo-node-index">02 / NEXT</span>
                    <strong>找到下一步</strong>
                    <span>继续拆解到可行动</span>
                  </div>
                </article>
                <div class="detail-lifeos-demo-arrow">→</div>
                <article class="detail-lifeos-demo-node">
                  <div class="detail-lifeos-demo-node-copy">
                    <span class="detail-lifeos-demo-node-index">03 / TASK</span>
                    <strong>建立任务</strong>
                    <span>加入执行队列</span>
                  </div>
                </article>
              </div>
            </section>

            <section class="detail-lifeos-demo-merge">
              <article class="detail-lifeos-demo-node">
                <div class="detail-lifeos-demo-node-copy">
                  <span class="detail-lifeos-demo-node-index">04 / EXECUTE</span>
                  <strong>完成当前行动</strong>
                  <span>打勾完成，只关注此刻的一步</span>
                </div>
              </article>
              <div class="detail-lifeos-demo-arrow">→</div>
              <article class="detail-lifeos-demo-node">
                <div class="detail-lifeos-demo-node-copy">
                  <span class="detail-lifeos-demo-node-index">05 / REVIEW</span>
                  <strong>复盘并校准</strong>
                  <span>完成一步，再决定下一步</span>
                </div>
              </article>
            </section>
          </section>

          <footer class="detail-lifeos-demo-footer">
            <span><b>ONE PROJECT · ONE NEXT ACTION</b></span>
            <span>GOAL → PROJECT → TASK → REVIEW ↺</span>
          </footer>
        </main>
    </div>`;
}
