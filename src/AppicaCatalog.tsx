import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "../vendor/appica-ui-react/src/components/alert/alert";
import { Avatar, AvatarFallback } from "../vendor/appica-ui-react/src/components/avatar/avatar";
import { Badge } from "../vendor/appica-ui-react/src/components/badge/badge";
import { Button } from "../vendor/appica-ui-react/src/components/button/button";
import { Checkbox } from "../vendor/appica-ui-react/src/components/checkbox/checkbox";
import { Input } from "../vendor/appica-ui-react/src/components/input/input";
import { Kbd, KbdGroup } from "../vendor/appica-ui-react/src/components/kbd/kbd";
import { Progress, ProgressLabel, ProgressValue } from "../vendor/appica-ui-react/src/components/progress/progress";
import { Separator } from "../vendor/appica-ui-react/src/components/separator/separator";
import { Skeleton } from "../vendor/appica-ui-react/src/components/skeleton/skeleton";
import { Slider } from "../vendor/appica-ui-react/src/components/slider/slider";
import { Spinner } from "../vendor/appica-ui-react/src/components/spinner/spinner";
import { Switch } from "../vendor/appica-ui-react/src/components/switch/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../vendor/appica-ui-react/src/components/table/table";
import { Textarea } from "../vendor/appica-ui-react/src/components/textarea/textarea";
import { Toggle } from "../vendor/appica-ui-react/src/components/toggle/toggle";

type Language = "en" | "zh";
type Theme = "light" | "dark";
type ComponentItem = { name: string; slug: string };
type ComponentGroup = { en: string; zh: string; items: ComponentItem[] };

const groups: ComponentGroup[] = [
  {
    en: "Inputs & Forms",
    zh: "输入与表单",
    items: ["Button", "Button Group", "Input", "Textarea", "Checkbox", "Checkbox Group", "Radio", "Radio Group", "Switch", "Select", "Combobox", "Autocomplete", "Date Field", "Date Picker", "Time Field", "Number Field", "OTP Field", "Slider", "Toggle", "Toggle Group", "Field", "Fieldset", "Form"].map(toItem),
  },
  {
    en: "Navigation & Overlays",
    zh: "导航与浮层",
    items: ["Accordion", "Breadcrumb", "Collapsible", "Context Menu", "Dialog", "Alert Dialog", "Drawer", "Dropdown Menu", "Menubar", "Navigation", "Navigation Menu", "Pagination", "Popover", "Preview Card", "Tabs", "Toolbar", "Tooltip"].map(toItem),
  },
  {
    en: "Data & Feedback",
    zh: "数据与反馈",
    items: ["Alert", "Avatar", "Badge", "Calendar", "Carousel", "Chip", "Copy Button", "Countdown", "Loader", "Meter", "Progress", "Scroll Area", "Skeleton", "Sparkline", "Spinner", "Table", "Toast", "Thumbnail"].map(toItem),
  },
  {
    en: "Visual Utilities",
    zh: "视觉与工具",
    items: ["Background Pattern", "Gradient Glow", "Kbd", "Separator", "Text Animate", "Toc"].map(toItem),
  },
];

function toItem(name: string): ComponentItem {
  return { name, slug: name.toLowerCase().replaceAll(" ", "-") };
}

function readPreference(key: string) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

function initialLanguage(): Language {
  const saved = readPreference("agent-ui-language");
  if (saved === "en" || saved === "zh") return saved;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function initialTheme(): Theme {
  const saved = readPreference("agent-ui-theme");
  if (saved === "light" || saved === "dark") return saved;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function Preview({ slug }: { slug: string }) {
  const previews: Record<string, ReactNode> = {
    alert: <Alert variant="info"><AlertIcon>i</AlertIcon><AlertTitle>System ready</AlertTitle><AlertDescription>All services are operational.</AlertDescription></Alert>,
    avatar: <div className="appica-preview-row"><Avatar size="lg"><AvatarFallback>AU</AvatarFallback></Avatar><Avatar><AvatarFallback>UI</AvatarFallback></Avatar></div>,
    badge: <div className="appica-preview-row"><Badge>Default</Badge><Badge variant="success">Ready</Badge><Badge variant="secondary">New</Badge></div>,
    button: <div className="appica-preview-row"><Button>Continue</Button><Button variant="outline">Cancel</Button></div>,
    checkbox: <div className="appica-control-line"><Checkbox defaultChecked aria-label="Use smart defaults" /><span>Use smart defaults</span></div>,
    input: <Input placeholder="Search components…" aria-label="Search components" />,
    kbd: <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>,
    progress: <Progress value={68}><ProgressLabel>Building</ProgressLabel><ProgressValue /></Progress>,
    separator: <div className="appica-separator-demo"><span>Before</span><Separator /><span>After</span></div>,
    skeleton: <div className="appica-skeleton-demo"><Skeleton className="h-10 w-10 rounded-full" /><div><Skeleton className="mb-2 h-3 w-32" /><Skeleton className="h-3 w-20" /></div></div>,
    slider: <Slider defaultValue={64} thumbAriaLabel="Intensity" />,
    spinner: <div className="appica-preview-row"><Spinner variant="circular" /><Spinner variant="dots" /><Spinner variant="sparkle" /></div>,
    switch: <div className="appica-control-line"><Switch defaultChecked aria-label="Notifications" /><span>Notifications</span></div>,
    table: <Table size="sm"><TableHeader><TableRow><TableHead>Model</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Swift</TableCell><TableCell>Ready</TableCell></TableRow><TableRow><TableCell>Deep</TableCell><TableCell>Queued</TableCell></TableRow></TableBody></Table>,
    textarea: <Textarea placeholder="Describe the task…" aria-label="Describe the task" />,
    toggle: <div className="appica-preview-row"><Toggle aria-label="Bold"><strong>B</strong></Toggle><Toggle aria-label="Italic"><em>I</em></Toggle></div>,
  };

  return <>{previews[slug] ?? <div className="appica-source-preview"><span>{slug.slice(0, 2).toUpperCase()}</span><small>Source included</small></div>}</>;
}

export function AppicaCatalog() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("agent-ui-language", language);
      localStorage.setItem("agent-ui-theme", theme);
    } catch { /* Preferences remain session-local when storage is blocked. */ }
  }, [language, theme]);

  const filtered = useMemo(() => groups.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase())),
  })).filter((group) => group.items.length > 0), [query]);

  const copy = language === "zh" ? {
    back: "返回 Agent UI",
    eyebrow: "MIT 组件合集 · React 19 · Tailwind CSS 4",
    title: "64 个现代界面组件，全部收录。",
    body: "完整保留 Appica UI React 源码，并为常用组件提供真实交互预览。所有条目均可直接定位到仓库源码。",
    search: "搜索 64 个组件…",
    source: "查看源码",
    count: "个组件",
    notice: "Appica UI React © Appica UI，依据 MIT License 使用与再分发。",
    stats: ["组件", "源码文件", "运行时基础", "许可证"],
  } : {
    back: "Back to Agent UI",
    eyebrow: "MIT collection · React 19 · Tailwind CSS 4",
    title: "64 modern interface components, all included.",
    body: "The full Appica UI React source is preserved, with live previews for commonly used controls and direct links to every source folder.",
    search: "Search 64 components…",
    source: "View source",
    count: "components",
    notice: "Appica UI React © Appica UI, used and redistributed under the MIT License.",
    stats: ["Components", "Source files", "Runtime base", "License"],
  };

  return <main className="appica-page">
    <header className="appica-header">
      <a href="/" className="appica-brand"><img src="/favicon.svg" alt="" /><strong>Agent UI CSS</strong><span>/ Appica collection</span></a>
      <div className="appica-header-actions"><a href="/">{copy.back}</a><button onClick={() => setLanguage(language === "zh" ? "en" : "zh")}>{language === "zh" ? "EN" : "中文"}</button><button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? (language === "zh" ? "深色" : "Dark") : (language === "zh" ? "浅色" : "Light")}</button></div>
    </header>

    <section className="appica-hero">
      <span className="appica-eyebrow">{copy.eyebrow}</span>
      <h1>{copy.title}</h1>
      <p>{copy.body}</p>
      <dl>{[["64", copy.stats[0]], ["166", copy.stats[1]], ["Base UI", copy.stats[2]], ["MIT", copy.stats[3]]].map(([value, label]) => <div key={label}><dd>{value}</dd><dt>{label}</dt></div>)}</dl>
    </section>

    <section className="appica-catalog">
      <div className="appica-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search} /><kbd>⌘ K</kbd></div>
      {filtered.map((group) => <section className="appica-group" key={group.en}>
        <header><h2>{language === "zh" ? group.zh : group.en}</h2><span>{group.items.length} {copy.count}</span></header>
        <div className="appica-grid">{group.items.map((item) => <article className="appica-card" key={item.slug}>
          <div className="appica-card-preview"><Preview slug={item.slug} /></div>
          <footer><div><strong>{item.name}</strong><small>{item.slug}</small></div><a href={`https://github.com/zhaoxinyi02/agent-ui-css/tree/main/vendor/appica-ui-react/src/components/${item.slug}`}>{copy.source} ↗</a></footer>
        </article>)}</div>
      </section>)}
      {filtered.length === 0 && <div className="appica-empty">No components found.</div>}
    </section>

    <footer className="appica-license"><span>{copy.notice}</span><a href="https://github.com/zhaoxinyi02/agent-ui-css/blob/main/THIRD_PARTY_NOTICES.md">Third-party notices ↗</a></footer>
  </main>;
}
