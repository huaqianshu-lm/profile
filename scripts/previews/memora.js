export function renderMemoraPreview({ item, preview }) {

  preview.innerHTML=`
    <div class="detail-memora-stage">
      <div class="detail-memora-app">
        <section class="detail-memora-hero">
          <div class="detail-memora-card detail-memora-head">
            <small>PERSONAL KNOWLEDGE OS</small>
            <h3>Memora</h3>
            <p>让记忆流光化为洞察与输出</p>
            <div class="detail-memora-search"><span>🔎　查询知识库中的主题、判断与输出……</span><b>⌘ K</b></div>
          </div>
          <div class="detail-memora-card detail-memora-focus">
            <span class="detail-memora-kicker">◎ 当前探索 / Current Focus</span>
            <h4>可追溯且解耦的项目状态记忆</h4>
            <p>项目重要变化发生时主动记录结构化事实，并通过本地 Outbox、统一写入器和独立消费链路保留中间状态，让状态记忆不依赖 ROADMAP 容器或 Memora 是否在线。</p>
            <span class="detail-memora-pill">重点关联笔记</span>
          </div>
        </section>

        <section class="detail-memora-stats">
          <div class="detail-memora-stat"><b>159</b><span>原始素材</span></div>
          <div class="detail-memora-stat"><b>167</b><span>结构化笔记</span></div>
          <div class="detail-memora-stat"><b>12</b><span>Wiki 主题页</span></div>
          <div class="detail-memora-stat"><b>47</b><span>输出型 Brief</span></div>
        </section>

        <section class="detail-memora-main">
          <div class="detail-memora-left">
            <div class="detail-memora-panel">
              <div class="detail-memora-panelhead">
                <div class="detail-memora-section"><small>OUTPUT WORKBENCH</small><h5>待推进的输出任务</h5></div>
                <span class="detail-memora-panelhint">05</span>
              </div>
              <div class="detail-memora-list">
                <div class="detail-memora-item"><b>为什么 Prompt Engineering 正在让位于 Context Engineering</b><span><em>已有初稿，下一步收敛成终稿</em><i class="detail-memora-tag">待终稿</i></span></div>
                <div class="detail-memora-item"><b>我是怎么用 AI 写出第一首歌的</b><span><em>梳理流程，补充关键截图</em><i class="detail-memora-tag">结构化整理</i></span></div>
                <div class="detail-memora-item"><b>Memora 知识库价值盘点</b><span><em>提炼机制、案例与边界</em><i class="detail-memora-tag">待终稿</i></span></div>
              </div>
            </div>
            <div class="detail-memora-panel">
              <div class="detail-memora-panelhead">
                <div class="detail-memora-section"><small>TODAY</small><h5>本周核心洞察</h5></div>
                <span class="detail-memora-panelhint">固定 3 条</span>
              </div>
              <div class="detail-memora-insights">
                <div class="detail-memora-insight"><b>Project Events 的实践支持既有分工：稳定触发边界进入全局规则，需要语义判断的流程进入 Skill。</b><span>近期项目实践正在为已有判断补充新的实践证据。</span></div>
                <div class="detail-memora-insight"><b>既有知识中关于重要上下文必须外化、长期状态不能只依赖单次对话的判断，与项目状态变化的实时记录机制重新相关。</b><span>过去沉淀的知识与当前关注主题建立了联系。</span></div>
              </div>
            </div>
          </div>

          <div class="detail-memora-right">
            <div class="detail-memora-panel">
              <div class="detail-memora-panelhead">
                <div class="detail-memora-section"><small>输出节奏</small><h5>本周产出视图</h5></div>
                <span class="detail-memora-panelhint">03</span>
              </div>
              <div class="detail-memora-metrics">
                <div><b>0</b><span>可以输出的主题</span></div>
                <div><b>0</b><span>尚未形成 brief</span></div>
                <div><b>33</b><span>已有输出资产</span></div>
                <div><b>2</b><span>待入库输入</span></div>
              </div>
              <div class="detail-memora-note">围绕“可追溯且解耦的项目状态记忆”，今天需要从上面的机会中选一个，推进到下一阶段。<div class="detail-memora-link">打开完整输出索引 →</div></div>
            </div>
            <div class="detail-memora-panel">
              <div class="detail-memora-panelhead">
                <div class="detail-memora-section"><small>持续阅读</small><h5>知识输入队列</h5></div>
                <span class="detail-memora-panelhint">共 23 篇</span>
              </div>
              <div class="detail-memora-reading">
                <div class="detail-memora-readingitem"><b>Claude Code 记忆系统：不是让 AI 记住更多，而是让它按时看到正确上下文</b><span>与长期状态管理直接相关</span></div>
                <div class="detail-memora-readingitem"><b>SRT 白板动画 Skill：字幕驱动的手绘视频工作流</b><span>连接知识沉淀与内容输出</span></div>
                <div class="detail-memora-readingitem"><b>两篇 AI 知识库文章与 Memora 的对比总结</b><span>帮助界定方法边界与产品化方向</span></div>
              </div>
            </div>
          </div>
        </section>

        <section class="detail-memora-domains">
          <div class="detail-memora-domain"><small>KNOWLEDGE DOMAIN 01</small><h6>AI 协作与工程</h6><p>与智能体协作、提示词、上下文与工作流编织成可靠系统。</p><b>132 篇关联笔记</b></div>
          <div class="detail-memora-domain"><small>KNOWLEDGE DOMAIN 02</small><h6>AI 原理与基础设施</h6><p>回到第一性原理，理解模型、检索与自动化的底层运行。</p><b>70 篇关联笔记</b></div>
          <div class="detail-memora-domain"><small>KNOWLEDGE DOMAIN 03</small><h6>学习与个人成长</h6><p>把学习变成系统，让思考在长期积累中获得复利。</p><b>19 篇关联笔记</b></div>
          <div class="detail-memora-domain"><small>KNOWLEDGE DOMAIN 04</small><h6>知识 / 产品与输出</h6><p>让洞察被组织，让想法被验证，让价值被看见与传递。</p><b>42 篇关联笔记</b></div>
        </section>

        <section class="detail-memora-flow">
          <div class="detail-memora-flowstep"><b>1</b><h6>语义分析</h6><p>Topic / Question / Method / Decision / Result</p></div>
          <div class="detail-memora-flowstep"><b>2</b><h6>跨项目聚合</h6><p>一个主方向 + 最多一个次方向</p></div>
          <div class="detail-memora-flowstep"><b>3</b><h6>知识激活</h6><p>wiki → notes → briefs</p></div>
          <div class="detail-memora-flowstep"><b>4</b><h6>语义候选</h6><p>经验、方法、判断或输出机会</p></div>
          <div class="detail-memora-flowstep"><b>5</b><h6>人工确认</h6><p>待阅读 / 入库 / 忽略</p></div>
        </section>
      </div>
    </div>`;
}
