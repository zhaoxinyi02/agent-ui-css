import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

export type IconName =
  | "arrow-up"
  | "attachment"
  | "check"
  | "chevron"
  | "code"
  | "copy"
  | "file"
  | "globe"
  | "image"
  | "magic"
  | "search"
  | "spark"
  | "stop";

const paths: Record<IconName, ReactNode> = {
  "arrow-up": <><path d="M12 19V5"/><path d="m6.5 10.5 5.5-5.5 5.5 5.5"/></>,
  attachment: <path d="m8.5 12.5 5.8-5.8a3 3 0 0 1 4.2 4.2l-7.2 7.2a5 5 0 0 1-7.1-7.1l7-7"/>,
  check: <path d="m5 12.5 4.2 4.2L19 7"/>,
  chevron: <path d="m7 9.5 5 5 5-5"/>,
  code: <><path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/></>,
  copy: <><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
  file: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h4"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3.5 3.5 2-2L20 19"/></>,
  magic: <><path d="m4 20 10.5-10.5"/><path d="m13 5 1-3 1 3 3 1-3 1-1 3-1-3-3-1zM18 13l.7-2 .7 2 2 .7-2 .7-.7 2-.7-2-2-.7z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></>,
  spark: <path d="m12 2 1.4 5.6L19 9l-5.6 1.4L12 16l-1.4-5.6L5 9l5.6-1.4z"/>,
  stop: <rect x="7" y="7" width="10" height="10" rx="2"/>,
};

export function Icon({ name, size = 18, label, className = "" }: { name: IconName; size?: number; label?: string; className?: string }) {
  return <svg className={`aui-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>{paths[name]}</svg>;
}

export function ThinkingState({ label = "Thinking" }: { label?: string }) {
  return <span className="aui-shimmer" aria-live="polite">{label}</span>;
}

export function ThinkingReasoning({ children, seconds = 4, defaultOpen = true }: { children: ReactNode; seconds?: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return <section className="aui-reasoning">
    <button className="aui-reasoning__trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
      <span className={open ? "aui-reasoning__thinking" : ""}>{open ? "Thinking…" : `Thought for ${seconds}s`}</span>
      <Icon name="chevron" size={15} className={open ? "aui-rotate" : ""} />
    </button>
    {open && <div className="aui-reasoning__body">{children}</div>}
  </section>;
}

export type OrbVariant = "wave" | "pulse" | "orbit" | "typing" | "stack";

export function Orbs({ label = "Agent is working", tone = "violet", variant = "wave" }: { label?: string; tone?: "violet" | "blue" | "mint"; variant?: OrbVariant }) {
  return <div className={`aui-orbs aui-orbs--${tone} aui-orbs--${variant}`} role="status" aria-label={label}><i /><i /><i /></div>;
}

export type SearchSource = { title: string; domain: string; done?: boolean };
export function WebSearch({ query, sources }: { query: string; sources: SearchSource[] }) {
  return <section className="aui-tool-card">
    <header className="aui-tool-card__header"><Icon name="search" /><div><span className="aui-kicker">Searching the web</span><strong>{query}</strong></div></header>
    <div className="aui-source-list">{sources.map((source) => <div className="aui-source" key={`${source.domain}-${source.title}`}><span className={source.done ? "aui-source__done" : "aui-source__pending"}>{source.done ? <Icon name="check" size={14} /> : <Icon name="globe" size={14} />}</span><div><strong>{source.title}</strong><small>{source.domain}</small></div></div>)}</div>
  </section>;
}

export type DiffLine = { type: "add" | "remove" | "context"; content: string; oldNumber?: number; newNumber?: number };
export function FileDiff({ filename, lines }: { filename: string; lines: DiffLine[] }) {
  return <section className="aui-diff"><header><Icon name="file" size={16} /><strong>{filename}</strong><span>{lines.filter((line) => line.type === "add").length} additions</span></header><pre>{lines.map((line, index) => <div className={`aui-diff__line aui-diff__line--${line.type}`} key={index}><span>{line.oldNumber ?? ""}</span><span>{line.newNumber ?? ""}</span><b>{line.type === "add" ? "+" : line.type === "remove" ? "−" : " "}</b><code>{line.content}</code></div>)}</pre></section>;
}

export function ImageGeneration({ prompt, progress = 68, imageUrl }: { prompt: string; progress?: number; imageUrl?: string }) {
  return <figure className="aui-image-gen">{imageUrl ? <img src={imageUrl} alt={prompt} /> : <div className="aui-image-gen__canvas"><Icon name="image" size={28} /><span className="aui-image-gen__sweep" /></div>}<figcaption><div><span>Generating image</span><strong>{prompt}</strong></div><span>{Math.max(0, Math.min(100, progress))}%</span></figcaption><div className="aui-progress"><i style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} /></div></figure>;
}

export function TextResponse({ children }: { children: ReactNode }) {
  return <article className="aui-prose">{children}</article>;
}

export function StreamingText({ text, speed = 22, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [length, setLength] = useState(0);
  useEffect(() => { setLength(0); }, [text]);
  useEffect(() => {
    if (length >= text.length) { onDone?.(); return; }
    const id = window.setTimeout(() => setLength((value) => value + 1), speed);
    return () => window.clearTimeout(id);
  }, [length, onDone, speed, text]);
  return <p className="aui-stream" aria-label={text}><span aria-hidden="true">{text.slice(0, length)}</span><i aria-hidden="true" /></p>;
}

export type Citation = { id: number; title: string; url: string; domain?: string };
export function CitationMark({ id }: { id: number }) { return <sup className="aui-citation-mark">{id}</sup>; }
export function InlineCitations({ items }: { items: Citation[] }) {
  return <ol className="aui-citations">{items.map((item) => <li key={item.id}><span>{item.id}</span><a href={item.url} target="_blank" rel="noreferrer"><strong>{item.title}</strong><small>{item.domain ?? new URL(item.url).hostname}</small></a></li>)}</ol>;
}

export function CodeBlock({ code, language = "text", filename }: { code: string; language?: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  return <section className="aui-code"><header><span>{filename ?? language}</span><button onClick={copy}><Icon name={copied ? "check" : "copy"} size={15} />{copied ? "Copied" : "Copy"}</button></header><pre><code>{code}</code></pre></section>;
}

export type TaskItem = { id: string; label: string; status: "done" | "active" | "pending" };
export function TaskList({ title = "Tasks", items, defaultOpen = true }: { title?: string; items: TaskItem[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const done = items.filter((item) => item.status === "done").length;
  return <section className="aui-tasks"><button onClick={() => setOpen(!open)} aria-expanded={open}><span className="aui-task-meter">{done}/{items.length}</span><strong>{title}</strong><Icon name="chevron" className={open ? "aui-rotate" : ""} size={15} /></button>{open && <ul>{items.map((item) => <li key={item.id} data-status={item.status}><span>{item.status === "done" ? <Icon name="check" size={13} /> : item.status === "active" ? <i /> : ""}</span>{item.label}</li>)}</ul>}</section>;
}

export type DataColumn<T> = { key: keyof T & string; label: string; align?: "left" | "right"; render?: (value: T[keyof T], row: T) => ReactNode };
export function DataTable<T extends Record<string, unknown>>({ columns, rows, caption }: { columns: DataColumn<T>[]; rows: T[]; caption?: string }) {
  return <div className="aui-table-wrap"><table className="aui-table">{caption && <caption>{caption}</caption>}<thead><tr>{columns.map((column) => <th key={column.key} style={{ textAlign: column.align }}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{columns.map((column) => <td key={column.key} style={{ textAlign: column.align }}>{column.render ? column.render(row[column.key], row) : String(row[column.key] ?? "")}</td>)}</tr>)}</tbody></table></div>;
}

export type ComparisonFeature = { feature: string; values: Array<boolean | string> };
export function ComparisonTable({ plans, features }: { plans: string[]; features: ComparisonFeature[] }) {
  return <div className="aui-table-wrap"><table className="aui-table aui-comparison"><thead><tr><th>Feature</th>{plans.map((plan) => <th key={plan}>{plan}</th>)}</tr></thead><tbody>{features.map((row) => <tr key={row.feature}><td>{row.feature}</td>{row.values.map((value, index) => <td key={index}>{value === true ? <Icon name="check" size={16} /> : value === false ? <span className="aui-dash">—</span> : value}</td>)}</tr>)}</tbody></table></div>;
}

export function AgentInput({ placeholder = "Ask the agent…", models = ["Fast", "Deep"], onSubmit }: { placeholder?: string; models?: string[]; onSubmit?: (value: string, model: string) => void }) {
  const [value, setValue] = useState("");
  const [model, setModel] = useState(models[0] ?? "Default");
  const [enhancing, setEnhancing] = useState(false);
  const canSubmit = value.trim().length > 0;
  const enhance = () => { if (!canSubmit) return; setEnhancing(true); window.setTimeout(() => { setValue((current) => `Please provide a clear, structured response to: ${current}`); setEnhancing(false); }, 650); };
  const submit = (event: FormEvent) => { event.preventDefault(); if (!canSubmit) return; onSubmit?.(value.trim(), model); setValue(""); };
  return <form className="aui-agent-input" onSubmit={submit}><textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} rows={3} /><footer><div><button type="button" aria-label="Attach a file"><Icon name="attachment" /></button><select value={model} onChange={(event) => setModel(event.target.value)} aria-label="Model">{models.map((item) => <option key={item}>{item}</option>)}</select><button type="button" onClick={enhance} disabled={!canSubmit || enhancing}><Icon name="magic" size={16} />{enhancing ? "Enhancing" : "Enhance"}</button></div><button className="aui-agent-input__send" type="submit" disabled={!canSubmit} aria-label="Send"><Icon name="arrow-up" /></button></footer></form>;
}

export function ComponentCount({ values }: { values: number[] }) {
  const total = useMemo(() => values.reduce((sum, value) => sum + value, 0), [values]);
  return <>{total}</>;
}
