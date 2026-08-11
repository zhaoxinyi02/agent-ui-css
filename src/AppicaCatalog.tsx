import { useEffect, useMemo, useState, type ReactNode } from "react";
import { enUS, zhCN } from "date-fns/locale";
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
type ComponentItem = { name: string; zh: string; slug: string };
type ComponentGroup = { en: string; zh: string; items: ComponentItem[] };

const componentNamesZh: Record<string, string> = {
  "Button": "按钮", "Button Group": "按钮组", "Input": "输入框", "Textarea": "多行输入框", "Checkbox": "复选框", "Checkbox Group": "复选框组",
  "Radio": "单选框", "Radio Group": "单选框组", "Switch": "开关", "Select": "选择器", "Combobox": "组合框", "Autocomplete": "自动补全",
  "Date Field": "日期字段", "Date Picker": "日期选择器", "Time Field": "时间字段", "Number Field": "数字字段", "OTP Field": "验证码输入框", "Slider": "滑块",
  "Toggle": "切换按钮", "Toggle Group": "切换按钮组", "Field": "表单字段", "Fieldset": "字段组", "Form": "表单", "Accordion": "手风琴",
  "Breadcrumb": "面包屑", "Collapsible": "折叠面板", "Context Menu": "右键菜单", "Dialog": "对话框", "Alert Dialog": "警告对话框", "Drawer": "抽屉",
  "Dropdown Menu": "下拉菜单", "Menubar": "菜单栏", "Navigation": "导航", "Navigation Menu": "导航菜单", "Pagination": "分页", "Popover": "浮层",
  "Preview Card": "预览卡片", "Tabs": "标签页", "Toolbar": "工具栏", "Tooltip": "提示框", "Alert": "提示消息", "Avatar": "头像",
  "Badge": "徽章", "Calendar": "日历", "Carousel": "轮播", "Chip": "标签", "Copy Button": "复制按钮", "Countdown": "倒计时",
  "Loader": "加载指示器", "Meter": "仪表", "Progress": "进度条", "Scroll Area": "滚动区域", "Skeleton": "骨架屏", "Sparkline": "迷你图表",
  "Spinner": "旋转加载器", "Table": "表格", "Toast": "通知", "Thumbnail": "缩略图", "Background Pattern": "背景图案", "Gradient Glow": "渐变光晕",
  "Kbd": "键盘按键", "Separator": "分隔线", "Text Animate": "文字动画", "Toc": "目录",
};

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
  return { name, zh: componentNamesZh[name] ?? name, slug: name.toLowerCase().replaceAll(" ", "-") };
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

function ToastDemo({ language }: { language: AppicaCatalogLanguage }) {
  const { add } = useToastManager();
  const zh = language === "zh";
  return <Button variant="outline" onClick={() => add({ title: zh ? "已保存" : "Saved", description: zh ? "你的更改已经准备就绪。" : "Your changes are ready." })}>{zh ? "显示通知" : "Show toast"}</Button>;
}

function Preview({ slug, language }: { slug: string; language: AppicaCatalogLanguage }) {
  const text = (en: string, zh: string) => language === "zh" ? zh : en;
  const previews: Record<string, ReactNode> = {
    accordion: <Accordion defaultValue={["one"]}><AccordionItem value="one"><AccordionTrigger>{text("What is included?", "包含哪些内容？")}</AccordionTrigger><AccordionContent>{text("Accessible interaction and styles.", "包含无障碍交互与完整样式。")}</AccordionContent></AccordionItem></Accordion>,
    alert: <Alert variant="info"><AlertIcon>i</AlertIcon><AlertTitle>{text("System ready", "系统已就绪")}</AlertTitle><AlertDescription>{text("All services are operational.", "所有服务均正常运行。")}</AlertDescription></Alert>,
    "alert-dialog": <AlertDialog><AlertDialogTrigger render={<Button variant="destructive">{text("Delete", "删除")}</Button>} /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{text("Delete project?", "删除项目？")}</AlertDialogTitle><AlertDialogDescription>{text("This action cannot be undone.", "此操作无法撤销。")}</AlertDialogDescription></AlertDialogHeader><AlertDialogBody>{text("All project data will be removed.", "项目的全部数据都将被删除。")}</AlertDialogBody><AlertDialogFooter><AlertDialogClose render={<Button variant="outline">{text("Cancel", "取消")}</Button>} /><AlertDialogClose render={<Button variant="destructive">{text("Delete", "删除")}</Button>} /></AlertDialogFooter></AlertDialogContent></AlertDialog>,
    autocomplete: <Autocomplete items={["React", "Vue", "Svelte"]}><AutocompleteInput placeholder={text("Choose a framework", "选择框架")} aria-label={text("Choose a framework", "选择框架")} /><AutocompleteContent><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompleteContent></Autocomplete>,
    avatar: <div className="appica-preview-row"><Avatar size="lg"><AvatarFallback>AU</AvatarFallback></Avatar><Avatar><AvatarFallback>UI</AvatarFallback></Avatar></div>,
    "background-pattern": <BackgroundPattern variant="grid" spotlight className="appica-pattern-demo"><strong>{text("Pattern", "背景图案")}</strong><span>{text("Move your pointer", "移动指针查看效果")}</span></BackgroundPattern>,
    badge: <div className="appica-preview-row"><Badge>{text("Default", "默认")}</Badge><Badge variant="success">{text("Ready", "就绪")}</Badge><Badge variant="secondary">{text("New", "新增")}</Badge></div>,
    breadcrumb: <Breadcrumb className="appica-centered-control"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#home">{text("Home", "首页")}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#components">{text("Components", "组件")}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem>{text("Button", "按钮")}</BreadcrumbItem></BreadcrumbList></Breadcrumb>,
    button: <div className="appica-preview-row"><Button>{text("Continue", "继续")}</Button><Button variant="outline">{text("Cancel", "取消")}</Button></div>,
    "button-group": <ButtonGroup variant="outline" className="appica-centered-control"><Button>{text("Day", "日")}</Button><Button>{text("Week", "周")}</Button><Button>{text("Month", "月")}</Button></ButtonGroup>,
    calendar: <div className="appica-calendar-demo"><Calendar mode="single" locale={language === "zh" ? zhCN : enUS} month={new Date(2026, 7, 11)} selected={new Date(2026, 7, 11)} size="sm" /></div>,
    carousel: <Carousel className="appica-carousel-demo"><CarouselContent><CarouselSlide><span>01</span></CarouselSlide><CarouselSlide><span>02</span></CarouselSlide><CarouselSlide><span>03</span></CarouselSlide></CarouselContent><CarouselPrev /><CarouselNext /><CarouselPagination /></Carousel>,
    checkbox: <div className="appica-control-line"><Checkbox defaultChecked aria-label={text("Use smart defaults", "使用智能默认值")} /><span>{text("Use smart defaults", "使用智能默认值")}</span></div>,
    "checkbox-group": <CheckboxGroup className="appica-centered-control" aria-label={text("Channels", "通知渠道")} orientation="horizontal" defaultValue={["email"]}><label className="appica-control-line"><Checkbox value="email" />{text("Email", "邮件")}</label><label className="appica-control-line"><Checkbox value="push" />{text("Push", "推送")}</label></CheckboxGroup>,
    chip: <ChipGroup className="appica-centered-control"><Chip>{text("Design", "设计")}</Chip><Chip variant="secondary">React</Chip><Chip dismissible closeLabel={text("Dismiss", "移除")}>{text("TypeScript", "类型安全")}</Chip></ChipGroup>,
    collapsible: <Collapsible className="appica-centered-control appica-collapsible-demo" defaultOpen><CollapsibleTrigger>{text("Project details", "项目详情")}</CollapsibleTrigger><CollapsibleContent><p className="appica-compact-copy">{text("Three environments · 12 members", "3 个环境 · 12 位成员")}</p></CollapsibleContent></Collapsible>,
    combobox: <Combobox items={language === "zh" ? ["均衡", "快速", "深度"] : ["Balanced", "Fast", "Deep"]}><ComboboxInput placeholder={text("Select model", "选择模型")} aria-label={text("Select model", "选择模型")} /><ComboboxContent><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>,
    "context-menu": <ContextMenu><ContextMenuTrigger className="appica-context-target">{text("Right-click this area", "在此区域点击右键")}</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>{text("Duplicate", "创建副本")}</ContextMenuItem><ContextMenuItem>{text("Rename", "重命名")}</ContextMenuItem><ContextMenuItem>{text("Archive", "归档")}</ContextMenuItem></ContextMenuContent></ContextMenu>,
    "copy-button": <CopyButton value="npm install agent-ui-css" label={text("Copy install command", "复制安装命令")} copiedLabel={text("Copied", "已复制")}>{text("Copy install command", "复制安装命令")}</CopyButton>,
    countdown: <Countdown className="appica-centered-control appica-countdown-demo" duration={86370}><CountdownSegment unit="hours" /><span aria-hidden="true">:</span><CountdownSegment unit="minutes" /><span aria-hidden="true">:</span><CountdownSegment unit="seconds" /></Countdown>,
    "date-field": <DateField defaultValue={new Date(2026, 7, 11)} format={language === "zh" ? "yyyy年M月d日" : "MMM d, yyyy"} />,
    "date-picker": <DatePicker locale={language === "zh" ? zhCN : enUS} dateFormat={language === "zh" ? "yyyy年M月d日" : "MM/dd/yyyy"} triggerAriaLabel={text("Open calendar", "打开日历")} defaultValue={new Date(2026, 7, 11)} defaultMonth={new Date(2026, 7, 11)} />,
    dialog: <Dialog><DialogTrigger render={<Button>{text("Open dialog", "打开对话框")}</Button>} /><DialogContent><DialogHeader><DialogTitle>{text("Edit profile", "编辑个人资料")}</DialogTitle><DialogDescription>{text("Update your public information.", "更新你的公开信息。")}</DialogDescription></DialogHeader><DialogBody><Input placeholder={text("Display name", "显示名称")} /></DialogBody><DialogFooter><DialogClose render={<Button>{text("Save changes", "保存更改")}</Button>} /></DialogFooter></DialogContent></Dialog>,
    drawer: <Drawer><DrawerTrigger render={<Button variant="outline">{text("Open drawer", "打开抽屉")}</Button>} /><DrawerContent><DrawerHeader><DrawerTitle>{text("Project settings", "项目设置")}</DrawerTitle><DrawerDescription>{text("Manage this workspace.", "管理当前工作区。")}</DrawerDescription></DrawerHeader><DrawerBody>{text("Settings appear in a responsive side panel.", "设置会显示在响应式侧边面板中。")}</DrawerBody><DrawerFooter><DrawerClose render={<Button>{text("Done", "完成")}</Button>} /></DrawerFooter></DrawerContent></Drawer>,
    "dropdown-menu": <DropdownMenu><DropdownMenuTrigger>{text("Open menu", "打开菜单")}</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>{text("Profile", "个人资料")}</DropdownMenuItem><DropdownMenuItem>{text("Settings", "设置")}</DropdownMenuItem><DropdownMenuItem>{text("Sign out", "退出登录")}</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
    field: <Field><FieldLabel>{text("Email", "邮箱")}</FieldLabel><Input type="email" placeholder="you@example.com" /><FieldDescription>{text("Used only for account updates.", "仅用于账户更新。")}</FieldDescription></Field>,
    fieldset: <Fieldset><FieldsetLegend>{text("Account", "账户")}</FieldsetLegend><Field><FieldLabel>{text("Workspace", "工作区")}</FieldLabel><Input defaultValue="Agent UI" /></Field></Fieldset>,
    form: <Form className="appica-form-demo"><Field><FieldLabel>{text("Message", "消息")}</FieldLabel><Input placeholder={text("Type something", "输入内容")} /></Field><Button type="submit">{text("Submit", "提交")}</Button></Form>,
    "gradient-glow": <GradientGlow border pressScale className="appica-glow-demo"><strong>{text("Gradient glow", "渐变光晕")}</strong><small>{text("Press to interact", "按下查看交互")}</small></GradientGlow>,
    input: <Input placeholder={text("Search components…", "搜索组件…")} aria-label={text("Search components", "搜索组件")} />,
    kbd: <KbdGroup className="appica-centered-control"><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>,
    loader: <div className="appica-preview-row"><Loader variant="bar" aria-label={text("Loading", "正在加载")} /><Loader variant="dots" aria-label={text("Loading", "正在加载")} /></div>,
    menubar: <Menubar className="appica-centered-control"><MenubarMenu><MenubarTrigger>{text("File", "文件")}</MenubarTrigger><MenubarContent><MenubarItem>{text("New", "新建")}</MenubarItem><MenubarItem>{text("Open", "打开")}</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>{text("Edit", "编辑")}</MenubarTrigger><MenubarContent><MenubarItem>{text("Undo", "撤销")}</MenubarItem><MenubarItem>{text("Redo", "重做")}</MenubarItem></MenubarContent></MenubarMenu></Menubar>,
    meter: <Meter value={72}><MeterLabel>{text("Storage", "存储空间")}</MeterLabel><MeterValue /><MeterProgress /></Meter>,
    navigation: <Navigation className="appica-centered-control" aria-label={text("Preview navigation", "预览导航")} activeLink="components"><NavigationList><NavigationItem><NavigationLink href="#home" value="home">{text("Home", "首页")}</NavigationLink></NavigationItem><NavigationItem><NavigationLink href="#components" value="components">{text("Components", "组件")}</NavigationLink></NavigationItem></NavigationList></Navigation>,
    "navigation-menu": <NavigationMenu className="appica-centered-control"><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>{text("Products", "产品")} <NavigationMenuIcon /></NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#agent">Agent UI</NavigationMenuLink><NavigationMenuLink href="#design">{text("Design system", "设计系统")}</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>,
    "number-field": <NumberField defaultValue={3} aria-label={text("Quantity", "数量")} />,
    "otp-field": <OTPField className="appica-centered-control" length={4} aria-label={text("Verification code", "验证码")}><OTPFieldInput /><OTPFieldInput aria-label={text("Digit 2", "第 2 位")} /><OTPFieldSeparator /><OTPFieldInput aria-label={text("Digit 3", "第 3 位")} /><OTPFieldInput aria-label={text("Digit 4", "第 4 位")} /></OTPField>,
    pagination: <Pagination className="appica-centered-control"><PaginationList><PaginationItem><PaginationLink href="#1">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#2" active>2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#3">3</PaginationLink></PaginationItem></PaginationList></Pagination>,
    popover: <Popover><PopoverTrigger render={<Button variant="outline">{text("Open popover", "打开浮层")}</Button>} /><PopoverContent><PopoverTitle>{text("Quick settings", "快捷设置")}</PopoverTitle><PopoverDescription>{text("Adjust this component in context.", "在当前场景中调整组件。")}</PopoverDescription><PopoverClose render={<Button size="sm">{text("Done", "完成")}</Button>} /></PopoverContent></Popover>,
    "preview-card": <PreviewCard><PreviewCardTrigger href="#preview" delay={0} closeDelay={100}>{text("Hover for preview", "悬停查看预览")}</PreviewCardTrigger><PreviewCardContent><strong>Agent UI CSS</strong><p className="appica-compact-copy">{text("Reusable interface building blocks.", "可复用的界面基础组件。")}</p></PreviewCardContent></PreviewCard>,
    progress: <Progress value={68}><ProgressLabel>{text("Building", "正在构建")}</ProgressLabel><ProgressValue /></Progress>,
    radio: <RadioGroup className="appica-centered-control" defaultValue="a" aria-label={text("Plan", "方案")}><label className="appica-control-line"><Radio value="a" />{text("Starter", "入门版")}</label><label className="appica-control-line"><Radio value="b" />{text("Pro", "专业版")}</label></RadioGroup>,
    "radio-group": <RadioGroup className="appica-centered-control" defaultValue="balanced" orientation="horizontal" aria-label={text("Model", "模型")}><label className="appica-control-line"><Radio value="fast" />{text("Fast", "快速")}</label><label className="appica-control-line"><Radio value="balanced" />{text("Balanced", "均衡")}</label></RadioGroup>,
    "scroll-area": <ScrollArea className="appica-scroll-demo" scrollShadow><p>{text("Design tokens", "设计令牌")}</p><p>{text("Accessible primitives", "无障碍基础组件")}</p><p>{text("Motion settings", "动效设置")}</p><p>{text("Theme provider", "主题提供器")}</p><p>{text("RTL support", "从右到左支持")}</p><p>{text("Keyboard navigation", "键盘导航")}</p></ScrollArea>,
    select: <Select defaultValue="balanced"><SelectTrigger aria-label={text("Model", "模型")}><SelectValue placeholder={text("Choose model", "选择模型")}>{text("Balanced", "均衡")}</SelectValue></SelectTrigger><SelectContent><SelectItem value="fast">{text("Fast", "快速")}</SelectItem><SelectItem value="balanced">{text("Balanced", "均衡")}</SelectItem><SelectItem value="deep">{text("Deep", "深度")}</SelectItem></SelectContent></Select>,
    separator: <div className="appica-separator-demo"><span>{text("Before", "上方")}</span><Separator /><span>{text("After", "下方")}</span></div>,
    skeleton: <div className="appica-skeleton-demo"><Skeleton className="h-10 w-10 rounded-full" /><div><Skeleton className="mb-2 h-3 w-32" /><Skeleton className="h-3 w-20" /></div></div>,
    slider: <Slider defaultValue={64} thumbAriaLabel={text("Intensity", "强度")} />,
    sparkline: <Sparkline data={[12, 18, 14, 26, 22, 34, 31]} labels={language === "zh" ? ["周一", "周二", "周三", "周四", "周五", "周六", "周日"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}><SparklineLabel /><SparklineValue /><SparklineChart variant="area" /></Sparkline>,
    spinner: <div className="appica-preview-row"><Spinner variant="circular" aria-label={text("Loading", "正在加载")} /><Spinner variant="dots" aria-label={text("Loading", "正在加载")} /><Spinner variant="sparkle" aria-label={text("Loading", "正在加载")} /></div>,
    switch: <div className="appica-control-line"><Switch defaultChecked aria-label={text("Notifications", "通知")} /><span>{text("Notifications", "通知")}</span></div>,
    table: <Table size="sm"><TableHeader><TableRow><TableHead>{text("Model", "模型")}</TableHead><TableHead>{text("Status", "状态")}</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>{text("Swift", "快速")}</TableCell><TableCell>{text("Ready", "就绪")}</TableCell></TableRow><TableRow><TableCell>{text("Deep", "深度")}</TableCell><TableCell>{text("Queued", "排队中")}</TableCell></TableRow></TableBody></Table>,
    tabs: <Tabs className="appica-tabs-demo" defaultValue="preview"><TabsList><TabsTrigger value="preview">{text("Preview", "预览")}</TabsTrigger><TabsTrigger value="code">{text("Code", "代码")}</TabsTrigger></TabsList><TabsContent value="preview"><p className="appica-compact-copy">{text("Live component result", "组件实时效果")}</p></TabsContent><TabsContent value="code"><code>&lt;Component /&gt;</code></TabsContent></Tabs>,
    "text-animate": <TextAnimate effect="typewriter" duration={2}>{text("Thoughtful interfaces, built to move.", "用心构建，自然流动的界面。")}</TextAnimate>,
    textarea: <Textarea placeholder={text("Describe the task…", "描述任务…")} aria-label={text("Describe the task", "描述任务")} />,
    thumbnail: <div className="appica-preview-row"><Thumbnail size="lg" variant="icon-soft">✦</Thumbnail><Thumbnail shape="circle" variant="icon-soft">AI</Thumbnail></div>,
    "time-field": <TimeField defaultValue="09:30" />,
    toast: <ToastProvider><ToastDemo language={language} /><Toaster position="top-center" /></ToastProvider>,
    toc: <Toc><TocList><TocItem><TocLink href="#intro">{text("Introduction", "简介")}</TocLink></TocItem><TocItem><TocLink href="#usage">{text("Usage", "使用方法")}</TocLink></TocItem><TocItem><TocLink href="#api" depth={2}>{text("API reference", "API 参考")}</TocLink></TocItem></TocList></Toc>,
    toggle: <div className="appica-preview-row"><Toggle defaultPressed aria-label={text("Bold", "粗体")} render={<Button variant="outline" size="icon-sm"><strong>B</strong></Button>} /><Toggle aria-label={text("Italic", "斜体")} render={<Button variant="outline" size="icon-sm"><em>I</em></Button>} /></div>,
    "toggle-group": <ToggleGroup className="appica-centered-control" aria-label={text("Alignment", "对齐方式")} defaultValue={["center"]}><Toggle value="left" aria-label={text("Left", "左对齐")} render={<Button variant="outline" size="icon-sm">L</Button>} /><Toggle value="center" aria-label={text("Center", "居中")} render={<Button variant="outline" size="icon-sm">C</Button>} /><Toggle value="right" aria-label={text("Right", "右对齐")} render={<Button variant="outline" size="icon-sm">R</Button>} /></ToggleGroup>,
    toolbar: <Toolbar className="appica-centered-control" aria-label={text("Formatting", "格式工具")}><ToolbarGroup aria-label={text("Text style", "文字样式")}><ToolbarButton render={<Button variant="ghost">{text("Bold", "粗体")}</Button>} /><ToolbarButton render={<Button variant="ghost">{text("Italic", "斜体")}</Button>} /></ToolbarGroup><ToolbarSeparator /><ToolbarLink href="#help">{text("Help", "帮助")}</ToolbarLink></Toolbar>,
    tooltip: <TooltipProvider delay={0}><Tooltip><TooltipTrigger render={<Button variant="outline">{text("Hover me", "悬停查看")}</Button>} /><TooltipContent>{text("Helpful context", "补充说明")}</TooltipContent></Tooltip></TooltipProvider>,
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
      <a href="/" className="appica-brand"><img src="/favicon.svg" alt="" /><strong>Agent UI CSS</strong><span>/ {language === "zh" ? "通用组件" : "Appica collection"}</span></a>
      <div className="appica-header-actions"><a href="/">{copy.back}</a><button onClick={() => setLanguage(language === "zh" ? "en" : "zh")}>{language === "zh" ? "EN" : "中文"}</button><button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? (language === "zh" ? "深色" : "Dark") : (language === "zh" ? "浅色" : "Light")}</button></div>
    </header>

    <AppicaGallery language={language} />
  </main>;
}

export function AppicaGallery({ language }: { language: AppicaCatalogLanguage }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => groups.map((group) => ({
    ...group,
    items: group.items.filter((item) => `${item.name} ${item.zh}`.toLowerCase().includes(query.trim().toLowerCase())),
  })).filter((group) => group.items.length > 0), [query]);

  const copy = language === "zh" ? {
    eyebrow: "APPICA UI · MIT 组件合集",
    title: "通用界面组件",
    body: "从按钮、表单到弹窗、导航和数据展示，64 个组件都在这里直接运行，也是这个网站正在使用的界面基础。",
    search: "搜索 64 个组件…",
    source: "查看源码",
    count: "个组件",
    empty: "没有找到匹配的组件。",
    notice: "Appica UI React © Appica UI，依据 MIT License 使用与再分发。",
    notices: "第三方声明",
    stats: ["组件", "源码文件", "运行时基础", "许可证"],
  } : {
    eyebrow: "APPICA UI · MIT COLLECTION",
    title: "General interface components",
    body: "From buttons and forms to dialogs, navigation, and data display: 64 live components that also power this website's own interface.",
    search: "Search 64 components…",
    source: "View source",
    count: "components",
    empty: "No matching components found.",
    notice: "Appica UI React © Appica UI, used and redistributed under the MIT License.",
    notices: "Third-party notices",
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
          <div className="appica-card-preview"><Preview slug={item.slug} language={language} /></div>
          <footer><div><strong>{language === "zh" ? item.zh : item.name}</strong><small>{language === "zh" ? group.zh : item.slug}</small></div><a href={`https://github.com/zhaoxinyi02/agent-ui-css/tree/main/vendor/appica-ui-react/src/components/${item.slug}`}>{copy.source} ↗</a></footer>
        </article>)}</div>
      </section>)}
      {filtered.length === 0 && <div className="appica-empty">{copy.empty}</div>}
    </section>
    <footer className="appica-license"><span>{copy.notice}</span><a href="https://github.com/zhaoxinyi02/agent-ui-css/blob/main/THIRD_PARTY_NOTICES.md">{copy.notices} ↗</a></footer>
  </section>;
}
