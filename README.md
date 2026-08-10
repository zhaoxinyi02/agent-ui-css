# Agent UI CSS

Original, dependency-light React components for AI and agent interfaces. The library includes thinking states, tool activity, streaming output, citations, tables, diffs, task progress, media generation, agent input, and a small SVG icon set.

**Live demo:** [au.lansuan.cc](https://au.lansuan.cc/)

> Independent open-source project. This repository is not affiliated with, endorsed by, or sourced from AICSS. It was written from scratch after reviewing public interaction-pattern descriptions. No AICSS logo, paid source code, or proprietary asset is included.

## Components

- Thinking State
- Thinking + Reasoning
- Orbs
- Web Search
- File Diff
- Image Generation
- Text Response
- Streaming Text
- Inline Citations
- Code Block
- To-do List
- Data Table
- Comparison Table
- AI Agent Input
- `Icon` with 13 original SVG primitives

## Quick start

Until the package is published to npm, install from GitHub:

```bash
npm install github:zhaoxinyi02/agent-ui-css
```

Import a component and the shared stylesheet:

```tsx
import { ThinkingState, AgentInput } from "agent-ui-css";
import "agent-ui-css/styles.css";

export function Chat() {
  return (
    <div>
      <ThinkingState label="Planning" />
      <AgentInput models={["Fast", "Deep"]} onSubmit={console.log} />
    </div>
  );
}
```

## Theming

Override CSS custom properties near your application root:

```css
.my-product {
  --aui-accent: #2563eb;
  --aui-accent-soft: #dbeafe;
  --aui-radius: 12px;
  --aui-font: Inter, sans-serif;
}
```

The `.aui-auto-theme` class enables the included dark color tokens when the operating system prefers dark mode.

## Local development

```bash
npm install
npm run dev
npm run check
npm run build
npm run build:site
```

## Design and accessibility notes

- Components use semantic HTML where practical.
- Expandable controls expose `aria-expanded`.
- Status components expose live/status semantics.
- Motion is decorative and does not prevent interaction.
- The library has no runtime UI dependency beyond React.
- Styles are plain CSS and all public classes are prefixed with `aui-`.

## License

MIT. See [LICENSE](./LICENSE).
