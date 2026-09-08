# 花千树个人站

此项目是「花千树」个人作品站，核心表达为「一念生发，千树成花」；它以固定 100vh 舞台中的长滚动时间线，展示 AI、知识、视频、音乐与产品实践。

## 文档优先级

1. 用户当前指令。
2. 本文件 `CLAUDE.md`。
3. `PROJECT_HANDOFF.md`（设计细节、历史交接和作品完整说明）。
4. `index.html`（当前运行行为与实现事实）。

发现文档与实现冲突时，先说明差异；未获明确指示不得用旧文档回退已经稳定的行为。

## 项目定位

- 不是普通作品集、落地页、幻灯片或多路由案例站。
- 叙事路径固定为：`Seed → Grow → Works → Method → Exploring → Ending`。
- 视觉是东方思考与当代数字感的结合：安静、克制、现代，以留白、细线、节点和柔光构成画面。
- 禁止霓虹化、重装饰、库存式中式纹样、高噪声动效和夸张 3D。

## 项目目录

```text
profile/
├── assets/                     媒体资源
│   ├── 01-what-is-codex.mp4    Video Production Harness 原始视频
│   ├── Unframed.lrc            Unframed 歌词文件
│   └── Unframed.mp3            Unframed 原始音频
├── CLAUDE.md                   本执行规范
├── PROJECT_HANDOFF.md          完整设计与交接依据
├── ROADMAP.md                  当前项目进度
├── STATIC_NATIVE_REFACTOR_PLAN.md 静态原生模块化与动画收敛基线方案
├── STATIC_NATIVE_REFACTOR_REMEDIATION_PLAN.md 静态重构验收整改方案
├── scripts/                    原生 ES Modules 源码
│   ├── app.js                  单页启动入口与当前运行编排
│   ├── core/dom.js             集中 DOM 注册表
│   ├── core/state.js            集中运行状态
│   ├── core/theme.js            主题状态与 UI 同步
│   ├── core/scheduler.js        dirty-flag 单 RAF 调度器
│   ├── data/                   作品与歌词数据
│   ├── timeline/                时间线数学、几何、画布与阶段渲染
│   │   ├── math.js              时间线纯数学与阶段常量
│   │   ├── geometry.js          几何缓存与明确测量入口
│   │   ├── canvas.js            Canvas 表面、树模型与 Bézier 绘制
│   │   ├── frame.js             单帧依赖编排
│   │   ├── renderer.js          五个阶段渲染入口编排
│   │   └── stages/              Seed／Grow、Works、Method、Exploring、Ending 阶段渲染入口
│   ├── works/                   卡片交互与详情 FLIP
│   ├── previews/                六类详情预览模块
│   │   ├── index.js             type 分派
│   │   ├── video.js             Video 详情预览
│   │   ├── music.js             Unframed 详情预览
│   │   ├── memora.js            Memora 详情预览
│   │   ├── radar.js             AI Radar 详情预览
│   │   ├── lifeos.js            Life OS 详情预览
│   │   └── echoline.js          echoline 详情预览
│   └── media/music-player.js    Unframed 播放与歌词控制
├── styles/                     原生 CSS 直接加载模块（保持既有覆盖顺序）
│   ├── base.css                 原始主样式块
│   ├── stage.css                舞台样式边界
│   ├── works.css                作品样式边界
│   ├── modules.css              模块样式边界
│   ├── detail-shell.css         详情壳层样式边界
│   ├── detail-previews.css      详情预览样式边界
│   └── responsive.css            原始末段覆盖样式块
└── index.html                  单页站点 HTML 与唯一 module 入口
```

- 保持静态单页形态：原生 JavaScript、Canvas 和浏览器 Media API。
- 不引入 React、Vue、构建工具、包管理器、后端、数据库或 SPA 路由。
- 默认只修改 `index.html`；禁止为试验创建 `v2`、副本页或平行实现。
- 视频必须通过原始 MP4 文件引用，不得 Base64 内嵌。二维码可用 Base64，favicon 可用 data URI。

## 页面结构与导航

- 主舞台保持 `sticky`、`top: 0`、`height: 100vh`；不得改为普通纵向分区、slides 或多页面。
- 时间线范围固定：0–9 Seed、9–22 Grow、22–45 Works、45–67 Method、67–87 Exploring、87–100 Ending。
- 保留桌面导航和独立的紧凑移动端时间线导航。
- Ending 的六个节点必须收束到唯一终点，并与 Seed 的涟漪形成呼应。

## 作品内容

作品顺序固定，不得擅自调整：

1. **Video Production Harness**：可复核的 AI 视频生产链路；使用真实原生 `<video controls>`，不得回退为抽象流程、假控件、封面占位或三场景卡片。
2. **Unframed**：真实 4:56 音频、内嵌歌词时间线、定制原生播放控制与克制的彩色频谱；顺序为 Lyrics → spectrum → play/progress/time。
3. **Memora**：本地优先、AI 维护的知识库；概览必须保留知识图谱节点、连线和网络运动，不能降级为笔记列表或与 Life OS 混同。
4. **AI Radar**：公开来源采集、去重与中文情报加工；保留「NO AUTO SCORE」和「MEMORA WRITE OFF」，详情展示 Signal Processing Pipeline，不做新闻卡片流。
5. **Life OS**：展示目标—项目—任务—复盘的执行闭环；仅用通用示例，不得暴露私人目标、真实 Notion 内容、账号或统计数据。
6. **echoline**：本地优先的字幕英语听力工具；使用真实产品界面表达，无账号、云端或 AI，不恢复旧的波纹式表现。

## 关键交互

### 作品详情

- 详情从实际卡片位置以 FLIP 同屏展开；关闭按钮、遮罩点击和 ESC 都要回到原卡片。
- 不得改为新页面、路由或居中模态框。
- 卡片悬停只允许轻微上浮、缩放、柔光与 `VIEW` 提示。

### 主题与画布

- 主题唯一状态由 `html[data-theme]` 和 CSS 变量驱动，持久化键为 `huaqianshu-theme`。
- 切换时同步更新 Canvas、按钮状态、`aria` 和 `meta theme-color`；禁止维护第二套主题状态。
- Canvas 的 Seed／Grow 和网络效果必须同时适配深色与浅色主题。

### 响应式与可访问性

- 关键断点为 860px 与 759px。移动端详情使用明确的局部覆盖，不能以全局等比缩小代替。
- 检查安全区、HUD、滚动和溢出。
- 保留键盘 ESC、可见焦点、语义按钮、原生视频 controls 和音频播放能力。

## 修改工作流

```text
阅读目标模块 → 确认桌面／移动与深色／浅色影响 → 最小修改
→ 静态检查 → 条件允许时界面检查 → 汇报改动与验证范围
```

1. 先阅读本文件、`PROJECT_HANDOFF.md`、`index.html`，以及目标模块相关的 HTML、CSS、JavaScript 和覆盖规则。
2. 不对稳定模块做顺手重构，不恢复已淘汰的旧实现。
3. 增加或替换作品、改动时间线范围、调整作品顺序、重构页面形态，必须先获得用户明确指示。
4. 至少检查 HTML、选择器、事件、资源路径和主题状态；具备浏览器条件时，覆盖桌面、移动、深色与浅色状态。
5. 交付只说明改动文件、行为结果和验证范围；未验证项必须明确标注。

## 关键约束

- Google Fonts 使用 Noto Sans SC（500）。
- `PROJECT_HANDOFF.md` 中明确废弃的内容不得恢复，包括：Memora 的笔记列表／静态图谱、AI Radar 的新闻列表、Life OS 的真实 Notion 占位、echoline 的抽象波纹、Video 的假视频界面。
- 未经用户明确要求，不进行架构重写。
- 当前工作重点是视觉一致性、排版间距、响应式溢出、浏览器兼容、性能、可访问性与 SEO／OG 的完善。
