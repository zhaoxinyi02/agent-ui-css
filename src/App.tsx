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

type ModelRow = { model: string; latency: string; context: string };

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

type PreviewCardProps = {
  title: string;
  category: string;
  children: React.ReactNode;
  align?: "center" | "top";
  className?: string;
};

function PreviewCard({ title, category, children, align = "center", className = "" }: PreviewCardProps) {
  return (
    <article className={`preview-card ${className}`}>
      <div className={`preview-card__stage preview-card__stage--${align}`}>{children}</div>
      <footer className="preview-card__meta">
        <div><strong>{title}</strong><span>{category}</span></div>
        <span className="preview-card__format" aria-hidden="true">TSX</span>
      </footer>
    </article>
  );
}

function CollectionSection({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  const count = Array.isArray(children) ? children.length : 1;
  return (
    <section className="collection-section">
      <header className="collection-section__header">
        <div><span>{eyebrow}</span><h2>{title}</h2></div>
        <span>{String(count).padStart(2, "0")} components</span>
      </header>
      <div className="collection-grid">{children}</div>
    </section>
  );
}

export function App() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Agent UI CSS home">
          <span className="brand__mark">AU</span>
          <strong>Agent UI</strong>
          <span className="brand__version">CSS · 0.1</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#components">Components</a>
          <a href="https://github.com/zhaoxinyi02/agent-ui-css">Documentation</a>
          <a className="header-action" href="https://github.com/zhaoxinyi02/agent-ui-css">GitHub ↗</a>
        </nav>
      </header>

      <section className="catalog-hero">
        <div>
          <span className="catalog-hero__eyebrow"><i /> Open-source interface kit</span>
          <h1>Components for products<br />that <em>think out loud.</em></h1>
        </div>
        <div className="catalog-hero__aside">
          <p>A quiet, adaptable React component library for AI agents—built with TypeScript and plain CSS.</p>
          <dl><div><dt>Components</dt><dd>14</dd></div><div><dt>Dependencies</dt><dd>0 UI</dd></div><div><dt>License</dt><dd>MIT</dd></div></dl>
        </div>
      </section>

      <div className="catalog-toolbar" id="components">
        <div className="catalog-tabs" role="navigation" aria-label="Component categories">
          <a className="is-active" href="#reasoning">All components</a>
          <a href="#reasoning">Reasoning</a>
          <a href="#tools">Tools</a>
          <a href="#outputs">Outputs</a>
          <a href="#input">Input</a>
        </div>
        <span>React · TypeScript · CSS</span>
      </div>

      <div className="catalog">
        <div id="reasoning">
          <CollectionSection eyebrow="01 / States" title="Thinking & reasoning">
            <PreviewCard title="Thinking State" category="Processing state"><ThinkingState /></PreviewCard>
            <PreviewCard title="Thinking + Reasoning" category="Expandable disclosure">
              <ThinkingReasoning seconds={8}><p>Compare the request with the available evidence, identify the strongest signal, and return a concise recommendation.</p></ThinkingReasoning>
            </PreviewCard>
            <PreviewCard title="Activity Orbs" category="Agent activity">
              <div className="orb-matrix"><Orbs /><Orbs tone="blue" /><Orbs tone="mint" /></div>
            </PreviewCard>
          </CollectionSection>
        </div>

        <div id="tools">
          <CollectionSection eyebrow="02 / Actions" title="Tools & action states">
            <PreviewCard title="Web Search" category="Tool activity" align="top">
              <WebSearch query="Accessible AI interface patterns" sources={[{ title: "Human-centered AI", domain: "example.org", done: true }, { title: "ARIA live regions", domain: "w3.org", done: true }, { title: "Streaming interfaces", domain: "example.com" }]} />
            </PreviewCard>
            <PreviewCard title="File Diff" category="Proposed changes" align="top"><FileDiff filename="greeting.ts" lines={diff} /></PreviewCard>
            <PreviewCard title="Image Generation" category="Media progress" align="top"><ImageGeneration prompt="A quiet reading room at dusk" progress={72} /></PreviewCard>
          </CollectionSection>
        </div>

        <div id="outputs">
          <CollectionSection eyebrow="03 / Responses" title="Text & structured output">
            <PreviewCard title="Streaming Text" category="Progressive response"><StreamingText text="The response arrives progressively, with a calm caret marking the live edge." speed={24} /></PreviewCard>
            <PreviewCard title="Inline Citations" category="Source attribution" align="top">
              <TextResponse><p>A useful answer makes the conclusion easy to find<CitationMark id={1} /> while preserving evidence<CitationMark id={2} />.</p><InlineCitations items={[{ id: 1, title: "Human-centered AI guidance", url: "https://www.nist.gov/itl/ai-risk-management-framework", domain: "nist.gov" }, { id: 2, title: "Accessible Rich Internet Applications", url: "https://www.w3.org/WAI/standards-guidelines/aria/", domain: "w3.org" }]} /></TextResponse>
            </PreviewCard>
            <PreviewCard title="Code Block" category="Technical output" align="top"><CodeBlock filename="agent.ts" language="typescript" code={'type State = "idle" | "thinking" | "done";\n\nexport const isWorking = (state: State) =>\n  state === "thinking";'} /></PreviewCard>
            <PreviewCard title="Data Table" category="Structured results" align="top"><DataTable columns={columns} rows={[{ model: "Swift", latency: "320 ms", context: "64k" }, { model: "Balanced", latency: "740 ms", context: "128k" }, { model: "Deep", latency: "1.8 s", context: "256k" }]} caption="Model routing overview" /></PreviewCard>
            <PreviewCard title="Comparison Table" category="Feature matrix" align="top"><ComparisonTable plans={["Starter", "Pro", "Team"]} features={[{ feature: "Agent sessions", values: ["100", "∞", "∞"] }, { feature: "Shared memory", values: [false, true, true] }, { feature: "Team controls", values: [false, false, true] }]} /></PreviewCard>
            <PreviewCard title="To-do List" category="Multi-step progress"><TaskList title="Launch checklist" items={[{ id: "1", label: "Build interface", status: "done" }, { id: "2", label: "Verify accessibility", status: "active" }, { id: "3", label: "Publish release", status: "pending" }]} /></PreviewCard>
          </CollectionSection>
        </div>

        <div id="input">
          <CollectionSection eyebrow="04 / Composer" title="Rich & interactive">
            <PreviewCard title="AI Agent Input" category="Prompt composer" className="preview-card--feature"><AgentInput models={["Swift", "Balanced", "Deep"]} /></PreviewCard>
            <PreviewCard title="Text Response" category="Answer typography" className="preview-card--feature">
              <TextResponse><h3>A clear response structure</h3><p>Lead with the answer, keep supporting detail readable, and use <code>inline code</code> only where it adds precision.</p><p><a href="https://github.com/zhaoxinyi02/agent-ui-css">Read the documentation ↗</a></p></TextResponse>
            </PreviewCard>
          </CollectionSection>
        </div>
      </div>

      <section className="closing-note">
        <span>Designed to disappear into your product.</span>
        <p>Bring your own color, type, radius and voice. The components handle the interaction details.</p>
      </section>

      <footer className="site-footer"><span>Agent UI CSS · MIT License</span><span>Independent project · Not affiliated with AICSS</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
