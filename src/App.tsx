import { useEffect, useState } from "react";
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
    nav: { components: "Components", docs: "Documentation", github: "View on GitHub", label: "Primary navigation" },
    controls: { language: "Switch to Chinese", languageShort: "中文", dark: "Dark", light: "Light", themeDark: "Switch to dark theme", themeLight: "Switch to light theme" },
    hero: {
      kicker: "Open source · React · TypeScript · Plain CSS",
      title: "Interface building blocks for",
      emphasis: "thinking products.",
      description: "Fourteen considered components for agents that reason, act, stream, cite and ask for the next thing.",
      browse: "Browse components", docs: "Read the docs", preview: "Live agent preview", active: "Agent is active",
      reasoning: "I’ll review the request, verify the constraints, and turn the result into a reusable component.",
      taskTitle: "Building interface", task1: "Understand the request", task2: "Refine the interaction", task3: "Return the result",
      placeholder: "Ask the agent to change something…", components: "Components", dependencies: "UI dependencies", license: "License",
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
    footer: { license: "Agent UI CSS · MIT License", components: "Components", github: "GitHub" },
  },
  zh: {
    nav: { components: "组件", docs: "使用文档", github: "查看 GitHub", label: "主导航" },
    controls: { language: "切换到英文", languageShort: "EN", dark: "深色", light: "浅色", themeDark: "切换到深色主题", themeLight: "切换到浅色主题" },
    hero: {
      kicker: "开源 · React · TypeScript · 原生 CSS",
      title: "为会思考的产品打造",
      emphasis: "界面组件。",
      description: "十四个精心设计的组件，覆盖智能体的推理、行动、流式输出、引用与下一步输入。",
      browse: "浏览组件", docs: "阅读文档", preview: "智能体实时预览", active: "智能体运行中",
      reasoning: "我会理解需求、核对约束，并把结果整理成可以直接复用的组件。",
      taskTitle: "正在构建界面", task1: "理解需求", task2: "优化交互", task3: "返回结果",
      placeholder: "告诉智能体你想修改什么…", components: "组件数量", dependencies: "UI 依赖", license: "开源协议",
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
    footer: { license: "Agent UI CSS · MIT 开源协议", components: "组件", github: "GitHub" },
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

type GalleryCardProps = { title: string; category: string; children: React.ReactNode; stageClassName?: string };
function GalleryCard({ title, category, children, stageClassName = "" }: GalleryCardProps) {
  return <article className="gallery-card"><div className={`gallery-card__stage ${stageClassName}`}>{children}</div><footer className="gallery-card__meta"><strong>{title}</strong><span>{category}</span></footer></article>;
}

function GallerySection({ id, title, countLabel, children }: { id: string; title: string; countLabel: string; children: React.ReactNode }) {
  const count = Array.isArray(children) ? children.length : 1;
  return <section className="gallery-section" id={id}><header className="gallery-section__heading"><h2>{title}</h2><span>{count} {countLabel}</span></header><div className="gallery-grid">{children}</div></section>;
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
    try {
      window.localStorage.setItem(LANGUAGE_KEY, language);
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The controls still work when storage is blocked by the browser.
    }
  }, [language, theme]);

  const localizedColumns: DataColumn<ModelRow>[] = columns.map((column) => language === "zh" ? { ...column, label: column.key === "model" ? "模型" : column.key === "latency" ? "延迟" : "上下文" } : column);
  const category = (value: string) => value;

  return <main id="top">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Agent UI CSS home"><strong>Agent UI</strong><span>CSS</span><small>v0.1</small></a>
      <div className="header-right">
        <nav aria-label={t.nav.label}><a href="#components">{t.nav.components}</a><a href="https://github.com/zhaoxinyi02/agent-ui-css">{t.nav.docs}</a><a className="nav-primary" href="https://github.com/zhaoxinyi02/agent-ui-css">{t.nav.github}</a></nav>
        <div className="display-controls" aria-label={language === "zh" ? "显示设置" : "Display settings"}>
          <button type="button" onClick={() => setLanguage(language === "en" ? "zh" : "en")} aria-label={t.controls.language}>{t.controls.languageShort}</button>
          <button type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={theme === "light" ? t.controls.themeDark : t.controls.themeLight}>{theme === "light" ? t.controls.dark : t.controls.light}</button>
        </div>
      </div>
    </header>

    <section className="showcase-hero" aria-labelledby="showcase-title">
      <div className="showcase-copy"><span className="showcase-kicker">{t.hero.kicker}</span><h1 id="showcase-title">{t.hero.title} <em>{t.hero.emphasis}</em></h1><p>{t.hero.description}</p><div className="showcase-actions"><a className="showcase-primary" href="#components">{t.hero.browse}</a><a href="https://github.com/zhaoxinyi02/agent-ui-css">{t.hero.docs}</a></div><dl className="showcase-stats"><div><dt>{t.hero.components}</dt><dd>14</dd></div><div><dt>{t.hero.dependencies}</dt><dd>0</dd></div><div><dt>{t.hero.license}</dt><dd>MIT</dd></div></dl></div>
      <div className="showcase-preview" aria-label={t.hero.preview}><div className="showcase-preview__bar"><span>{t.hero.preview}</span><Orbs variant="typing" tone="violet" label={t.hero.active} /></div><div className="showcase-preview__body"><ThinkingReasoning seconds={6} thinkingLabel={t.content.thinkingOpen} thoughtLabel={t.content.thought}><p>{t.hero.reasoning}</p></ThinkingReasoning><TaskList title={t.hero.taskTitle} items={[{ id: "hero-1", label: t.hero.task1, status: "done" }, { id: "hero-2", label: t.hero.task2, status: "active" }, { id: "hero-3", label: t.hero.task3, status: "pending" }]} /><AgentInput placeholder={t.hero.placeholder} models={["Balanced", "Fast", "Deep"]} enhanceLabel={t.content.enhance} enhancingLabel={t.content.enhancing} attachLabel={t.content.attach} modelLabel={t.content.model} sendLabel={t.content.send} /></div></div>
    </section>

    <div className="gallery-shell" id="components">
      <GallerySection id="thinking" title={t.sections.thinking} countLabel={t.sections.count}>
        <GalleryCard title={t.cards.thinking} category={category(t.sections.thinking)}><ThinkingState label={t.content.thinking} /></GalleryCard>
        <GalleryCard title={t.cards.reasoning} category={category(t.sections.thinking)}><ThinkingReasoning seconds={8} thinkingLabel={t.content.thinkingOpen} thoughtLabel={t.content.thought}><p>{t.content.reasoning}</p></ThinkingReasoning></GalleryCard>
        <GalleryCard title={t.cards.orbs} category={category(t.sections.thinking)}><OrbSheet label={t.cards.orbs} /></GalleryCard>
      </GallerySection>
      <GallerySection id="tools" title={t.sections.tools} countLabel={t.sections.count}>
        <GalleryCard title={t.cards.search} category={category(t.sections.tools)} stageClassName="gallery-card__stage--dense"><WebSearch label={t.content.searchLabel} query={t.content.searchQuery} sources={[{ title: t.content.source1, domain: "example.org", done: true }, { title: t.content.source2, domain: "w3.org", done: true }, { title: t.content.source3, domain: "example.com" }]} /></GalleryCard>
        <GalleryCard title={t.cards.diff} category={category(t.sections.tools)} stageClassName="gallery-card__stage--dense"><FileDiff filename="greeting.ts" lines={diff} additionsLabel={t.content.additions} /></GalleryCard>
        <GalleryCard title={t.cards.image} category={category(t.sections.tools)} stageClassName="gallery-card__stage--dense"><ImageGeneration label={t.content.imageLabel} prompt={t.content.imagePrompt} progress={72} /></GalleryCard>
      </GallerySection>
      <GallerySection id="text" title={t.sections.text} countLabel={t.sections.count}>
        <GalleryCard title={t.cards.response} category={category(t.sections.text)} stageClassName="gallery-card__stage--prose"><TextResponse><h3>{t.content.responseTitle}</h3><p>{t.content.responseBody} <code>inline code</code>{t.content.responseEnd}</p></TextResponse></GalleryCard>
        <GalleryCard title={t.cards.streaming} category={category(t.sections.text)}><StreamingText text={t.content.stream} speed={24} /></GalleryCard>
        <GalleryCard title={t.cards.citations} category={category(t.sections.text)} stageClassName="gallery-card__stage--prose"><TextResponse><p>{t.content.citationBody1}<CitationMark id={1} />{language === "zh" ? "，" : " "}{t.content.citationBody2}<CitationMark id={2} />{language === "zh" ? "。" : "."}</p><InlineCitations items={[{ id: 1, title: t.content.sourceTitle1, url: "https://www.nist.gov/itl/ai-risk-management-framework", domain: "nist.gov" }, { id: 2, title: t.content.sourceTitle2, url: "https://www.w3.org/WAI/standards-guidelines/aria/", domain: "w3.org" }]} /></TextResponse></GalleryCard>
        <GalleryCard title={t.cards.code} category={category(t.sections.text)} stageClassName="gallery-card__stage--dense"><CodeBlock filename="agent.ts" language="typescript" copyLabel={t.content.copy} copiedLabel={t.content.copied} code={'type State = "idle" | "thinking" | "done";\n\nexport const isWorking = (state: State) =>\n  state === "thinking";'} /></GalleryCard>
      </GallerySection>
      <GallerySection id="structured" title={t.sections.structured} countLabel={t.sections.count}>
        <GalleryCard title={t.cards.tasks} category={category(t.sections.structured)}><TaskList title={t.content.launch} items={[{ id: "1", label: t.content.build, status: "done" }, { id: "2", label: t.content.verify, status: "active" }, { id: "3", label: t.content.publish, status: "pending" }]} /></GalleryCard>
        <GalleryCard title={t.cards.data} category={category(t.sections.structured)} stageClassName="gallery-card__stage--dense"><DataTable columns={localizedColumns} rows={[{ model: "Swift", latency: "320 ms", context: "64k" }, { model: "Balanced", latency: "740 ms", context: "128k" }, { model: "Deep", latency: "1.8 s", context: "256k" }]} caption={t.content.table} /></GalleryCard>
        <GalleryCard title={t.cards.comparison} category={category(t.sections.structured)} stageClassName="gallery-card__stage--dense"><ComparisonTable plans={["Starter", "Pro", "Team"]} features={[{ feature: t.content.sessions, values: ["100", "∞", "∞"] }, { feature: t.content.memory, values: [false, true, true] }, { feature: t.content.team, values: [false, false, true] }]} /></GalleryCard>
      </GallerySection>
      <GallerySection id="interactive" title={t.sections.interactive} countLabel={t.sections.count}>
        <GalleryCard title={t.cards.input} category={category(t.sections.interactive)}><AgentInput placeholder={t.content.placeholder} models={["Swift", "Balanced", "Deep"]} enhanceLabel={t.content.enhance} enhancingLabel={t.content.enhancing} attachLabel={t.content.attach} modelLabel={t.content.model} sendLabel={t.content.send} /></GalleryCard>
      </GallerySection>
    </div>
    <footer className="site-footer"><span>{t.footer.license}</span><nav><a href="#thinking">{t.footer.components}</a><a href="https://github.com/zhaoxinyi02/agent-ui-css">{t.footer.github}</a></nav></footer>
  </main>;
}
