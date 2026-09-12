export function renderMapPreview({ preview }) {
  preview.innerHTML = `
    <section class="detail-map-stage" aria-label="AI Knowledge Map preview">
      <div class="detail-map-head">
        <div class="detail-map-brand">
          <h1>AI Knowledge Map</h1>
          <small>AI Application Engineering</small>
        </div>
        <input class="detail-map-search" data-map-search placeholder="搜索节点 / Tool Call" />
      </div>

      <div class="detail-map-legend">
        <span class="detail-map-legend-item" style="--c:var(--map-unknown)"><i class="detail-map-legend-dot"></i>Unknown</span>
        <span class="detail-map-legend-item" style="--c:var(--map-gap)"><i class="detail-map-legend-dot"></i>Gap</span>
        <span class="detail-map-legend-item" style="--c:var(--map-active)"><i class="detail-map-legend-dot"></i>Active</span>
        <span class="detail-map-legend-item" style="--c:var(--map-stable)"><i class="detail-map-legend-dot"></i>Stable</span>
        <span class="detail-map-legend-item" style="--c:var(--map-backlog)"><i class="detail-map-legend-dot"></i>Backlog</span>
      </div>

      <div class="detail-map-scroll">
        <div class="detail-map"><div class="detail-map-domains"></div></div>
      </div>

      <div class="detail-map-drawer">
        <button class="detail-map-drawer-close" type="button" aria-label="关闭">×</button>
        <h2 class="detail-map-drawer-title"></h2>
        <div class="detail-map-drawer-sub"></div>
        <div class="detail-map-kv"><b>当前 Level</b><div data-map-current></div></div>
        <div class="detail-map-kv"><b>目标 Level</b><div data-map-target></div></div>
        <div class="detail-map-kv"><b>学习状态</b><div data-map-status></div></div>
        <div class="detail-map-kv"><b>前置节点</b><div data-map-pre></div></div>
        <div class="detail-map-kv"><b>学习要点</b><div><ul class="detail-map-drawer-points"></ul></div></div>
      </div>
    </section>`;

  const root = preview.querySelector('.detail-map-stage');
  const domainsEl = root.querySelector('.detail-map-domains');
  const searchEl = root.querySelector('[data-map-search]');
  const drawer = root.querySelector('.detail-map-drawer');
  const drawerClose = root.querySelector('.detail-map-drawer-close');
  const drawerTitle = root.querySelector('.detail-map-drawer-title');
  const drawerSub = root.querySelector('.detail-map-drawer-sub');
  const drawerCurrent = root.querySelector('[data-map-current]');
  const drawerTarget = root.querySelector('[data-map-target]');
  const drawerStatus = root.querySelector('[data-map-status]');
  const drawerPre = root.querySelector('[data-map-pre]');
  const drawerPoints = root.querySelector('.detail-map-drawer-points');

  const DATA = {
    "A": { name: "LLM Mental Model", nodes: [
      { id: "A1", name: "LLM Runtime Mental Model", cur: "L2", tgt: "L3", status: "Active", pre: "—", points: ["Input → Context → Inference → Output / Tool Call"] },
      { id: "A7", name: "Tool Calling", cur: "L2", tgt: "L3", status: "Active", pre: "A1,A4", points: ["模型产生 Tool Call", "外部执行后重新进入模型"] }
    ]},
    "B": { name: "Context Engineering", nodes: [
      { id: "B1", name: "Prompt vs Context", cur: "L3", tgt: "L3", status: "Stable", pre: "A1", points: ["Prompt = 当前指令", "Context = 模型实际看到的全部信息"] },
      { id: "B3", name: "Context Architecture", cur: "L2-L3", tgt: "L3", status: "Active", pre: "B1,B2", points: ["长期规则 · 项目规则 · 当前状态", "不把所有信息塞进同一文件"] }
    ]},
    "C": { name: "Tools / API / Protocol", nodes: [
      { id: "C5", name: "Tool Calling Loop", cur: "L1-L2", tgt: "L3", status: "Gap", pre: "A7,C4", points: ["Goal → Model → Tool Call → Result → Next"] },
      { id: "C8", name: "MCP", cur: "L2", tgt: "L2", status: "Stable", pre: "C5", points: ["标准化接入外部能力", "先理解协议角色"] }
    ]},
    "D": { name: "Agent", nodes: [
      { id: "D1", name: "Agent Mental Model", cur: "L2", tgt: "L3", status: "Active", pre: "A1", points: ["Agent ≠ 更聪明的聊天机器人", "Goal + Model + Tools + Loop"] },
      { id: "D2", name: "Agent Loop", cur: "L2", tgt: "L3", status: "Active", pre: "D1,C5", points: ["Observe → Plan → Action → Update"] }
    ]},
    "E": { name: "Workflow / Orchestration", nodes: [
      { id: "E1", name: "Workflow Decomposition", cur: "L3", tgt: "L4", status: "Stable", pre: "—", points: ["把大任务拆成稳定步骤"] },
      { id: "E9", name: "Agent + Workflow", cur: "L2", tgt: "L4", status: "Gap", pre: "D2,E7,E8", points: ["不是超级 Agent 做所有事"] }
    ]},
    "F": { name: "Harness Engineering", nodes: [
      { id: "F1", name: "Harness Mental Model", cur: "L2-L3", tgt: "L3", status: "Active", pre: "D1,E1", points: ["Harness 不是 Agent 本身"] },
      { id: "F2", name: "Harness Architecture", cur: "L2", tgt: "L3", status: "Active", pre: "F1", points: ["Model / Context / Tool / State 放哪里"] }
    ]},
    "G": { name: "Skill", nodes: [
      { id: "G1", name: "Skill Mental Model", cur: "L2", tgt: "L3", status: "Active", pre: "B1", points: ["Trigger → Context → Instructions → Tools"] },
      { id: "G2", name: "Skill vs Prompt / Rule", cur: "L2", tgt: "L3", status: "Active", pre: "G1,C4,E1", points: ["反复调用的一套能力"] }
    ]}
  };

  const STATUS = {
    "Unknown": "var(--map-unknown)", "Gap": "var(--map-gap)", "Active": "var(--map-active)",
    "Stable": "var(--map-stable)", "Backlog": "var(--map-backlog)"
  };

  function build() {
    Object.entries(DATA).forEach(([code, d]) => {
      const domain = document.createElement("section");
      domain.className = "detail-map-domain";
      domain.innerHTML = `
        <div class="detail-map-domain-head">
          <div class="detail-map-domain-code">${code}</div>
          <div class="detail-map-domain-name">${d.name}</div>
          <div class="detail-map-domain-count">${d.nodes.length} 个节点</div>
        </div>
        <div class="detail-map-nodes"></div>`;
      domain.querySelector(".detail-map-domain-head").onclick = () => domain.classList.toggle("is-collapsed");
      const nodesEl = domain.querySelector(".detail-map-nodes");

      d.nodes.forEach(n => {
        const wrap = document.createElement("div");
        wrap.className = "detail-map-node";
        wrap.style.setProperty("--state-color", STATUS[n.status] || STATUS["Unknown"]);

        const searchable = [n.id, n.name, n.status, d.name, ...n.points].join(" ").toLowerCase();
        wrap.dataset.search = searchable;

        wrap.innerHTML = `
          <div class="detail-map-node-card">
            <div class="detail-map-node-top">
              <div class="detail-map-node-id"><span class="detail-map-chev">›</span>${n.id}</div>
              <div class="detail-map-node-badge">${n.status}</div>
            </div>
            <div class="detail-map-node-name">${n.name}</div>
            <div class="detail-map-node-levels">当前 ${n.cur} → 目标 ${n.tgt}</div>
          </div>
          <div class="detail-map-points">${n.points.map(p => `<div class="detail-map-point">${p}</div>`).join("")}</div>`;

        wrap.querySelector(".detail-map-node-card").onclick = () => {
          wrap.classList.toggle("is-open");
          openDrawer(code, d.name, n);
        };
        nodesEl.appendChild(wrap);
      });
      domainsEl.appendChild(domain);
    });
  }

  function applySearch() {
    const q = searchEl.value.trim().toLowerCase();
    root.querySelectorAll(".detail-map-domain").forEach(domain => {
      let visible = 0;
      domain.querySelectorAll(".detail-map-node").forEach(node => {
        const ok = !q || node.dataset.search.includes(q);
        node.classList.toggle("is-hidden", !ok);
        if (ok) { visible++; if (q) node.classList.add("is-open"); }
      });
      domain.classList.toggle("is-hidden-domain", visible === 0);
      if (q && visible) domain.classList.remove("is-collapsed");
    });
  }

  function openDrawer(code, domainName, n) {
    drawerTitle.textContent = `${n.id} · ${n.name}`;
    drawerSub.textContent = `${code} · ${domainName}`;
    drawerCurrent.textContent = n.cur;
    drawerTarget.textContent = n.tgt;
    drawerStatus.textContent = n.status;
    drawerPre.textContent = n.pre;
    drawerPoints.innerHTML = "";
    n.points.forEach(p => { const li = document.createElement("li"); li.textContent = p; drawerPoints.appendChild(li); });
    drawer.classList.add("is-open");
  }

  build();
  searchEl.addEventListener("input", applySearch);
  drawerClose.onclick = () => drawer.classList.remove("is-open");
}
