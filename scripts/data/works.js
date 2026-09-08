export const WORKS = Object.freeze([
  {
    id:'video',
    name:'Video Production Harness',
    sub:'AI Video · Production System',
    type:'video',
    idx:'01',
    pos:[.26,.33],
    card:[.29,.30,.34,.22],

    // ===== REAL CONTENT =====
    tagline:'一套把原始内容稳定转化为可交付视频的 AI 视频生产系统。',
    description:'Video Production Harness 将内容分析、视频叙事、Scene 脚本、视觉原型、AI 配音、字幕时间线、Remotion 动画和远程渲染连接成一条可暂停、可检查、可恢复的工作流。项目已管理 55 个视频项目，并通过多条真实 AI 教程视频完成端到端验证。',
    role:['独立创作者','产品设计与开发','AI 视频导演'],
    status:'持续开发中 · MVP 已完成 · E2E 已验证',
    year:'2026—至今',
    tags:['AI Video','Remotion','React','TypeScript','AI Agent','TTS','Creative Coding','Human-in-the-loop'],
    url:'https://github.com/huaqianshu-lm/video',
    media:{
      poster:'',
      video:'',
      cover:''
    },

    detail:{
      kicker:'AI VIDEO PRODUCTION SYSTEM',
      phase:'VIDEO HARNESS / PRODUCTION PIPELINE',
      action:'VIEW GITHUB ↗'
    }
  },

  {
    id:'music',
    name:'Unframed',
    sub:'Original Music · Chinese Indie Rock',
    type:'music',
    idx:'02',
    pos:[.43,.23],
    card:[.73,.30,.25,.22],

    // ===== REAL CONTENT =====
    tagline:'一首写给毕业十年大学老友的摇滚歌曲，关于不被定义的人生与未曾走散的情谊。',
    description:'今年正好大学毕业十年，一直想做点什么来纪念这个时刻。这首歌从有念头到落地，前前后后打磨了很久，终于把它做出来了。它是一首中文独立摇滚，融合了后摇的叙事感和一段说唱段落，情感从克制的怀念层层递进到决绝的释放。送给我的大学老友们，也送给每一个不曾被框住的人。',
    role:['词作者','创作者'],
    status:'已完成',
    year:'2026',
    tags:['原创音乐','摇滚','毕业十年','AI辅助创作','Unframed','中文独立摇滚'],
    url:'',
    media:{
      audio:'./assets/Unframed.mp3',
      cover:''
    },

    detail:{
      kicker:'ORIGINAL MUSIC / CHINESE INDIE ROCK',
      phase:'UNFRAMED / MUSIC',
      action:'AUDIO / 04:56'
    }
  },

  {
    id:'knowledge',
    name:'Memora',
    sub:'Personal Knowledge OS',
    type:'memora',
    idx:'03',
    pos:[.72,.27],
    card:[.29,.54,.25,.20],

    // ===== REAL CONTENT =====
    tagline:'一个由 AI 参与维护的本地优先个人知识库，把零散资料持续编译成可复用的判断、主题和输出。',
    description:'Memora 不只是保存资料，而是建立一套「输入 → 判断 → 主题 → 输出」的个人知识系统。外部文章、课程、PDF、视频字幕、截图和个人想法，经过 AI 加工后进入 raw → notes → wiki → briefs 流程，最终形成结构化笔记、主题判断、文章大纲、周报和其他可复用内容。项目坚持 Markdown 优先、本地存储、低维护成本，并逐步引入 Project Events、自动化编排、增量处理、失败恢复和人工确认机制。',
    role:['发起人','产品设计者','知识架构设计者','AI 工作流构建者'],
    status:'Active · 持续建设中',
    year:'2026—至今',
    tags:['AI','个人知识库','知识管理','AI Workflow','Agentic Coding','Markdown','Obsidian','本地优先'],
    url:'',
    media:{
      cover:''
    },

    detail:{
      kicker:'PERSONAL KNOWLEDGE OS',
      phase:'MEMORA / KNOWLEDGE SYSTEM',
      action:'INTERNAL OVERVIEW'
    }
  },

  {
    id:'ai-news',
    name:'AI Radar',
    sub:'Daily Intelligence',
    type:'news',
    idx:'04',
    pos:[.80,.44],
    card:[.73,.54,.25,.20],

    tagline:'一个将公开 AI 信息源自动收集、去重、整理并转化为中文情报的个人 AI 雷达系统。',
    description:'AI Radar 不只是一个新闻聚合页面，而是一套面向个人使用的 AI 情报处理系统。系统从预先配置的 RSS、公开网页，以及部分明确配置的 X API 和 Product Hunt 来源中收集信息；每天运行时先保存原始资料，再提取结构化条目，并通过 URL、标题和时间窗口进行去重与筛选。有效条目最终被整理成前端可直接读取的稳定 JSON 数据，Gemini 负责生成中文标题和摘要，可选生成每日简报。AI 不负责自动打分，知识库入库保持关闭，网站只展示处理后的结果。',
    role:['产品设计','数据处理流程设计','自动化脚本开发','前端开发'],
    status:'进行中 · 按日运行',
    year:'2026—至今',
    tags:['AI','信息聚合','数据处理','自动化','内容筛选','个人工具','静态网站'],
    url:'https://news-huaqianshu.pages.dev/',
    media:{
      cover:''
    },

    detail:{
      kicker:'AI RADAR / SIGNAL PROCESSING',
      phase:'AI RADAR / DAILY PIPELINE',
      action:'OPEN RADAR ↗'
    }
  },

  {
    id:'notion',
    name:'Life OS',
    sub:'Notion · Personal Management System',
    type:'lifeos',
    idx:'05',
    pos:[.29,.59],
    card:[.29,.77,.34,.18],

    // ===== REAL CONTENT =====
    tagline:'一套把目标、项目、任务与复盘连接起来的个人管理系统，让长期目标真正落到每周和每天的行动中。',
    description:'一套围绕「目标 → 项目 → 任务 → 周复盘 → 月复盘 → 年复盘」搭建的个人管理系统。重点不是增加记录，而是让长期目标、当前项目和下一步行动保持连接，并通过周期复盘持续调整。系统经过长期实际使用和多轮迭代，逐步删减低价值、维护成本高的设计，保留真正有助于推进和决策的核心结构。',
    role:['Product Designer','System Designer','Creator'],
    status:'Ongoing',
    year:'2026',
    tags:['Notion','Life OS','Productivity','System Design','AI'],
    url:'',
    media:{
      cover:''
    },

    detail:{
      kicker:'LIFE OS / PERSONAL MANAGEMENT SYSTEM',
      phase:'LIFE OS / EXECUTION SYSTEM',
      action:'TEMPLATE / GUIDE · 待补充'
    }
  },

  {
    id:'echoline',
    name:'Echoline',
    sub:'English Learning · Local-first',
    type:'echo',
    idx:'06',
    pos:[.66,.64],
    card:[.70,.77,.34,.18],

    // ===== REAL CONTENT =====
    tagline:'面向本地影视材料的字幕驱动英语精听工具。',
    description:'Echoline 是一个本地优先的英语精听 Web 应用。用户可以加载本地视频和 SRT、ASS 字幕，按照字幕逐句播放影视对白，并自动跳过无对白的空白片段。项目围绕「听 → 循环 → 听写 → 检查 → 复习」设计，将单句循环、倍速、字幕校准、听写差异比较、难句标记与间隔复习整合进同一套本地学习流程；学习记录保存在浏览器本地，不依赖账号、云同步或 AI 服务。',
    role:['独立产品设计','前端开发'],
    status:'V1 核心流程已实现 · 手动验收中',
    year:'2026',
    tags:['React','TypeScript','Vite','HTML5 Video','SRT','ASS','English Learning','Dictation','Local-first','Spaced Review'],
    url:'',
    media:{
      cover:'',
      demo:''
    },

    detail:{
      kicker:'LOCAL-FIRST / ENGLISH LISTENING',
      phase:'ECHOLINE / LISTENING TOOL',
      action:'DEMO / 待部署'
    }
  }
]);

export function getWorkById(id){
  return WORKS.find(item=>item.id===id) || null;
}
