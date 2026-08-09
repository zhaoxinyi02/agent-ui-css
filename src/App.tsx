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

type GalleryCardProps = {
  title: string;
  category: string;
  children: React.ReactNode;
  stageClassName?: string;
};

function GalleryCard({ title, category, children, stageClassName = "" }: GalleryCardProps) {
  return (
    <article className="gallery-card">
      <div className={`gallery-card__stage ${stageClassName}`}>{children}</div>
      <footer className="gallery-card__meta">
        <strong>{title}</strong>
        <span>{category}</span>
      </footer>
    </article>
  );
}

function GallerySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const count = Array.isArray(children) ? children.length : 1;
  return (
    <section className="gallery-section" id={id}>
      <header className="gallery-section__heading">
        <h2>{title}</h2>
        <span>{count} components</span>
      </header>
      <div className="gallery-grid">{children}</div>
    </section>
  );
}

function OrbSheet() {
  const variants = ["wave", "pulse", "orbit", "typing", "stack"] as const;
  return (
    <div className="orb-sheet" aria-label="Activity orb variants">
      {variants.flatMap((variant, row) => [
        <Orbs key={`${variant}-1`} variant={variant} tone={row % 3 === 0 ? "violet" : row % 3 === 1 ? "blue" : "mint"} />,
        <Orbs key={`${variant}-2`} variant={variant} tone={row % 3 === 0 ? "blue" : row % 3 === 1 ? "mint" : "violet"} />,
        <Orbs key={`${variant}-3`} variant={variant} tone={row % 3 === 0 ? "mint" : row % 3 === 1 ? "violet" : "blue"} />,
      ])}
    </div>
  );
}

export function App() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#thinking" aria-label="Agent UI CSS components">
          <strong>Agent UI</strong>
          <span>CSS</span>
          <small>v0.1</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="https://github.com/zhaoxinyi02/agent-ui-css">Documentation</a>
          <a className="nav-primary" href="https://github.com/zhaoxinyi02/agent-ui-css">View on GitHub</a>
        </nav>
      </header>

      <div className="gallery-shell">
        <GallerySection id="thinking" title="Thinking & Reasoning">
          <GalleryCard title="Thinking State" category="Thinking & Reasoning"><ThinkingState /></GalleryCard>
          <GalleryCard title="Thinking + Reasoning" category="Thinking & Reasoning">
            <ThinkingReasoning seconds={8}><p>Reading the request and the current context, then checking the available evidence before returning a concise recommendation.</p></ThinkingReasoning>
          </GalleryCard>
          <GalleryCard title="Activity Orbs" category="Thinking & Reasoning"><OrbSheet /></GalleryCard>
        </GallerySection>

        <GallerySection id="tools" title="Tool & Action States">
          <GalleryCard title="Web Search" category="Tool & Action States" stageClassName="gallery-card__stage--dense">
            <WebSearch query="Accessible AI interface patterns" sources={[{ title: "Human-centered AI", domain: "example.org", done: true }, { title: "ARIA live regions", domain: "w3.org", done: true }, { title: "Streaming interfaces", domain: "example.com" }]} />
          </GalleryCard>
          <GalleryCard title="File Diff" category="Tool & Action States" stageClassName="gallery-card__stage--dense"><FileDiff filename="greeting.ts" lines={diff} /></GalleryCard>
          <GalleryCard title="Image Generation" category="Tool & Action States" stageClassName="gallery-card__stage--dense"><ImageGeneration prompt="A quiet reading room at dusk" progress={72} /></GalleryCard>
        </GallerySection>

        <GallerySection id="text" title="Text Outputs">
          <GalleryCard title="Text Response" category="Text Outputs" stageClassName="gallery-card__stage--prose">
            <TextResponse><h3>A clear response structure</h3><p>Lead with the answer, keep supporting detail readable, and use <code>inline code</code> only where it adds precision.</p></TextResponse>
          </GalleryCard>
          <GalleryCard title="Streaming Text" category="Text Outputs"><StreamingText text="The response arrives progressively, with a calm caret marking the live edge." speed={24} /></GalleryCard>
          <GalleryCard title="Inline Citations" category="Text Outputs" stageClassName="gallery-card__stage--prose">
            <TextResponse><p>A useful answer makes the conclusion easy to find<CitationMark id={1} /> while preserving evidence<CitationMark id={2} />.</p><InlineCitations items={[{ id: 1, title: "Human-centered AI guidance", url: "https://www.nist.gov/itl/ai-risk-management-framework", domain: "nist.gov" }, { id: 2, title: "Accessible Rich Internet Applications", url: "https://www.w3.org/WAI/standards-guidelines/aria/", domain: "w3.org" }]} /></TextResponse>
          </GalleryCard>
          <GalleryCard title="Code Block" category="Text Outputs" stageClassName="gallery-card__stage--dense"><CodeBlock filename="agent.ts" language="typescript" code={'type State = "idle" | "thinking" | "done";\n\nexport const isWorking = (state: State) =>\n  state === "thinking";'} /></GalleryCard>
        </GallerySection>

        <GallerySection id="structured" title="Structured Outputs">
          <GalleryCard title="To-do List" category="Structured Outputs"><TaskList title="Launch checklist" items={[{ id: "1", label: "Build interface", status: "done" }, { id: "2", label: "Verify accessibility", status: "active" }, { id: "3", label: "Publish release", status: "pending" }]} /></GalleryCard>
          <GalleryCard title="Data Table" category="Structured Outputs" stageClassName="gallery-card__stage--dense"><DataTable columns={columns} rows={[{ model: "Swift", latency: "320 ms", context: "64k" }, { model: "Balanced", latency: "740 ms", context: "128k" }, { model: "Deep", latency: "1.8 s", context: "256k" }]} caption="Model routing overview" /></GalleryCard>
          <GalleryCard title="Comparison Table" category="Structured Outputs" stageClassName="gallery-card__stage--dense"><ComparisonTable plans={["Starter", "Pro", "Team"]} features={[{ feature: "Agent sessions", values: ["100", "∞", "∞"] }, { feature: "Shared memory", values: [false, true, true] }, { feature: "Team controls", values: [false, false, true] }]} /></GalleryCard>
        </GallerySection>

        <GallerySection id="interactive" title="Rich & Interactive">
          <GalleryCard title="AI Agent Input" category="Rich & Interactive"><AgentInput models={["Swift", "Balanced", "Deep"]} /></GalleryCard>
        </GallerySection>
      </div>

      <footer className="site-footer">
        <span>Agent UI CSS · MIT License</span>
        <nav><a href="#thinking">Components</a><a href="https://github.com/zhaoxinyi02/agent-ui-css">GitHub</a></nav>
      </footer>
    </main>
  );
}
