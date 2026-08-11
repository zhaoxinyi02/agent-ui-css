import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  Alert, AlertDescription, AlertIcon, AlertTitle,
  AlertDialog, AlertDialogBody, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  Autocomplete, AutocompleteContent, AutocompleteInput, AutocompleteItem, AutocompleteList,
  Avatar, AvatarFallback,
  BackgroundPattern,
  Badge,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,
  Button, ButtonGroup,
  Calendar,
  Carousel, CarouselContent, CarouselNext, CarouselPagination, CarouselPrev, CarouselSlide,
  Checkbox, CheckboxGroup,
  Chip, ChipGroup,
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList,
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
  CopyButton,
  Countdown, CountdownSegment,
  DateField, DatePicker,
  Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
  Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  Field, FieldDescription, FieldLabel,
  Fieldset, FieldsetLegend,
  Form,
  GradientGlow,
  Input,
  Kbd, KbdGroup,
  Loader,
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger,
  Meter, MeterLabel, MeterProgress, MeterValue,
  Navigation, NavigationItem, NavigationLink, NavigationList,
  NavigationMenu, NavigationMenuContent, NavigationMenuIcon, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  NumberField,
  OTPField, OTPFieldInput, OTPFieldSeparator,
  Pagination, PaginationItem, PaginationLink, PaginationList,
  Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger,
  PreviewCard, PreviewCardContent, PreviewCardTrigger,
  Progress, ProgressLabel, ProgressValue,
  Radio, RadioGroup,
  ScrollArea,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Separator,
  Skeleton,
  Slider,
  Sparkline, SparklineChart, SparklineLabel, SparklineValue,
  Spinner,
  Switch,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Tabs, TabsContent, TabsList, TabsTrigger,
  TextAnimate,
  Textarea,
  Thumbnail,
  TimeField,
  Toaster, ToastProvider, useToastManager,
  Toc, TocItem, TocLink, TocList,
  Toggle, ToggleGroup,
  Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "../vendor/appica-ui-react/src";

export type AppicaCatalogLanguage = "en" | "zh";
type Language = AppicaCatalogLanguage;
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

function ToastDemo() {
  const { add } = useToastManager();
  return <Button variant="outline" onClick={() => add({ title: "Saved", description: "Your changes are ready." })}>Show toast</Button>;
}

function Preview({ slug }: { slug: string }) {
  const previews: Record<string, ReactNode> = {
    accordion: <Accordion defaultValue={["one"]}><AccordionItem value="one"><AccordionTrigger>What is included?</AccordionTrigger><AccordionContent>Accessible interaction and styles.</AccordionContent></AccordionItem></Accordion>,
    alert: <Alert variant="info"><AlertIcon>i</AlertIcon><AlertTitle>System ready</AlertTitle><AlertDescription>All services are operational.</AlertDescription></Alert>,
    "alert-dialog": <AlertDialog><AlertDialogTrigger render={<Button variant="destructive">Delete</Button>} /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogBody>All project data will be removed.</AlertDialogBody><AlertDialogFooter><AlertDialogClose render={<Button variant="outline">Cancel</Button>} /><AlertDialogClose render={<Button variant="destructive">Delete</Button>} /></AlertDialogFooter></AlertDialogContent></AlertDialog>,
    autocomplete: <Autocomplete items={["React", "Vue", "Svelte"]}><AutocompleteInput placeholder="Choose a framework" aria-label="Choose a framework" /><AutocompleteContent><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompleteContent></Autocomplete>,
    avatar: <div className="appica-preview-row"><Avatar size="lg"><AvatarFallback>AU</AvatarFallback></Avatar><Avatar><AvatarFallback>UI</AvatarFallback></Avatar></div>,
    "background-pattern": <BackgroundPattern variant="grid" spotlight className="appica-pattern-demo"><strong>Pattern</strong><span>Move your pointer</span></BackgroundPattern>,
    badge: <div className="appica-preview-row"><Badge>Default</Badge><Badge variant="success">Ready</Badge><Badge variant="secondary">New</Badge></div>,
    breadcrumb: <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#home">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#components">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem>Button</BreadcrumbItem></BreadcrumbList></Breadcrumb>,
    button: <div className="appica-preview-row"><Button>Continue</Button><Button variant="outline">Cancel</Button></div>,
    "button-group": <ButtonGroup variant="outline"><Button>Day</Button><Button>Week</Button><Button>Month</Button></ButtonGroup>,
    calendar: <div className="appica-calendar-demo"><Calendar mode="single" month={new Date(2026, 7, 11)} selected={new Date(2026, 7, 11)} size="sm" /></div>,
    carousel: <Carousel className="appica-carousel-demo"><CarouselContent><CarouselSlide><span>01</span></CarouselSlide><CarouselSlide><span>02</span></CarouselSlide><CarouselSlide><span>03</span></CarouselSlide></CarouselContent><CarouselPrev /><CarouselNext /><CarouselPagination /></Carousel>,
    checkbox: <div className="appica-control-line"><Checkbox defaultChecked aria-label="Use smart defaults" /><span>Use smart defaults</span></div>,
    "checkbox-group": <CheckboxGroup aria-label="Channels" orientation="horizontal" defaultValue={["email"]}><label className="appica-control-line"><Checkbox value="email" />Email</label><label className="appica-control-line"><Checkbox value="push" />Push</label></CheckboxGroup>,
    chip: <ChipGroup><Chip>Design</Chip><Chip variant="secondary">React</Chip><Chip dismissible>TypeScript</Chip></ChipGroup>,
    collapsible: <Collapsible defaultOpen><CollapsibleTrigger>Project details</CollapsibleTrigger><CollapsibleContent><p className="appica-compact-copy">Three environments · 12 members</p></CollapsibleContent></Collapsible>,
    combobox: <Combobox items={["Balanced", "Fast", "Deep"]}><ComboboxInput placeholder="Select model" aria-label="Select model" /><ComboboxContent><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>,
    "context-menu": <ContextMenu><ContextMenuTrigger className="appica-context-target">Right-click this area</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Duplicate</ContextMenuItem><ContextMenuItem>Rename</ContextMenuItem><ContextMenuItem>Archive</ContextMenuItem></ContextMenuContent></ContextMenu>,
    "copy-button": <CopyButton value="npm install agent-ui-css">Copy install command</CopyButton>,
    countdown: <Countdown duration={86430}><CountdownSegment unit="hours" /><CountdownSegment unit="minutes" /><CountdownSegment unit="seconds" /></Countdown>,
    "date-field": <DateField defaultValue={new Date(2026, 7, 11)} format="MMM d, yyyy" />,
    "date-picker": <DatePicker defaultValue={new Date(2026, 7, 11)} defaultMonth={new Date(2026, 7, 11)} />,
    dialog: <Dialog><DialogTrigger render={<Button>Open dialog</Button>} /><DialogContent><DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Update your public information.</DialogDescription></DialogHeader><DialogBody><Input placeholder="Display name" /></DialogBody><DialogFooter><DialogClose render={<Button>Save changes</Button>} /></DialogFooter></DialogContent></Dialog>,
    drawer: <Drawer><DrawerTrigger render={<Button variant="outline">Open drawer</Button>} /><DrawerContent><DrawerHeader><DrawerTitle>Project settings</DrawerTitle><DrawerDescription>Manage this workspace.</DrawerDescription></DrawerHeader><DrawerBody>Settings appear in a responsive side panel.</DrawerBody><DrawerFooter><DrawerClose render={<Button>Done</Button>} /></DrawerFooter></DrawerContent></Drawer>,
    "dropdown-menu": <DropdownMenu><DropdownMenuTrigger>Open menu</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Settings</DropdownMenuItem><DropdownMenuItem>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
    field: <Field><FieldLabel>Email</FieldLabel><Input type="email" placeholder="you@example.com" /><FieldDescription>Used only for account updates.</FieldDescription></Field>,
    fieldset: <Fieldset><FieldsetLegend>Account</FieldsetLegend><Field><FieldLabel>Workspace</FieldLabel><Input defaultValue="Agent UI" /></Field></Fieldset>,
    form: <Form className="appica-form-demo"><Field><FieldLabel>Message</FieldLabel><Input placeholder="Type something" /></Field><Button type="submit">Submit</Button></Form>,
    "gradient-glow": <GradientGlow border pressScale className="appica-glow-demo"><strong>Gradient glow</strong><small>Press to interact</small></GradientGlow>,
    input: <Input placeholder="Search components…" aria-label="Search components" />,
    kbd: <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>,
    loader: <div className="appica-preview-row"><Loader variant="bar" /><Loader variant="dots" /></div>,
    menubar: <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New</MenubarItem><MenubarItem>Open</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>Edit</MenubarTrigger><MenubarContent><MenubarItem>Undo</MenubarItem><MenubarItem>Redo</MenubarItem></MenubarContent></MenubarMenu></Menubar>,
    meter: <Meter value={72}><MeterLabel>Storage</MeterLabel><MeterValue /><MeterProgress /></Meter>,
    navigation: <Navigation aria-label="Preview navigation" activeLink="components"><NavigationList><NavigationItem><NavigationLink href="#home" value="home">Home</NavigationLink></NavigationItem><NavigationItem><NavigationLink href="#components" value="components">Components</NavigationLink></NavigationItem></NavigationList></Navigation>,
    "navigation-menu": <NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Products <NavigationMenuIcon /></NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#agent">Agent UI</NavigationMenuLink><NavigationMenuLink href="#design">Design system</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>,
    "number-field": <NumberField defaultValue={3} aria-label="Quantity" />,
    "otp-field": <OTPField length={4} aria-label="Verification code"><OTPFieldInput /><OTPFieldInput aria-label="Digit 2" /><OTPFieldSeparator /><OTPFieldInput aria-label="Digit 3" /><OTPFieldInput aria-label="Digit 4" /></OTPField>,
    pagination: <Pagination><PaginationList><PaginationItem><PaginationLink href="#1">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#2" active>2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#3">3</PaginationLink></PaginationItem></PaginationList></Pagination>,
    popover: <Popover><PopoverTrigger render={<Button variant="outline">Open popover</Button>} /><PopoverContent><PopoverTitle>Quick settings</PopoverTitle><PopoverDescription>Adjust this component in context.</PopoverDescription><PopoverClose render={<Button size="sm">Done</Button>} /></PopoverContent></Popover>,
    "preview-card": <PreviewCard><PreviewCardTrigger href="#preview" delay={0} closeDelay={100}>Hover for preview</PreviewCardTrigger><PreviewCardContent><strong>Agent UI CSS</strong><p className="appica-compact-copy">Reusable interface building blocks.</p></PreviewCardContent></PreviewCard>,
    progress: <Progress value={68}><ProgressLabel>Building</ProgressLabel><ProgressValue /></Progress>,
    radio: <RadioGroup defaultValue="a" aria-label="Plan"><label className="appica-control-line"><Radio value="a" />Starter</label><label className="appica-control-line"><Radio value="b" />Pro</label></RadioGroup>,
    "radio-group": <RadioGroup defaultValue="balanced" orientation="horizontal" aria-label="Model"><label className="appica-control-line"><Radio value="fast" />Fast</label><label className="appica-control-line"><Radio value="balanced" />Balanced</label></RadioGroup>,
    "scroll-area": <ScrollArea className="appica-scroll-demo" scrollShadow><p>Design tokens</p><p>Accessible primitives</p><p>Motion settings</p><p>Theme provider</p><p>RTL support</p><p>Keyboard navigation</p></ScrollArea>,
    select: <Select defaultValue="balanced"><SelectTrigger aria-label="Model"><SelectValue placeholder="Choose model" /></SelectTrigger><SelectContent><SelectItem value="fast">Fast</SelectItem><SelectItem value="balanced">Balanced</SelectItem><SelectItem value="deep">Deep</SelectItem></SelectContent></Select>,
    separator: <div className="appica-separator-demo"><span>Before</span><Separator /><span>After</span></div>,
    skeleton: <div className="appica-skeleton-demo"><Skeleton className="h-10 w-10 rounded-full" /><div><Skeleton className="mb-2 h-3 w-32" /><Skeleton className="h-3 w-20" /></div></div>,
    slider: <Slider defaultValue={64} thumbAriaLabel="Intensity" />,
    sparkline: <Sparkline data={[12, 18, 14, 26, 22, 34, 31]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}><SparklineLabel /><SparklineValue /><SparklineChart variant="area" /></Sparkline>,
    spinner: <div className="appica-preview-row"><Spinner variant="circular" /><Spinner variant="dots" /><Spinner variant="sparkle" /></div>,
    switch: <div className="appica-control-line"><Switch defaultChecked aria-label="Notifications" /><span>Notifications</span></div>,
    table: <Table size="sm"><TableHeader><TableRow><TableHead>Model</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Swift</TableCell><TableCell>Ready</TableCell></TableRow><TableRow><TableCell>Deep</TableCell><TableCell>Queued</TableCell></TableRow></TableBody></Table>,
    tabs: <Tabs defaultValue="preview"><TabsList><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Code</TabsTrigger></TabsList><TabsContent value="preview"><p className="appica-compact-copy">Live component result</p></TabsContent><TabsContent value="code"><code>&lt;Component /&gt;</code></TabsContent></Tabs>,
    "text-animate": <TextAnimate effect="typewriter" duration={2}>Thoughtful interfaces, built to move.</TextAnimate>,
    textarea: <Textarea placeholder="Describe the task…" aria-label="Describe the task" />,
    thumbnail: <div className="appica-preview-row"><Thumbnail size="lg" variant="icon-soft">✦</Thumbnail><Thumbnail shape="circle" variant="icon-soft">AI</Thumbnail></div>,
    "time-field": <TimeField defaultValue="09:30" />,
    toast: <ToastProvider><ToastDemo /><Toaster position="top-center" /></ToastProvider>,
    toc: <Toc><TocList><TocItem><TocLink href="#intro">Introduction</TocLink></TocItem><TocItem><TocLink href="#usage">Usage</TocLink></TocItem><TocItem><TocLink href="#api" depth={2}>API reference</TocLink></TocItem></TocList></Toc>,
    toggle: <div className="appica-preview-row"><Toggle aria-label="Bold"><strong>B</strong></Toggle><Toggle aria-label="Italic"><em>I</em></Toggle></div>,
    "toggle-group": <ToggleGroup aria-label="Alignment" defaultValue={["center"]}><Toggle value="left" aria-label="Left">L</Toggle><Toggle value="center" aria-label="Center">C</Toggle><Toggle value="right" aria-label="Right">R</Toggle></ToggleGroup>,
    toolbar: <Toolbar aria-label="Formatting"><ToolbarGroup aria-label="Text style"><ToolbarButton render={<Button variant="ghost">Bold</Button>} /><ToolbarButton render={<Button variant="ghost">Italic</Button>} /></ToolbarGroup><ToolbarSeparator /><ToolbarLink href="#help">Help</ToolbarLink></Toolbar>,
    tooltip: <TooltipProvider delay={0}><Tooltip><TooltipTrigger render={<Button variant="outline">Hover me</Button>} /><TooltipContent>Helpful context</TooltipContent></Tooltip></TooltipProvider>,
  };

  return <>{previews[slug]}</>;
}

export function AppicaCatalog() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("agent-ui-language", language);
      localStorage.setItem("agent-ui-theme", theme);
    } catch { /* Preferences remain session-local when storage is blocked. */ }
  }, [language, theme]);

  const copy = language === "zh" ? {
    back: "返回 Agent UI",
  } : {
    back: "Back to Agent UI",
  };

  return <main className="appica-page">
    <header className="appica-header">
      <a href="/" className="appica-brand"><img src="/favicon.svg" alt="" /><strong>Agent UI CSS</strong><span>/ Appica collection</span></a>
      <div className="appica-header-actions"><a href="/">{copy.back}</a><button onClick={() => setLanguage(language === "zh" ? "en" : "zh")}>{language === "zh" ? "EN" : "中文"}</button><button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? (language === "zh" ? "深色" : "Dark") : (language === "zh" ? "浅色" : "Light")}</button></div>
    </header>

    <AppicaGallery language={language} />
  </main>;
}

export function AppicaGallery({ language }: { language: AppicaCatalogLanguage }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => groups.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase())),
  })).filter((group) => group.items.length > 0), [query]);

  const copy = language === "zh" ? {
    eyebrow: "APPICA UI · MIT 组件合集",
    title: "通用界面组件",
    body: "从按钮、表单到弹窗、导航和数据展示，64 个组件都在这里直接运行，也是这个网站正在使用的界面基础。",
    search: "搜索 64 个组件…",
    source: "查看源码",
    count: "个组件",
    notice: "Appica UI React © Appica UI，依据 MIT License 使用与再分发。",
    stats: ["组件", "源码文件", "运行时基础", "许可证"],
  } : {
    eyebrow: "APPICA UI · MIT COLLECTION",
    title: "General interface components",
    body: "From buttons and forms to dialogs, navigation, and data display: 64 live components that also power this website's own interface.",
    search: "Search 64 components…",
    source: "View source",
    count: "components",
    notice: "Appica UI React © Appica UI, used and redistributed under the MIT License.",
    stats: ["Components", "Source files", "Runtime base", "License"],
  };

  return <section className="appica-library" id="library" aria-labelledby="appica-library-title">
    <header className="appica-library-intro">
      <span className="appica-eyebrow">{copy.eyebrow}</span>
      <div><h2 id="appica-library-title">{copy.title}</h2><p>{copy.body}</p></div>
      <dl>{[["64", copy.stats[0]], ["166", copy.stats[1]], ["Base UI", copy.stats[2]], ["MIT", copy.stats[3]]].map(([value, label]) => <div key={label}><dd>{value}</dd><dt>{label}</dt></div>)}</dl>
    </header>
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
  </section>;
}
