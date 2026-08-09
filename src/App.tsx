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

function DemoCard({ title, description, children, wide = false }: { title: string; description: string; children: React.ReactNode; wide?: boolean }) {
  return <article className={wide ? "demo-card demo-card--wide" : "demo-card"}><header><span>{title}</span><p>{description}</p></header><div className="demo-stage">{children}</div></article>;
}

export function App() {
  return <main>
    <section className="hero">
      <a className="wordmark" href="#top" aria-label="Agent UI CSS home"><span>AU</span>Agent UI CSS</a>
      <div className="hero__copy">
        <p className="eyebrow">Open-source · React · TypeScript · Plain CSS</p>
        <h1>UI building blocks for<br /><em>agentic products.</em></h1>
        <p>Fourteen original, dependency-light components for thinking states, tools, streaming responses, structured output and agent input.</p>
        <div><a href="#components">Browse components</a><a className="secondary" href="https://github.com/zhaoxinyi02/agent-ui-css">View source</a></div>
      </div>
      <div className="hero__preview">
        <ThinkingReasoning seconds={6}><p>I’ll compare the available options, verify the constraints, then return a concise recommendation.</p></ThinkingReasoning>
        <TaskList items={[{ id: "1", label: "Understand the request", status: "done" }, { id: "2", label: "Evaluate the evidence", status: "active" }, { id: "3", label: "Write the response", status: "pending" }]} />
        <AgentInput />
      </div>
    </section>

    <section className="intro" id="components"><p>Component collection</p><h2>Small pieces. Coherent system.</h2><span>Copy the source, import the package, or adapt the design tokens to your product.</span></section>
    <section className="demo-grid">
      <DemoCard title="Thinking State" description="Lightweight processing feedback"><ThinkingState /></DemoCard>
      <DemoCard title="Orbs" description="Compact asynchronous activity"><div className="orb-row"><Orbs /><Orbs tone="blue" /><Orbs tone="mint" /></div></DemoCard>
      <DemoCard title="Thinking + Reasoning" description="Expandable chain summary" wide><ThinkingReasoning seconds={8}><p>Compare the request against the available information, identify the strongest signal, and keep the final answer focused.</p></ThinkingReasoning></DemoCard>
      <DemoCard title="Web Search" description="Resolvable source states"><WebSearch query="Accessible AI interface patterns" sources={[{ title: "Designing human-centered AI", domain: "example.org", done: true }, { title: "ARIA live regions", domain: "w3.org", done: true }, { title: "Streaming interface research", domain: "example.com" }]} /></DemoCard>
      <DemoCard title="File Diff" description="Inline proposed edits"><FileDiff filename="greeting.ts" lines={diff} /></DemoCard>
      <DemoCard title="Image Generation" description="Progressive media placeholder"><ImageGeneration prompt="A quiet reading room at dusk" progress={72} /></DemoCard>
      <DemoCard title="Streaming Text" description="Typewriter response state"><StreamingText text="The response arrives progressively, with a calm caret marking the live edge." speed={24} /></DemoCard>
      <DemoCard title="Text + Citations" description="Readable prose and sources" wide><TextResponse><p>A useful assistant response should make the conclusion easy to find<CitationMark id={1} /> while preserving enough evidence to verify it<CitationMark id={2} />.</p><InlineCitations items={[{ id: 1, title: "Human-centered AI guidance", url: "https://www.nist.gov/itl/ai-risk-management-framework", domain: "nist.gov" }, { id: 2, title: "Accessible Rich Internet Applications", url: "https://www.w3.org/WAI/standards-guidelines/aria/", domain: "w3.org" }]} /></TextResponse></DemoCard>
      <DemoCard title="Code Block" description="Copy-ready technical output" wide><CodeBlock filename="agent.ts" language="typescript" code={'type AgentState = "idle" | "thinking" | "done";\n\nexport const isWorking = (state: AgentState) =>\n  state === "thinking";'} /></DemoCard>
      <DemoCard title="Data Table" description="Typed structured results" wide><DataTable columns={columns} rows={[{ model: "Swift", latency: "320 ms", context: "64k" }, { model: "Balanced", latency: "740 ms", context: "128k" }, { model: "Deep", latency: "1.8 s", context: "256k" }]} caption="Model routing overview" /></DemoCard>
      <DemoCard title="Comparison Table" description="Compact plan matrix" wide><ComparisonTable plans={["Starter", "Pro", "Team"]} features={[{ feature: "Agent sessions", values: ["100", "Unlimited", "Unlimited"] }, { feature: "Shared memory", values: [false, true, true] }, { feature: "Team controls", values: [false, false, true] }]} /></DemoCard>
      <DemoCard title="To-do List" description="Visible multi-step progress"><TaskList title="Launch checklist" items={[{ id: "1", label: "Build interface", status: "done" }, { id: "2", label: "Verify accessibility", status: "active" }, { id: "3", label: "Publish release", status: "pending" }]} /></DemoCard>
      <DemoCard title="AI Agent Input" description="Composer with model and enhance states"><AgentInput models={["Swift", "Balanced", "Deep"]} /></DemoCard>
    </section>

    <section className="principles"><p>Built for adaptation</p><div><h2>Plain CSS.<br />Predictable props.<br />No design-system lock-in.</h2><ul><li><span>01</span>Semantic HTML and keyboard-friendly controls</li><li><span>02</span>CSS custom properties for quick theming</li><li><span>03</span>Zero runtime UI dependencies</li><li><span>04</span>Original SVG icon primitives included</li></ul></div></section>
    <footer><span>Agent UI CSS · MIT License</span><span>Independent open-source project. Not affiliated with AICSS.</span></footer>
  </main>;
}
