import { useEffect, useState } from "react";
import { AppicaGallery, type CatalogExtraCard } from "./AppicaCatalog";
import { Badge, Button, CopyButton } from "../vendor/appica-ui-react/src";
import {
  AgentInput,
  CitationMark,
  CodeBlock,
  ComparisonTable,
  DataTable,
  FileDiff,
  ImageGeneration,
  InlineCitations,
  Orbs,
  StreamingText,
  TaskList,
  TextResponse,
  ThinkingReasoning,
  ThinkingState,
  WebSearch,
  type DataColumn,
} from "./lib";

type Language = "en" | "zh";
type Theme = "light" | "dark";
type ModelRow = { model: string; latency: string; context: string };

const LANGUAGE_KEY = "agent-ui-language";
const THEME_KEY = "agent-ui-theme";

function readPreference(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function getInitialLanguage(): Language {
  const saved = readPreference(LANGUAGE_KEY);
  if (saved === "en" || saved === "zh") return saved;
  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function getInitialTheme(): Theme {
  const saved = readPreference(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const messages = {
  en: {
    nav: { components: "Components", appica: "Interface components", docs: "Documentation", github: "View on GitHub", label: "Primary navigation" },
    controls: { language: "Switch to Chinese", languageShort: "中文", dark: "Dark", light: "Light", themeDark: "Switch to dark theme", themeLight: "Switch to light theme" },
    hero: {
      kicker: "Open source · React · TypeScript · Plain CSS",
      title: "Interface building blocks for",
      emphasis: "thinking products.",
      description: "Seventy-eight reusable components for agent experiences and the everyday interface around them.",
      browse: "Browse components", docs: "Read the docs", copyPrompt: "Copy master prompt", promptCopied: "Prompt copied", preview: "Live agent preview", active: "Agent is active",
      reasoning: "I’ll review the request, verify the constraints, and turn the result into a reusable component.",
      taskTitle: "Building interface", task1: "Understand the request", task2: "Refine the interaction", task3: "Return the result",
      placeholder: "Ask the agent to change something…", components: "Components", dependencies: "Collections", license: "License",
    },
    sections: { thinking: "Thinking & Reasoning", tools: "Tool & Action States", text: "Text Outputs", structured: "Structured Outputs", interactive: "Rich & Interactive", count: "components" },
    cards: {
      thinking: "Thinking State", reasoning: "Thinking + Reasoning", orbs: "Activity Orbs", search: "Web Search", diff: "File Diff", image: "Image Generation",
      response: "Text Response", streaming: "Streaming Text", citations: "Inline Citations", code: "Code Block", tasks: "To-do List", data: "Data Table", comparison: "Comparison Table", input: "AI Agent Input",
    },
    content: {
      thinking: "Thinking", thinkingOpen: "Thinking…", thought: (seconds: number) => `Thought for ${seconds}s`,
      reasoning: "Reading the request and the current context, then checking the available evidence before returning a concise recommendation.",
      searchLabel: "Searching the web", searchQuery: "Accessible AI interface patterns", source1: "Human-centered AI", source2: "ARIA live regions", source3: "Streaming interfaces",
      additions: (count: number) => `${count} additions`, imageLabel: "Generating image", imagePrompt: "A quiet reading room at dusk",
      responseTitle: "A clear response structure", responseBody: "Lead with the answer, keep supporting detail readable, and use", responseEnd: "only where it adds precision.",
      stream: "The response arrives progressively, with a calm caret marking the live edge.", citationBody1: "A useful answer makes the conclusion easy to find", citationBody2: "while preserving evidence", sourceTitle1: "Human-centered AI guidance", sourceTitle2: "Accessible Rich Internet Applications",
      launch: "Launch checklist", build: "Build interface", verify: "Verify accessibility", publish: "Publish release", table: "Model routing overview", feature: "Feature", sessions: "Agent sessions", memory: "Shared memory", team: "Team controls",
      placeholder: "Ask the agent…", enhance: "Enhance", enhancing: "Enhancing", attach: "Attach a file", model: "Model", send: "Send", copy: "Copy", copied: "Copied",
    },
    footer: { license: "Agent UI CSS · MIT License", components: "Agent components", appica: "Interface components", github: "GitHub" },
  },
  zh: {
    nav: { components: "全部组件", appica: "界面组件", docs: "使用文档", github: "查看 GitHub", label: "主导航" },
    controls: { language: "切换到英文", languageShort: "EN", dark: "深色", light: "浅色", themeDark: "切换到深色主题", themeLight: "切换到浅色主题" },
    hero: {
      kicker: "开源 · React · TypeScript · 原生 CSS",
      title: "为会思考的产品打造",
      emphasis: "界面组件。",
      description: "七十八个可复用组件，既覆盖智能体体验，也覆盖产品周围所有常用界面。",
      browse: "浏览组件", docs: "阅读文档", copyPrompt: "复制总提示词", promptCopied: "提示词已复制", preview: "智能体实时预览", active: "智能体运行中",
      reasoning: "我会理解需求、核对约束，并把结果整理成可以直接复用的组件。",
      taskTitle: "正在构建界面", task1: "理解需求", task2: "优化交互", task3: "返回结果",
      placeholder: "告诉智能体你想修改什么…", components: "组件数量", dependencies: "组件合集", license: "开源协议",
    },
    sections: { thinking: "思考与推理", tools: "工具与操作状态", text: "文本输出", structured: "结构化输出", interactive: "丰富交互", count: "个组件" },
    cards: {
      thinking: "思考状态", reasoning: "思考与推理", orbs: "活动指示器", search: "网页搜索", diff: "文件差异", image: "图片生成",
      response: "文本回答", streaming: "流式文本", citations: "行内引用", code: "代码块", tasks: "任务列表", data: "数据表格", comparison: "对比表格", input: "智能体输入框",
    },
    content: {
      thinking: "思考中", thinkingOpen: "正在思考…", thought: (seconds: number) => `思考了 ${seconds} 秒`,
      reasoning: "正在读取需求和当前上下文，核对可用证据，然后给出简洁可靠的建议。",
      searchLabel: "正在搜索网页", searchQuery: "无障碍智能体界面模式", source1: "以人为本的 AI", source2: "ARIA 实时区域", source3: "流式界面研究",
      additions: (count: number) => `${count} 处新增`, imageLabel: "正在生成图片", imagePrompt: "黄昏时安静的阅读室",
      responseTitle: "清晰的回答结构", responseBody: "先给出结论，再保持支持信息易于阅读；只有在提高准确性时才使用", responseEnd: "。",
      stream: "回答逐字出现，并用平静的光标标记当前生成位置。", citationBody1: "好答案应该让结论一眼可见", citationBody2: "同时保留可以核验的证据", sourceTitle1: "以人为本的 AI 指南", sourceTitle2: "无障碍富互联网应用规范",
      launch: "发布检查清单", build: "构建界面", verify: "验证无障碍", publish: "发布版本", table: "模型路由概览", feature: "功能", sessions: "智能体会话", memory: "共享记忆", team: "团队控制",
      placeholder: "向智能体提问…", enhance: "优化提示词", enhancing: "正在优化", attach: "添加附件", model: "模型", send: "发送", copy: "复制", copied: "已复制",
    },
    footer: { license: "Agent UI CSS · MIT 开源协议", components: "智能体组件", appica: "界面组件", github: "GitHub" },
  },
} as const;

const columns: DataColumn<ModelRow>[] = [
  { key: "model", label: "Model" },
  { key: "latency", label: "Latency", align: "right" },
  { key: "context", label: "Context", align: "right" },
];

const diff = [
  { type: "context" as const, content: "export function greet(name: string) {", oldNumber: 7, newNumber: 7 },
  { type: "remove" as const, content: "  return `Hello ${name}`;", oldNumber: 8 },
  { type: "add" as const, content: "  return `Welcome, ${name}!`;", newNumber: 8 },
  { type: "context" as const, content: "}", oldNumber: 9, newNumber: 9 },
];

const REPOSITORY_URL = "https://github.com/zhaoxinyi02/agent-ui-css";

function agentComponentPrompt(displayName: string, exports: string, language: Language) {
  if (language === "zh") return `请在当前软件或网站项目中直接复用 Agent UI CSS 的「${displayName}」组件，不要重新制作相似组件。

仓库：${REPOSITORY_URL}

执行要求：
1. 先阅读仓库 README.md，了解组件 API、许可证与示例；
2. 如项目尚未安装，执行：npm install github:zhaoxinyi02/agent-ui-css#main；
3. 从 agent-ui-css 导入 ${exports}，并引入 agent-ui-css/styles.css；
4. 根据当前项目完成集成，复用现有实现，保留无障碍语义、响应式布局、深浅主题和减少动画支持；
5. 运行类型检查和生产构建，并说明修改了哪些文件。`;
  return `Reuse the “${displayName}” component from Agent UI CSS in the current software or website project. Do not recreate a similar component.

Repository: ${REPOSITORY_URL}

Requirements:
1. Read README.md first for the API, license, and examples;
2. If needed, run: npm install github:zhaoxinyi02/agent-ui-css#main;
3. Import ${exports} from agent-ui-css and import agent-ui-css/styles.css;
4. Integrate the existing implementation while preserving accessibility, responsive layout, light/dark themes, and reduced-motion support;
5. Run type checking and a production build, then report the changed files.`;
}

function masterPrompt(language: Language) {
  if (language === "zh") return `我要开发或改造一个软件、网站或 Web 应用。请优先从 Agent UI CSS 仓库选择并复用现有组件，不要重复造轮子。

仓库：${REPOSITORY_URL}
在线目录：https://au.lansuan.cc/#components

执行流程：
1. 先阅读 README.md、README.en.md 和 THIRD_PARTY_NOTICES.md，检查现有 78 个组件、类型、许可证及使用示例；
2. 结合当前产品需求，先列出准备复用的组件及其用途，再开始实现；
3. 如项目尚未安装，执行：npm install github:zhaoxinyi02/agent-ui-css#main；
4. AI/智能体组件从 agent-ui-css 导入，并引入 agent-ui-css/styles.css；
5. 按钮、表单、导航、弹窗、数据反馈等通用组件从 agent-ui-css/appica 导入，并引入 agent-ui-css/appica/styles.css；
6. 优先复用仓库现有组件和组合方式，仅在确实缺少能力时新增代码；
7. 保持当前项目技术栈和品牌风格，同时保证响应式布局、键盘操作、无障碍语义、中英文和深浅主题；
8. 完成后运行类型检查、测试和生产构建，并汇报复用了哪些组件、修改了哪些文件。`;
  return `I am building or improving a software product, website, or web app. Prefer existing components from Agent UI CSS instead of recreating them.

Repository: ${REPOSITORY_URL}
Live catalog: https://au.lansuan.cc/#components

Workflow:
1. Read README.md, README.en.md, and THIRD_PARTY_NOTICES.md to inspect all 78 components, types, licenses, and examples;
2. List the components you plan to reuse and their purpose before implementation;
3. If needed, run: npm install github:zhaoxinyi02/agent-ui-css#main;
4. Import AI/agent components from agent-ui-css and import agent-ui-css/styles.css;
5. Import general buttons, forms, navigation, overlays, and feedback components from agent-ui-css/appica and import agent-ui-css/appica/styles.css;
6. Reuse existing components and compositions first; add new code only when the library truly lacks the capability;
7. Preserve the current stack and brand while supporting responsive layout, keyboard access, accessibility, localization, and light/dark themes;
8. Run type checking, tests, and a production build, then report reused components and changed files.`;
}

function OrbSheet({ label }: { label: string }) {
  const variants = ["wave", "pulse", "orbit", "typing", "stack"] as const;
  return <div className="orb-sheet" aria-label={label}>{variants.flatMap((variant, row) => [<Orbs key={`${variant}-1`} variant={variant} tone={row % 3 === 0 ? "violet" : row % 3 === 1 ? "blue" : "mint"} />, <Orbs key={`${variant}-2`} variant={variant} tone={row % 3 === 0 ? "blue" : row % 3 === 1 ? "mint" : "violet"} />, <Orbs key={`${variant}-3`} variant={variant} tone={row % 3 === 0 ? "mint" : row % 3 === 1 ? "violet" : "blue"} />])}</div>;
}

export function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const t = messages[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(LANGUAGE_KEY, language);
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The controls still work when storage is blocked by the browser.
    }
  }, [language, theme]);

  const localizedColumns: DataColumn<ModelRow>[] = columns.map((column) => language === "zh" ? { ...column, label: column.key === "model" ? "模型" : column.key === "latency" ? "延迟" : "上下文" } : column);
  const categoryNames = language === "zh" ? {
    inputs: "输入与表单", agent: "AI 与智能体界面", data: "数据与反馈", content: "内容与代码",
  } : {
    inputs: "Inputs & Forms", agent: "AI & Agent Interfaces", data: "Data & Feedback", content: "Content & Code",
  };
  const extraGroups: Record<string, CatalogExtraCard[]> = {
    inputs: [{
      id: "agent-input", title: t.cards.input, searchText: "AI Agent Input 智能体输入框 prompt model form", meta: categoryNames.inputs, wide: true,
      prompt: agentComponentPrompt(t.cards.input, "AgentInput", language),
      preview: <AgentInput placeholder={t.content.placeholder} models={language === "zh" ? ["快速", "均衡", "深度"] : ["Swift", "Balanced", "Deep"]} enhanceLabel={t.content.enhance} enhancingLabel={t.content.enhancing} attachLabel={t.content.attach} modelLabel={t.content.model} sendLabel={t.content.send} />,
    }],
    agent: [
      { id: "thinking-state", title: t.cards.thinking, searchText: "Thinking State 思考状态", meta: categoryNames.agent, prompt: agentComponentPrompt(t.cards.thinking, "ThinkingState", language), preview: <ThinkingState label={t.content.thinking} /> },
      { id: "thinking-reasoning", title: t.cards.reasoning, searchText: "Thinking Reasoning 思考推理", meta: categoryNames.agent, prompt: agentComponentPrompt(t.cards.reasoning, "ThinkingReasoning", language), preview: <ThinkingReasoning seconds={8} thinkingLabel={t.content.thinkingOpen} thoughtLabel={t.content.thought}><p>{t.content.reasoning}</p></ThinkingReasoning> },
      { id: "activity-orbs", title: t.cards.orbs, searchText: "Activity Orbs 活动指示器", meta: categoryNames.agent, prompt: agentComponentPrompt(t.cards.orbs, "Orbs", language), preview: <OrbSheet label={t.cards.orbs} /> },
      { id: "web-search", title: t.cards.search, searchText: "Web Search 网页搜索", meta: categoryNames.agent, prompt: agentComponentPrompt(t.cards.search, "WebSearch", language), preview: <WebSearch label={t.content.searchLabel} query={t.content.searchQuery} sources={[{ title: t.content.source1, domain: "example.org", done: true }, { title: t.content.source2, domain: "w3.org", done: true }, { title: t.content.source3, domain: "example.com" }]} /> },
      { id: "image-generation", title: t.cards.image, searchText: "Image Generation 图片生成", meta: categoryNames.agent, prompt: agentComponentPrompt(t.cards.image, "ImageGeneration", language), preview: <ImageGeneration label={t.content.imageLabel} prompt={t.content.imagePrompt} progress={72} /> },
    ],
    data: [
      { id: "task-list", title: t.cards.tasks, searchText: "Task List To-do List 任务列表", meta: categoryNames.data, prompt: agentComponentPrompt(t.cards.tasks, "TaskList", language), preview: <TaskList title={t.content.launch} items={[{ id: "1", label: t.content.build, status: "done" }, { id: "2", label: t.content.verify, status: "active" }, { id: "3", label: t.content.publish, status: "pending" }]} /> },
      { id: "data-table", title: t.cards.data, searchText: "Data Table 数据表格", meta: categoryNames.data, wide: true, prompt: agentComponentPrompt(t.cards.data, "DataTable", language), preview: <DataTable columns={localizedColumns} rows={language === "zh" ? [{ model: "快速", latency: "320 毫秒", context: "64k" }, { model: "均衡", latency: "740 毫秒", context: "128k" }, { model: "深度", latency: "1.8 秒", context: "256k" }] : [{ model: "Swift", latency: "320 ms", context: "64k" }, { model: "Balanced", latency: "740 ms", context: "128k" }, { model: "Deep", latency: "1.8 s", context: "256k" }]} caption={t.content.table} /> },
      { id: "comparison-table", title: t.cards.comparison, searchText: "Comparison Table 对比表格", meta: categoryNames.data, wide: true, prompt: agentComponentPrompt(t.cards.comparison, "ComparisonTable", language), preview: <ComparisonTable featureLabel={t.content.feature} plans={language === "zh" ? ["入门版", "专业版", "团队版"] : ["Starter", "Pro", "Team"]} features={[{ feature: t.content.sessions, values: ["100", "∞", "∞"] }, { feature: t.content.memory, values: [false, true, true] }, { feature: t.content.team, values: [false, false, true] }]} /> },
    ],
    content: [
      { id: "file-diff", title: t.cards.diff, searchText: "File Diff 文件差异", meta: categoryNames.content, wide: true, prompt: agentComponentPrompt(t.cards.diff, "FileDiff", language), preview: <FileDiff filename="greeting.ts" lines={diff} additionsLabel={t.content.additions} /> },
      { id: "text-response", title: t.cards.response, searchText: "Text Response 文本回答", meta: categoryNames.content, prompt: agentComponentPrompt(t.cards.response, "TextResponse", language), preview: <TextResponse><h3>{t.content.responseTitle}</h3><p>{t.content.responseBody} <code>inline code</code>{t.content.responseEnd}</p></TextResponse> },
      { id: "streaming-text", title: t.cards.streaming, searchText: "Streaming Text 流式文本", meta: categoryNames.content, prompt: agentComponentPrompt(t.cards.streaming, "StreamingText", language), preview: <StreamingText text={t.content.stream} speed={24} /> },
      { id: "inline-citations", title: t.cards.citations, searchText: "Inline Citations 行内引用", meta: categoryNames.content, wide: true, prompt: agentComponentPrompt(t.cards.citations, "CitationMark and InlineCitations", language), preview: <TextResponse><p>{t.content.citationBody1}<CitationMark id={1} />{language === "zh" ? "，" : " "}{t.content.citationBody2}<CitationMark id={2} />{language === "zh" ? "。" : "."}</p><InlineCitations items={[{ id: 1, title: t.content.sourceTitle1, url: "https://www.nist.gov/itl/ai-risk-management-framework", domain: "nist.gov" }, { id: 2, title: t.content.sourceTitle2, url: "https://www.w3.org/WAI/standards-guidelines/aria/", domain: "w3.org" }]} /></TextResponse> },
      { id: "code-block", title: t.cards.code, searchText: "Code Block 代码块", meta: categoryNames.content, wide: true, prompt: agentComponentPrompt(t.cards.code, "CodeBlock", language), preview: <CodeBlock filename="agent.ts" language="typescript" copyLabel={t.content.copy} copiedLabel={t.content.copied} code={'type State = "idle" | "thinking" | "done";\n\nexport const isWorking = (state: State) =>\n  state === "thinking";'} /> },
    ],
  };

  return <main id="top">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Agent UI CSS home"><img className="wordmark__logo" src="/favicon.svg" alt="" /><strong>Agent UI</strong><span>CSS</span><small>v0.1</small></a>
      <div className="header-right">
        <nav aria-label={t.nav.label}><a href="#components">{t.nav.components}</a><a href="https://github.com/zhaoxinyi02/agent-ui-css">{t.nav.docs}</a><Button render={<a className="nav-primary" href="https://github.com/zhaoxinyi02/agent-ui-css" />} nativeButton={false} size="sm">{t.nav.github}</Button></nav>
        <div className="display-controls" aria-label={language === "zh" ? "显示设置" : "Display settings"}>
          <Button variant="ghost" size="sm" onClick={() => setLanguage(language === "en" ? "zh" : "en")} aria-label={t.controls.language}>{t.controls.languageShort}</Button>
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={theme === "light" ? t.controls.themeDark : t.controls.themeLight}>{theme === "light" ? t.controls.dark : t.controls.light}</Button>
        </div>
      </div>
    </header>

    <section className="showcase-hero" aria-labelledby="showcase-title">
      <div className="showcase-copy"><Badge variant="secondary" className="showcase-kicker">{t.hero.kicker}</Badge><h1 id="showcase-title">{t.hero.title} <em>{t.hero.emphasis}</em></h1><p>{t.hero.description}</p><div className="showcase-actions"><Button render={<a className="showcase-primary" href="#components" />} nativeButton={false}>{t.hero.browse}</Button><CopyButton className="showcase-prompt-copy" variant="outline" size="md" value={masterPrompt(language)} label={t.hero.copyPrompt} copiedLabel={t.hero.promptCopied}>{t.hero.copyPrompt}</CopyButton><Button variant="outline" render={<a href="https://github.com/zhaoxinyi02/agent-ui-css" />} nativeButton={false}>{t.hero.docs}</Button></div><dl className="showcase-stats"><div><dt>{t.hero.components}</dt><dd>78</dd></div><div><dt>{t.hero.dependencies}</dt><dd>2</dd></div><div><dt>{t.hero.license}</dt><dd>MIT</dd></div></dl></div>
      <div className="showcase-preview" aria-label={t.hero.preview}><div className="showcase-preview__bar"><span>{t.hero.preview}</span><Orbs variant="typing" tone="violet" label={t.hero.active} /></div><div className="showcase-preview__body"><ThinkingReasoning seconds={6} thinkingLabel={t.content.thinkingOpen} thoughtLabel={t.content.thought}><p>{t.hero.reasoning}</p></ThinkingReasoning><TaskList title={t.hero.taskTitle} items={[{ id: "hero-1", label: t.hero.task1, status: "done" }, { id: "hero-2", label: t.hero.task2, status: "active" }, { id: "hero-3", label: t.hero.task3, status: "pending" }]} /><AgentInput placeholder={t.hero.placeholder} models={language === "zh" ? ["均衡", "快速", "深度"] : ["Balanced", "Fast", "Deep"]} enhanceLabel={t.content.enhance} enhancingLabel={t.content.enhancing} attachLabel={t.content.attach} modelLabel={t.content.model} sendLabel={t.content.send} /></div></div>
    </section>

    <AppicaGallery language={language} extraGroups={extraGroups} />
    <footer className="site-footer"><span>{t.footer.license}</span><nav><a href="#components">{t.footer.components}</a><a href="https://github.com/zhaoxinyi02/agent-ui-css">{t.footer.github}</a></nav></footer>
  </main>;
}
