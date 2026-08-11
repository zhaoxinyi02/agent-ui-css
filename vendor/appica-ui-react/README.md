[![Appica UI for React](https://raw.githubusercontent.com/appica-dev/appica-ui/main/.github/assets/appica-ui-react.jpg)](https://appica.dev/ui)

[![npm](https://img.shields.io/npm/v/@appica/ui-react)](https://www.npmjs.com/package/@appica/ui-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)
[![Figma](https://img.shields.io/badge/Figma-design_file-F24E1E?logo=figma&logoColor=white)](https://www.figma.com/community/file/1657080448204231925)

A modern React component library — 60+ accessible, themeable components built on [Base UI](https://base-ui.com) primitives, animated with [Motion](https://motion.dev), and styled with Tailwind CSS v4 design tokens.

**[Documentation](https://appica.dev/ui) · [Installation guide](https://appica.dev/ui/docs/react/installation) · [Components](https://appica.dev/ui/components/react/button)**

## Prerequisites

| Dependency   | Version  |
| ------------ | -------- |
| React        | `>= 19`  |
| React DOM    | `>= 19`  |
| Tailwind CSS | `>= 4.0` |

React 19 is a hard requirement — components use the modern ref-as-prop API with no `forwardRef` shims. Tailwind v4 must be set up and compiling in your project first; Appica UI relies on your project's Tailwind to compile the component styles.

## Installation

```bash
npm install @appica/ui-react
# or
yarn add @appica/ui-react
# or
pnpm add @appica/ui-react
# or
bun add @appica/ui-react
```

## Configure Tailwind

Import the design tokens after Tailwind in your global stylesheet, and add a `@source` directive so Tailwind scans the compiled library for class names:

```css
@import 'tailwindcss';
@import '@appica/ui-react/styles.css';

@source '@appica/ui-react';
```

Without `@source`, Tailwind skips `node_modules` and the components render unstyled. On Tailwind < 4.2, use a relative path instead: `@source '../node_modules/@appica/ui-react/dist'`.

## Add the provider

Wrap your app in `ThemeProvider` to enable theming and dark mode with no flash of the wrong theme:

```tsx
import { ThemeProvider } from '@appica/ui-react/providers/theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

## Use a component

Import components from their subpath for the smallest bundle:

```tsx
import { Button } from '@appica/ui-react/button'

export default function App() {
  return <Button>Get started</Button>
}
```

See the [installation guide](https://appica.dev/ui/docs/react/installation) for framework-specific notes (Next.js, Vite, TanStack Start, Remix, Astro), and [Theming](https://appica.dev/ui/docs/react/theming) to customize colors, radii, and tokens.

## Figma design file

Every component is also available as a free [Figma design file](https://www.figma.com/community/file/1657080448204231925) — variants, sizes, and states mirrored one-to-one with the code, built on the same design tokens. Design and develop from a single source of truth.

## Stay updated

Follow [@Appica_dev](https://x.com/Appica_dev) on X for release announcements and updates.

## License

MIT © [Appica](https://appica.dev)

Free to use in personal and commercial projects.
