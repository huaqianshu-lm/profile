# 花千树个人站｜Codex 项目说明

> 最后同步基线：2026-09-06 的最新 `index.html`  
> 用途：将个人站项目迁移到 Codex 后，作为仓库级开发说明与修改约束。  
> **最高原则：`index.html` 的实际代码永远是 Source of Truth。本文档用于解释设计意图和保护已稳定行为；如本文档与代码冲突，以最新 `index.html` 为准。**

---

## 1. 项目是什么

项目名称：**花千树**

灵感来自：

> 东风夜放花千树

核心句：

> 一念生发，千树成花。

这是一个关于 **AI、知识、影像、音乐与产品** 的个人作品站。

它不是传统作品集模板，也不是普通的纵向 Section 页面。整站的核心体验是：

**在一个固定的 100vh 舞台中，通过长滚动时间轴，让内容从一个“念头 / Seed”逐渐生长为 Works、Method、Exploring，最后重新汇聚到 Ending Point。**

整体视觉方向：

- 东方思想 + 当代数字视觉
- 克制、安静、现代
- 深色夜景与纯白浅色两套主题
- 大量留白
- 细线、点、节点网络、轻微光晕
- 前半段偏诗意，后半段逐渐进入数字系统感
- 不使用传统中式纹样堆叠
- 各 Works 可以有独立的系统语言，但必须仍属于同一个视觉世界

---

## 2. 当前仓库应该包含什么

最小运行目录：

```text
/
├── AGENTS.md
├── index.html
├── Unframed.mp3
└── 01-what-is-codex.mp4
```

### 必需文件

#### `index.html`

当前唯一主文件。

目前页面的 HTML、CSS、JavaScript 基本都集中在这个文件中，没有 React/Vue 等应用框架，也没有构建步骤。

不要为了“代码更整洁”而主动拆分成多个 CSS / JS / component 文件，除非用户明确要求做工程化重构。

#### `Unframed.mp3`

Unframed 项目的真实音频：

```text
./Unframed.mp3
```

歌词时间轴已直接写入 `index.html`，不依赖外部 `.lrc`。

#### `01-what-is-codex.mp4`

Video Production Harness 中的真实最终视频：

```text
./01-what-is-codex.mp4
```

必须继续使用外部 MP4，不要改成 Base64 内嵌。

### 当前内嵌资源

- favicon 使用 data URI
- 微信公众号二维码目前直接以 Base64 图片写入 `index.html`

### 外部依赖

当前页面会从 Google Fonts 加载：

```text
Noto Sans SC / weight 500
```

因此页面并非 100% 离线无依赖；但除字体和项目外链外，没有前端框架 CDN。

---

## 3. 当前技术架构

### 3.1 单文件静态站

当前项目本质上是：

```text
HTML + CSS + Vanilla JavaScript + Canvas + 原生 Media API
```

没有：

- package.json
- npm build
- bundler
- SPA router
- 后端
- 数据库

不要假设这是 React 项目。

### 3.2 固定舞台 + 长滚动轨道

核心 DOM 结构是一个很高的 `.hero`，内部使用：

```css
position: sticky;
top: 0;
height: 100vh;
```

用户虽然在滚动页面，但视觉上始终像是在同一个全屏舞台中观看状态转换。

不要把它改成：

- 多个纵向 Section
- 普通 landing page
- 一屏接一屏的静态块
- 独立路由页面

### 3.3 Canvas 生长系统

首页 Seed / Grow 阶段与部分节点连接使用 Canvas 绘制。

Canvas 已支持：

- Dark palette
- Light palette
- branch / dust / bud / spark / network 等视觉元素

主题切换时 Canvas 也会跟随变化。

修改主题时不要只改 CSS 而忽略 Canvas palette。

---

## 4. 页面主时间轴

逻辑流程：

```text
Seed / 一念
→ Grow / 生发
→ Works
→ Method
→ Exploring
→ Ending / Again
```

大致语义区间：

```text
0–9%     Seed
9–22%    Grow
22–45%   Works
45–67%   Method
67–87%   Exploring
87–100%  Ending
```

这些百分比是设计语义，不应因为局部样式调整而随意重写整个 timeline。

### 不允许的结构级改动

除非用户明确要求，否则不要：

1. 重写整个滚动进度系统
2. 把固定 100vh 舞台改成传统 Section 页面
3. 为某一个 Works 的样式问题重写 Seed → Ending 的总动画
4. 更改各阶段之间的根本叙事关系

---

## 5. Works 总体结构

当前共有 6 个真实项目，顺序固定：

```text
01 Video Production Harness
02 Unframed
03 Memora
04 AI Radar
05 Life OS
06 echoline
```

Works 当前已经不是占位内容，卡片 Preview 和详情 Preview 都经过多轮设计。

### Works 总览卡片

六张卡片各自保留不同的抽象 Preview：

| 项目 | 总览卡视觉 |
| --- | --- |
| Video Production Harness | Video / Projection / Lens 感 |
| Unframed | 抽象音频 Waveform |
| Memora | 动态 Knowledge Graph |
| AI Radar | Daily Intelligence / Radar 信号动效 |
| Life OS | Goal → Project → Next Action → Review 的关系表达 |
| echoline | Ripple / Echo 抽象视觉 |

### 非常重要：Memora 卡片动画

Memora 总览卡上的 Knowledge Graph 节点网络动画已经修复。

必须继续保留：

- Node
- Link
- Network movement

不要因为项目类型、数据字段或视觉重构再次让这条动画消失。

---

## 6. Works 详情交互：不要改成 Modal

详情机制已经稳定。

正确体验：

```text
卡片
→ 从当前真实卡片位置展开
→ 同屏详情
→ Back / ESC / 点击背景关闭
→ 缩回原卡片
```

它不是：

- 普通 Modal
- 新页面
- 独立路由
- 长 Case Study

### FLIP / 展开起点逻辑必须保护

每张卡片 Hover / Focus 时会重新读取当前真实位置：

```js
getBoundingClientRect()
```

点击时也会再次读取真实位置。

这是为了防止共享详情卡片从“上一次打开的项目位置”错误展开。

相关行为包括：

- `pointerenter` 更新 Hover 状态
- 下一帧刷新 detail origin
- `focus` 也刷新 origin
- Click / Enter / Space 可打开
- ESC 可关闭
- Dim background 可关闭

**不要删掉或简化这套 origin refresh 逻辑。**

### Hover 语言

Works 卡片 Hover 应保持：

- 轻微上浮
- 轻微放大
- 边框 / 微光增强
- Preview 微放大
- `VIEW` 提示出现

不要做夸张的 3D 翻转、强发光或大幅位移。

---

# 7. 六个项目的真实内容与锁定规则

## 7.1 Video Production Harness

副标题：

```text
AI Video · Production System
```

一句话：

> 一套把原始内容稳定转化为可交付视频的 AI 视频生产系统。

核心不是播放器，而是：

> **Production Harness / Human Gate / Recoverable Pipeline**

它将：

```text
内容分析
→ 视频叙事
→ Scene 脚本
→ 视觉原型
→ AI 配音
→ 字幕时间线
→ Remotion 动画
→ 远程渲染
```

连接成一条 **可暂停、可检查、可恢复** 的生产工作流。

当前真实规模：

- 55 个 Video Projects
- 15 个 Production Stages
- 多条 AI 教程视频已完成 E2E 验证

当前案例：

```text
01 — What is Codex?
```

主生产轨道：

```text
Source
→ Analysis
→ Narrative
→ Scenes
→ Prototype
→ TTS
→ Timeline
→ Remotion
→ Review
→ Render
```

### Current Run 必须保持

第一行：

```text
CURRENT RUN · CODEX TUTORIAL
                          PIPELINE STATUS / E2E VERIFIED
```

第二行 6 个状态框横向铺满 Current Run 面板：

```text
CONTENT        PASS
NARRATIVE      PASS
VISUAL GATE    APPROVED
TTS            SYNCED
REMOTION       READY
SMOKE RENDER   PASS
```

不要改回 3+3，也不要把状态框挤到右侧小区域。

### 下半部分

左侧保留：

- Human Gate
- Dependency Check
- GitHub Actions · Remote Smoke Render

核心表达：

> 上游变化，不静默复用旧产物。

Human Gate：

```text
APPROVE / RETRY
```

右侧：

```text
FINAL OUTPUT / 16:9
```

真实视频：

```text
./01-what-is-codex.mp4
```

播放器规则：

- 原生 `<video controls>`
- 16:9
- 保留播放 / 暂停 / 进度 / 音量 / 全屏
- 不增加假的第二套播放控制
- 不添加 poster
- 不恢复 `SCENE 01 / 06 / 09` 三张大卡片

播放器下方只保留轻量信息：

```text
10 SCENES · 04:58 · REMOTION · 16:9
```

GitHub：

```text
https://github.com/huaqianshu-lm/video
```

---

## 7.2 Unframed

副标题：

```text
Original Music · Chinese Indie Rock
```

一句话：

> 一首写给毕业十年大学老友的摇滚歌曲，关于不被定义的人生与未曾走散的情谊。

真实音频：

```text
./Unframed.mp3
```

时长约：

```text
04:56
```

歌词时间轴直接嵌入 `index.html`。

当前播放器已经支持：

- PLAY / PAUSE
- 当前时间 / 总时长
- 点击 Progress 跳转
- 点击 Spectrum 跳转
- Spectrum 播放进度
- 同步歌词：上一句 / 当前句 / 下一句
- 点击歌词跳转对应时间
- 关闭详情自动暂停

### Spectrum 已定版

视觉：

```text
蓝 → 紫 → 粉 → 橙 → 黄 → 绿
```

特点：

- 每根柱子独立跳动
- 峰谷差明显
- 从底部向上
- 彩色轻 Glow
- 整体高度保持克制

### 垂直顺序锁定

必须保持：

```text
歌词
↓
Spectrum
↓
PLAY + Progress + Time
```

不要让播放控制跑到 Spectrum 上方。

除非用户明确点名，否则不要重构 Unframed 的播放系统、歌词系统或 Spectrum。

---

## 7.3 Memora

副标题：

```text
Personal Knowledge OS
```

一句话：

> 一个由 AI 参与维护的本地优先个人知识库，把零散资料持续编译成可复用的判断、主题和输出。

核心链路：

```text
输入
→ 判断
→ 主题
→ 输出
```

数据处理：

```text
raw → notes → wiki → briefs
```

当前规模：

```text
159 原始素材
167 结构化笔记
12 Wiki 主题页
47 输出型 Brief
```

4 个核心领域：

- AI 协作与工程
- AI 原理与基础设施
- 学习与个人成长
- 知识／产品与输出

详情 Preview 是 Knowledge OS Dashboard，包含：

- Personal Knowledge OS / Memora
- 当前 Focus
- 搜索
- 159 / 167 / 12 / 47
- Output Workbench
- Weekly Insights
- Output Rhythm
- Reading Queue
- 4 个知识领域
- 底部处理流程

底部流程：

```text
语义分析
→ 跨项目聚合
→ 知识激活
→ 语义候选
→ 人工确认
```

不要把它改成普通笔记列表，也不要与 Life OS 的视觉表达混为一谈。

---

## 7.4 AI Radar

副标题：

```text
Daily Intelligence
```

一句话：

> 一个将公开 AI 信息源自动收集、去重、整理并转化为中文情报的个人 AI 雷达系统。

输入来源：

- RSS
- 公开网页
- 部分明确配置的 X API
- Product Hunt

处理流程：

```text
公开信息源
↓
每日抓取
↓
结构化
↓
URL / 标题 / 时间窗口去重
↓
Gemini 中文翻译与摘要
↓
Stable JSON
↓
Website / Daily Brief
```

AI 当前负责：

- 中文翻译
- 摘要整理
- 可选每日简报

AI 当前不负责自动打分。

Preview 中必须保留系统边界：

```text
NO AUTO SCORE
MEMORA WRITE OFF
```

详情主视觉是：

> **Signal Processing Pipeline**

不是新闻卡片墙。

核心路径：

```text
Sources
→ Capture
→ Structure
→ Deduplicate
→ AI Process
→ Stable JSON
→ Today's Radar / Daily Brief
```

项目链接：

```text
https://news-huaqianshu.pages.dev/
```

---

## 7.5 Life OS

副标题：

```text
Notion · Personal Management System
```

一句话：

> 一套把目标、项目、任务与复盘连接起来的个人管理系统，让长期目标真正落到每周和每天的行动中。

核心系统：

```text
目标
→ 项目
→ 任务
→ 周复盘
→ 月复盘
→ 年复盘
```

详情 Preview 的核心不是 Dashboard，而是：

> **一个案例在个人执行系统中完整跑一圈。**

主闭环：

```text
Goal
→ Project
→ Decision
→ Next Action
→ Today / This Week
→ Weekly Review
→ Adjust
↺
```

Decision：

> 现在能立刻开始行动吗？

```text
YES → 建任务 → 进入执行
NO  → 保持为项目 → 先找到下一步行动
```

核心原则：

> 项目只维护下一步。完成一步，再定下一步；复盘负责校准下一轮。

### Preview 使用通用案例

Goal：

```text
建立稳定的个人创作体系
```

Project：

```text
完成一组城市观察短文
```

Next Action：

```text
列出第一篇文章的三级提纲
```

示例任务：

- 整理阅读摘录
- 写提纲
- 周复盘

Review：

```text
84% 任务完成
71% 习惯达成
10.8h 专注时长
```

### 隐私保护规则

不要重新放入用户真实的：

- AI 影响力目标
- 公众号项目
- Notion 系统上线任务
- 真实周报数据
- 其他私人目标或生活数据

继续使用通用示例。

---

## 7.6 echoline

副标题：

```text
English Learning · Local-first
```

一句话：

> 面向本地影视材料的字幕驱动英语精听工具。

核心流程：

```text
听
→ 循环
→ 听写
→ 检查
→ 复习
```

功能表达：

- 本地视频
- SRT / ASS 字幕
- 字幕逐句播放
- 自动跳过无对白空白
- 单句循环
- 倍速
- 字幕显示 / 隐藏
- 字幕时间校准
- 键盘快捷键
- 听写差异比较
- 难句标记
- 间隔复习
- 本地学习记录

不依赖：

- 账号
- 云同步
- AI 服务

详情 Preview 已经是依据真实产品 UI 重绘的界面，不再是旧的 Ripple 抽象详情页。

包含：

顶部：

- LOCAL LISTENING STUDIO
- echoline
- 加载视频
- 加载字幕
- 主题
- 快捷键设置
- 间隔复习

播放器：

- 当前视频
- Progress
- Previous / Play / Next
- Loop
- Hide Subtitle
- Expand
- Speed
- Subtitle Offset

下方：

左侧：

- 当前字幕
- 听写

右侧：

- 字幕列表
- 本集难句

不要把详情重新改回纯 Ripple 动画。

---

## 8. Method

六个 Works 被提炼为：

```text
VIDEO      → Express
MUSIC      → Translate
KNOWLEDGE  → Structure
AI RADAR   → Filter
LIFE OS    → Organize
ECHOLINE   → Prototype
```

再聚合为三个方法节点：

### Think / UNDERSTAND

> 过滤噪音，建立结构，理解真正的问题。

来源：

```text
Structure
Filter
```

### Build / MAKE

> 快速验证，再把想法变成可以使用的东西。

来源：

```text
Express
Prototype
```

### Connect / LINK

> 连接知识、媒介、工具和不同的表达。

来源：

```text
Translate
Organize
```

不要恢复旧的 `AI News`、`Notion` 占位命名。

---

## 9. Exploring

Method 继续生长为六个探索方向：

- Knowledge Systems
- New Interfaces
- Generative Media
- Digital Identity
- AI × Creativity
- Human × AI

状态语言：

```text
Active
Exploring
Seed
```

这部分目前属于已稳定结构，后续以视觉精修为主。

---

## 10. Ending

六个 Exploring 节点最终必须 **直接汇聚到唯一 Ending Point**。

不能：

- 出现两个最终点
- 先出现中间终点，再出现第二个真正终点

最终文字：

```text
一念生发，
千树成花。

花 千 树
```

Tags：

```text
AI / Knowledge / Video / Music / Product
```

最终点保留与开场 Seed 呼应的 Ripple 动画。

---

# 11. 当前 Dark / Light Theme 系统

旧交接文档中“Theme Toggle 尚未完成”的描述已经过时。

**最新 `index.html` 已经完成整站 Dark / Light 主题切换。**

根节点：

```html
<html lang="zh-CN" data-theme="dark">
```

主题状态通过：

```text
data-theme="dark"
data-theme="light"
```

控制。

当前包含：

- Header / Navigation
- Hero
- Canvas
- Works 总览
- Works 详情 shell
- Video Production Harness
- Unframed
- Memora
- AI Radar
- Life OS
- echoline
- Method
- Exploring
- Ending

的 Light / Dark 对应视觉。

### Theme Toggle

页面已有主题按钮。

逻辑：

- 切换根节点 `data-theme`
- 更新按钮文案 `LIGHT / DARK`
- 更新 aria 属性
- 更新 `theme-color`
- 通过 `localStorage` 持久化

存储 key：

```text
huaqianshu-theme
```

不要创建第二套独立主题状态。

### Light Mode 设计方向

当前 Light Mode 不是简单“把黑色换成白色”，而是：

- 页面主舞台偏纯白
- 模块为白 / 轻灰层级
- 文字使用 graphite / neutral gray
- 各项目保留自己的 accent identity
- Canvas 节点、线条、Glow 有单独的 Light palette

后续主题修改应继续基于现有 CSS variables 和 `data-theme` hooks 增量调整。

---

# 12. 导航

桌面端有主导航；移动端已经有单独的 compact timeline menu。

移动端菜单用于恢复：

```text
ABOUT
WORKS
EXPLORING
```

等时间轴跳转能力，同时不挤占 100vh 舞台。

不要因为桌面导航存在，就删除移动端 `mobile-nav-toggle` / `mobile-nav-panel`。

修改滚动导航时应跳转到时间轴目标，而不是新建锚点 Section 体系。

---

# 13. Ending 联系方式

当前 Ending 联系方式：

### Email

```text
huaqianshu.lm@gmail.com
```

交互：

- 移动 / touch：保留原生 `mailto:`
- Desktop 精确指针设备：优先打开 Gmail Web Compose
- 如果弹窗失败，fallback 到 `mailto:`
- Hover 时显示邮箱地址 popover

不要把 Desktop 点击逻辑改回“点击后看起来没反应”的单一 mailto 行为。

### GitHub

```text
https://github.com/huaqianshu-lm
```

### X

```text
https://x.com/huaqianshu_lm
```

### 小红书

```text
https://www.xiaohongshu.com/user/profile/632711d10000000023039ab8
```

### 微信公众号

名称：

```text
花千树 AI
```

当前交互：

- 不需要点击跳转
- Hover / Focus 显示二维码 popover
- QR 图当前 Base64 内嵌在 `index.html`

---

# 14. 响应式策略

主要断点：

```text
860px
759px
```

当前不是简单的“桌面整体缩小”。

尤其 6 个 Works 的移动端详情已经存在大量独立布局规则。

### 修改移动端时必须注意

1. 不要用一个全局缩放覆盖六个详情页
2. 先找对应项目的 mobile detail CSS
3. 只改目标项目
4. 不要因为某个项目手机端过高，就破坏其他 5 个项目
5. 注意 safe-area 和底部 HUD
6. 保持详情正文可滚动

### Mobile HUD

移动端 Seed / Grow 与 Ending 已有专门的 phase / scroll / progress 布局。

不要随意修改固定底部 HUD 的层级关系。

---

# 15. 视觉设计原则

## 15.1 克制优先

不要增加：

- 大面积霓虹
- 高饱和渐变背景
- 强玻璃拟态
- 强 3D
- 巨大阴影
- 复杂传统中式装饰

## 15.2 视觉关键词

应该保持：

```text
quiet
precise
subtle
night / white space
thin lines
points
networks
soft glow
digital eastern
```

## 15.3 动效

动效应该让系统“活着”，而不是抢注意力。

优先：

- 轻微位移
- 缓慢呼吸
- 点 / 线传递
- 细小 scale
- opacity transition
- ripple
- stagger

避免：

- bounce
- overshoot 很大的弹簧动画
- 快速闪烁
- 花哨 page transition

---

# 16. Codex 修改代码时必须遵守的工作规则

## 规则 1：先读代码，再改

每次任务先定位目标区域在 `index.html` 中的：

- DOM
- CSS
- JavaScript
- Desktop override
- Mobile override
- Light / Dark override

不要只搜到第一个 class 就直接修改，因为当前单文件经过多轮迭代，同一个模块可能存在后置 override。

**CSS 后出现的规则往往才是当前最终生效规则。**

## 规则 2：做最小增量修改

如果用户说：

> “把这一行字往左移一点”

就只改这一行相关规则。

不要顺便：

- 统一整个模块
- 重命名大量 class
- 调整别的卡片
- 重排 CSS
- 删除“看起来重复”的旧规则

很多旧规则后面已有 override，盲目清理可能造成回归。

## 规则 3：稳定模块默认冻结

以下内容除非用户明确要求，否则不要主动重做：

- 固定 100vh 舞台
- 总滚动时间轴
- Works 原位展开 / 收回机制
- 6 个详情 Preview 的基本结构
- Unframed 播放器 / 歌词 / Spectrum
- Memora 总览 Knowledge Graph 动画
- Video 原生 Final Output 播放器
- Ending 唯一终点
- Theme state architecture

## 规则 4：不要恢复过时版本

禁止恢复：

- Knowledge 旧 `graph` 项目
- AI News 占位项目
- Notion 占位项目
- echoline 旧纯 Ripple 详情页
- Video 旧抽象详情
- Video poster
- Video 3 张 Scene 大卡片
- Life OS 用户真实私人案例
- 旧的 Works 展开位置逻辑

## 规则 5：不要创建多版本 HTML

默认只维护：

```text
index.html
```

不要生成：

```text
index-v2.html
index-new.html
index-final.html
index-final-final.html
```

如果需要临时测试，应在工作树中完成，最终仍合并回 `index.html`。

---

# 17. 修改后的自检清单

每次提交修改前至少检查：

## 基础

- [ ] `index.html` 能正常打开
- [ ] Console 没有新增明显 JS error
- [ ] 没有破坏页面滚动
- [ ] 没有意外改变其他 Works

## Desktop

- [ ] 目标区域视觉正确
- [ ] Works Hover 正常
- [ ] Works 点击从当前卡片位置展开
- [ ] Back / ESC 正常收回
- [ ] Email / 外链仍可用

## Mobile

- [ ] 目标区域在手机宽度下正常
- [ ] 没有横向溢出
- [ ] Detail 可以滚动
- [ ] Mobile nav 正常
- [ ] HUD 没有遮挡主要内容

## Theme

- [ ] Dark 正常
- [ ] Light 正常
- [ ] Theme Toggle 正常
- [ ] 刷新后主题状态保持
- [ ] Canvas 与 DOM 主题一致

## Media

如改到 Video / Unframed：

- [ ] `./01-what-is-codex.mp4` 路径未破坏
- [ ] `./Unframed.mp3` 路径未破坏
- [ ] 关闭详情会正确停止需要停止的媒体

---

# 18. 当前项目状态

当前阶段已经不是“从零搭网站”。

现状可以概括为：

> **核心架构稳定；6 个真实 Works 基本定版；Dark / Light 全站主题、移动端导航和多轮响应式细化已经落地。后续应以精修、回归检查、性能和上线收尾为主，而不是重新设计架构。**

旧交接文档中以下“下一步”已经完成或大幅推进：

- 全站 Theme Toggle
- Light Palette
- 导航
- 移动端详情适配
- Ending 联系方式

因此下一阶段更适合优先做：

1. Desktop / Mobile 最终视觉一致性检查
2. 六个 Works 详情的边距、字号和溢出回归测试
3. Safari / Chrome / 手机浏览器兼容检查
4. 音频 / 视频资源部署验证
5. 性能优化（尤其单文件 CSS 体量与 Base64 QR）
6. Accessibility 最终检查
7. SEO / Open Graph 最终检查
8. 部署与真实域名验证

---

# 19. 给 Codex 的默认执行方式

当收到一个新的页面修改任务时，按以下顺序执行：

```text
1. 阅读本 AGENTS.md
2. 读取最新 index.html
3. 搜索目标模块全部相关规则
4. 特别检查文件后部是否存在最终 override
5. 判断是否存在 desktop / mobile / light / dark 四套相关样式
6. 做最小修改
7. 静态检查 HTML / CSS / JS
8. 有浏览器环境时进行 desktop + mobile + dark + light 回归
9. 确认没有修改用户未要求的稳定模块
10. 只提交最终 index.html 的有效变更
```

如果需求与本说明冲突：

- 用户当前明确指令优先
- 最新 `index.html` 的实际实现优先
- 不确定时优先保护现有行为，而不是主动重构

---

# 20. 一句话交接

> **继续开发「花千树」时，把它当成一个已经完成核心设计与交互的成熟单页作品站；任务是精确修改和稳定收尾，不是重新搭一个网站。**
