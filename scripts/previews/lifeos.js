export function renderLifeosPreview({ item, preview }) {

  preview.innerHTML=`
    <div class="detail-lifeos-stage">
      <div class="detail-lifeos-app">
        <section class="detail-lifeos-card detail-lifeos-head">
          <div>
            <span class="detail-lifeos-eyebrow">LIFE OS / PERSONAL OPERATING SYSTEM</span>
            <h3>Life OS</h3>
            <p>把模糊方向持续压缩成可以执行的下一步，再用复盘校准下一轮。</p>
          </div>
          <div class="detail-lifeos-cycle">
            <small>LIVE CYCLE</small>
            <b>WEEK 08</b>
            <span>Goal → Action → Review</span>
          </div>
        </section>

        <section class="detail-lifeos-journey">
          <svg class="detail-lifeos-flowlines" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <path class="goal-line" d="M300 118 H352"/>
            <path class="project-line" d="M630 118 H682"/>
            <path class="task-line" d="M836 178 V260"/>
            <path class="task-line" d="M682 388 H630"/>
            <path class="task-line" d="M352 388 H300"/>
            <path class="review-line" d="M165 300 C48 298 44 126 165 118"/>
            <circle cx="165" cy="118" r="2.6" fill="var(--los-goal)"/>
            <circle cx="165" cy="300" r="2.6" fill="var(--los-review)"/>
          </svg>

          <article class="detail-lifeos-step goal">
            <div class="detail-lifeos-stepbar"><small>01 / GOAL DB</small><em>40%</em></div>
            <strong>建立稳定的个人创作体系</strong>
            <p>长期目标负责提供方向，不直接承担每天的执行。</p>
            <div class="detail-lifeos-props"><span>年度目标</span><span>Linked Projects · 2</span></div>
            <div class="detail-lifeos-scope"><span>DIRECTION</span><i></i></div>
          </article>

          <article class="detail-lifeos-step project">
            <div class="detail-lifeos-stepbar"><small>02 / PROJECT DB</small><em>进行中 · 60%</em></div>
            <strong>完成一组城市观察短文</strong>
            <p>项目把目标收敛为一个阶段结果，并始终维护下一步。</p>
            <div class="detail-lifeos-props"><span>Linked Goal · 个人创作体系</span><span>Next · 列出提纲</span></div>
            <div class="detail-lifeos-scope"><span>OUTCOME</span><i></i></div>
          </article>

          <article class="detail-lifeos-step decision">
            <div class="detail-lifeos-gate">
              <div class="detail-lifeos-stepbar"><small>03 / DECISION</small><em>行动判断</em></div>
              <div class="detail-lifeos-decision-title">现在能立刻开始行动吗？</div>
              <div class="detail-lifeos-choice"><span>YES<br>建立任务</span><span>NO<br>继续澄清下一步</span></div>
            </div>
          </article>

          <article class="detail-lifeos-step action">
            <div class="detail-lifeos-stepbar"><small>04 / TASK DB</small><em>NEXT ACTION</em></div>
            <div class="detail-lifeos-action-focus">
              <b>列出第一篇文章的三级提纲</b>
              <span>FOCUS · THIS WEEK · LINKED PROJECT</span>
            </div>
            <p>把项目继续压缩，直到它变成不用再思考“该怎么开始”的动作。</p>
            <div class="detail-lifeos-scope"><span>ACTION</span><i></i></div>
          </article>

          <article class="detail-lifeos-step execute">
            <div class="detail-lifeos-stepbar"><small>05 / TODAY · THIS WEEK</small><em>EXECUTE</em></div>
            <strong>进入真实执行队列</strong>
            <div class="detail-lifeos-today">
              <div class="detail-lifeos-check"><i></i><span>整理本周阅读摘录</span><b>0.5h</b></div>
              <div class="detail-lifeos-check is-current"><i></i><span>列出第一篇文章的三级提纲</span><b>1h</b></div>
              <div class="detail-lifeos-check"><i></i><span>周复盘</span><b>0.5h</b></div>
            </div>
          </article>

          <article class="detail-lifeos-step review">
            <div class="detail-lifeos-stepbar"><small>06 / WEEKLY REVIEW</small><em>FEEDBACK</em></div>
            <strong>执行结果回到系统</strong>
            <div class="detail-lifeos-review-metrics">
              <div><b>84%</b><span>任务完成</span></div>
              <div><b>71%</b><span>习惯达成</span></div>
              <div><b>10.8h</b><span>专注时长</span></div>
            </div>
            <div class="detail-lifeos-review-insight">
              <small>WEEKLY SIGNAL</small>
              <b>创作推进稳定，但输入时间偏散 → 下一周固定两次深度阅读时段。</b>
            </div>
          </article>
        </section>

        <section class="detail-lifeos-principles">
          <b><strong>项目只维护下一步。</strong> 完成一步，再定下一步；复盘负责校准下一轮。</b>
          <span>GOAL → PROJECT → ACTION → REVIEW ↺</span>
        </section>
      </div>
    </div>`;
}
