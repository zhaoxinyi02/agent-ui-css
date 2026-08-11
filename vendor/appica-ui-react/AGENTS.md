# `@appica/ui-react` component agent guide

This package is a React component library built on three foundations: React 19+, Base UI (`@base-ui/react`), and Motion (formerly Framer Motion). When you build, edit, or refactor a component in this directory, follow the workflow below — every time, no exceptions.

## Stack pin

- React `^19.0.0` — use modern patterns (ref-as-prop, no `forwardRef`, `useId`, `useTransition`, etc.).
- `@base-ui/react` `^1.6.0` — **NOT** `@base-ui-components/react` (that was the pre-GA name; switched 2026-05-06).
- Tailwind v4, TypeScript 6 (`ignoreDeprecations: "6.0"` is required in `tsconfig.json`).
- Test stack: vitest jsdom + @testing-library/react + user-event + vitest-axe. `globals: false` — `cleanup()` is wired manually in [src/test/setup.ts](src/test/setup.ts).

## Workflow when building or editing a component

1. **Load `vercel-react-best-practices`** via the Skill tool before writing any new component or doing a non-trivial refactor. Apply its rendering, re-render, and bundle rules to the implementation.
2. **Load `motion`** via the Skill tool whenever the component has motion/animation requirements: enter/exit transitions beyond CSS, gestures (drag/hover/tap/pan), scroll-linked effects, layout animations (FLIP), or shared-element transitions. Skip it for plain CSS hover/focus.
3. **Consult Base UI before wrapping a primitive.** Read [.context/base-ui-llms.txt](.context/base-ui-llms.txt) first — it's a snapshot of `https://base-ui.com/llms.txt` (date in the file header). If the snapshot is missing the part you need or appears outdated, WebFetch the live URL or the linked component page. Never invent a Base UI prop or sub-component name from memory.

## Component conventions

Inferred from [src/components/button/button.tsx](src/components/button/button.tsx) — match this exactly unless you have a documented reason to deviate.

- **Folder layout:** `src/<name>/` containing `<name>.tsx` and `<name>.test.tsx`. Add an `index.ts` barrel **only when the folder needs to expose more than one module** — e.g. a server-safe utility (`cva` variants, pure helpers) next to a `'use client'` component, or a context module next to its provider. Drop-in folders with a single component file don't need a barrel: `scripts/sync-exports.mjs` resolves `<name>.tsx` directly. When a barrel exists, `sync-exports.mjs` automatically routes the subpath through `index.ts`, which lets server and client modules in the folder retain their distinct `'use client'` boundaries.
- **`*Group` companions:** decide by *how* the Group injects state, not by file count.
  - **cloneElement-based groups** (e.g. `KbdGroup` in [src/components/kbd/kbd.tsx](src/components/kbd/kbd.tsx), `AvatarGroup` in [src/components/avatar/avatar.tsx](src/components/avatar/avatar.tsx)) — Group is just a styled wrapper that `React.cloneElement`s children to forward size/shape defaults. **Co-locate in the same file** as the base primitive; do not create a separate `<name>-group/` folder.
  - **Context-based groups** (e.g. `RadioGroup`, `CheckboxGroup`, `ButtonGroup`) — Group is a Provider with shared state, refs, or keyboard handling. **Keep in a separate `<name>-group/` folder** so the provider boundary stays explicit and the subpath import (`@appica/ui-react/<name>-group`) is meaningful.
- **Wrap a Base UI primitive** rather than handrolling. Component props extend `ComponentPropsWithoutRef<'button'>` (or the appropriate element).
- **Theme via CSS variables only** — `var(--color-…)`, `var(--radius-…)`, `var(--transition-…)`. Never hardcode hex colors, px radii, or duration values.
- **Class-list pattern:** use the shared `cn(...)` helper from [src/utils.ts](src/utils.ts) (wraps `clsx` + `tailwind-merge`). It deduplicates conflicting Tailwind classes and supports conditional/array inputs — prefer it over manual array+join concatenation.
- **Tailwind v4 syntax:** prefer the v4 variant shorthand over arbitrary-selector escape hatches. Use `*:` for direct children, `**:` for descendants, and `data-[attr=value]:` / `data-attr:` for data attributes. Example: write `**:data-[slot=navigation-link-indicator]:opacity-0` — not `[&_[data-slot='navigation-link-indicator']]:opacity-0`. Use `not-{variant}:` for negation (e.g. `not-hover:`) and named `group/name` + `group-{state}/name:` for scoped sibling/ancestor reactions. The arbitrary `[&_...]` form is only acceptable when no built-in variant can express the selector (e.g. tag-name descendants like `[&_svg]:`).
- **Variant/size maps:** `Record<Variant, string>` constants outside the component, indexed by prop value. Don't inline conditional class strings.
- **Exports — minimal surface:** only export what consumers actually need. The default set is the component(s) and their `*Props` types — for example `export { Chip, ChipGroup }` + `export type { ChipProps, ChipGroupProps, ChipGroupHandle }`. Do **NOT** export internal `cva` variants (`chipSizeVariants`), the variant/size string-literal unions (`ChipVariant`, `ChipSize`), or other implementation details. The exceptions are components whose variants are deliberately reused elsewhere (`buttonVariants` from [src/components/button/button-variants.ts](src/components/button/button-variants.ts), `inputVariants` from [src/components/input/input-variants.ts](src/components/input/input-variants.ts)) — those are extracted into a separate file and exported via `index.ts`. If a consumer needs a variant union, they can derive it from `ComponentProps<typeof Component>['variant']`. When in doubt, leave it unexported; you can always add the export later if a real need surfaces.
- **Exports — wiring:** don't edit `src/index.ts` or the `exports` map in [package.json](package.json) by hand. Run `pnpm sync-exports` (also runs automatically via `prebuild`/`prepack`) — the script regenerates both from the folder tree and prefers `index.ts` over `<name>.tsx` when both exist.

## Tests

- Co-locate `<name>.test.tsx` next to the component.
- Use @testing-library/react + user-event for interaction. Use vitest-axe for an accessibility smoke test on the rendered component.
- Test the public API (props, accessibility, user interactions) — not internal class strings.
- **userEvent clipboard:** `userEvent.setup()` replaces `navigator.clipboard`, so spy with `vi.spyOn(navigator.clipboard, …)` **after** `setup()` runs — not in a `beforeEach` that runs before it.

## Consumer composition: `className` on render-prop wrappers

For any wrapper that uses Base UI's `useRender` (`DropdownMenuTrigger`, `PopoverTrigger`, `TooltipTrigger`, `SelectTrigger`, our `BreadcrumbLink`, `PaginationLink`, `NavigationLink`, etc.), put consumer style overrides on the **wrapper**, not on the JSX passed to `render`:

```tsx
// ✅ Do — className lives on the wrapper
<DropdownMenuTrigger
  className="text-foreground-muted size-7 rounded-xs"
  render={<Button size="icon-sm" variant="ghost"><Icon /></Button>}
/>

// ❌ Don't — className on the render-prop JSX
<DropdownMenuTrigger
  render={<Button className="text-foreground-muted size-7 rounded-xs" …>…</Button>}
/>
```

The "don't" form triggers a **React 19 hydration mismatch** when the consuming page is a Server Component (the default in `docs/app/*` — no `'use client'`). The `<Button className="X">` JSX is constructed on the server, serialized over the RSC boundary, reconstructed on the client, and then `cloneElement`d by Base UI's `useRender`. SSR HTML and CSR render end up producing different final class strings on the underlying element. Confirmed by repro 2026-05-27 in [docs/app/page.tsx](../../docs/app/page.tsx) (Breadcrumb collapsed-with-dropdown demo) — adding `'use client'` to the page eliminated the error with the same JSX, isolating the cause to RSC + render-prop cloneElement.

Putting `className` on the wrapper bypasses this: it lands in the wrapper's own props inside `useRenderElement` before any cloneElement happens, so server and client agree.

**Rule of thumb when composing:**
- **Visual overrides (className, style)** → on the wrapper.
- **Structural/behavioral props (size, variant, href, type, render-as-different-element)** → keep on the JSX inside `render`. Those don't trigger the bug.
- **Need className on the inner element specifically?** Extract the trigger into its own `'use client'` component rather than promoting the whole page to `'use client'`.

Class precedence still works through `cn(twMerge)`: the wrapper's `className` lands last in the inner component's `cn(...)` call and wins for conflicts.

When designing a new wrapper, make sure it accepts and forwards `className` itself (don't only rely on `render`) so consumers have this escape hatch.

## Floating `*Content` components (Portal → Positioner → Popup)

Any component whose `*Content` wraps a Base UI `Portal → Positioner → Popup` trio (Popover, Tooltip, PreviewCard, Menu, Select, Combobox, Autocomplete, …) must use the shared helper in [src/floating.ts](src/floating.ts) — do **not** hand-roll a `Pick<…Positioner, …>` list per component. That ad-hoc approach drifted: most components only forwarded `side/sideOffset/align/alignOffset`, silently dropping `collisionPadding`, `collisionBoundary`, `collisionAvoidance`, `anchor`, `sticky`, `arrowPadding`, `container`, `keepMounted`, etc. Consumers can't reach the inner Portal/Positioner directly, so the `*Content` is the **only** place those props can be mapped.

Pattern:
- **Type:** `type XContentProps = React.ComponentProps<typeof X.Popup> & FloatingContentProps<React.ComponentProps<typeof X.Positioner>, React.ComponentProps<typeof X.Portal>> & { /* component extras */ }`. `FloatingContentProps` promotes the common Positioner/Portal props to flat props (derived from the component's own Base UI types, so it stays in lockstep) and adds typed `positionerProps` / `portalProps` escape hatches for the long tail (`style`, `render`, …).
- **Body:** `const { positioner, portal, popup } = splitFloatingProps(props)` after destructuring `className`/`children`/component-specific props. Spread `{...portal}` on Portal, `{...popup}` on Popup. On Positioner, write component defaults as plain attributes **before** `{...positioner}` (so consumer values win), and merge the fixed stacking class via `className={cn('isolate z-50', positioner.className as string | undefined)}`.
- `className`/`style`/`render` are intentionally **not** flat props — `*Content` represents the Popup, so those bind to it. Reach the Positioner/Portal element via the escape hatches.

`navigation-menu` is the exception: its positioner is rendered internally by the Root, not consumer-facing, so it doesn't use this helper.

## Modal `*Content` components (Portal → Backdrop → Viewport → Popup)

`dialog`, `alert-dialog`, and `drawer` wrap a Base UI `Portal → Backdrop → Viewport → Popup` structure inside a single `*Content`. Same problem as the floating components — `...props` reaches only the Popup, so the Portal/Backdrop/Viewport must be mapped explicitly. Use the sibling helper in [src/modal.ts](src/modal.ts):

- **Type:** `type DialogContentProps = ModalContentProps<Popup, Portal, Backdrop, Viewport> & { /* extras */ }`, where each type arg is `React.ComponentProps<typeof BaseDialog.{Popup,Portal,Backdrop,Viewport}>`. `ModalContentProps` promotes `container`/`keepMounted` to flat props and adds `portalProps` / `backdropProps` / `viewportProps` escape hatches.
- **Body:** `const { portal, popup } = splitModalProps(props)` after destructuring `className`/`children`/`backdropProps`/`viewportProps` and component-specific props (`backdrop`, `closeButton`, …). Spread `{...portal}` on Portal and `{...popup}` on Popup. On Backdrop/Viewport, spread `{...backdropProps}` / `{...viewportProps}` **before** the fixed `className`, then merge the consumer class via `className={cn('…fixed classes…', backdropProps?.className as string | undefined)}` (the `backdrop` boolean still gates whether the Backdrop renders).

`toast` is a lighter case (Portal → Viewport, no Backdrop/Popup): `Toaster` just exposes flat `container` + `portalProps` and forwards the rest to the Viewport.

## Folded single-element components — escape hatches for the inner element

When a component folds several Base UI parts into one styled element (so the inner element isn't a separate export), expose a typed `<element>Props` escape hatch so consumers can still reach it: e.g. `number-field` forwards Root props via the spread and adds `inputProps` for the inner `NumberField.Input`; `scroll-area` adds `viewportProps` for the inner `ScrollArea.Viewport`. Spread the escape hatch **before** the component's controlled handlers/classes (so the component's behavior wins) and merge `className` via `cn(…, <element>Props?.className)`.

## Build / verify

Run from the repo root or this package:

- `pnpm --filter @appica/ui-react test` — vitest
- `pnpm --filter @appica/ui-react build` — tsc + rollup, produces `dist/`
- `pnpm --filter @appica/ui-react typecheck` — `tsc --noEmit`

A component task is not done until tests pass and the build emits the new component's ESM-only `.js` + `.d.ts` correctly.

## Quick-reference gotchas

Terse rules distilled from past fixes; the linked file is the canonical example. (The team's Claude memory holds the full rationale.)

- **Base UI import alias:** wrap primitives as `Base<Name>` (e.g. `import { Switch as BaseSwitch }`), not `<Name>Primitive`.
- **`'use client'` only when needed:** a pure Base UI wrapper stays server-safe; add the directive only when the wrapper itself calls hooks or Motion.
- **Field-like error/disabled state:** field-like inputs both (a) bridge a standalone `aria-invalid` → `data-invalid` (strict check: `aria === true || aria === 'true'`) and (b) inherit `invalid`/`disabled`/`name` from Base UI Field context via `useFieldRootContext(true)` (from `@base-ui/react/internals/field-root-context`). When wrapping a Field-aware Base UI Root, add the attribute via a conditional spread **after** the prop spread — `{...(invalid ? { 'data-invalid': '' } : {})}` — so you don't clobber the context-provided value with `undefined`. Done in Switch, Checkbox, Radio, OTPField, Input, Textarea, NumberField, DateField, TimeField, DatePicker, Select (on `SelectTrigger`), Combobox (on `ComboboxInput`'s InputGroup).
- **Labeling a `role="group"`** (RadioGroup, ToggleGroup, DateField/TimeField segment groups): name it with `aria-labelledby`, not `FieldLabel` / `<label htmlFor>` (those emit `<label for>`, which doesn't associate with a group).
- **CSS-only animations:** use the `motion-safe:` Tailwind variant rather than `useReducedMotion` when the only effect is toggling transition classes.
- **Motion mount-guard:** squish/toggle animations must compare a *previous-value ref*, not `isFirstRender`, or they replay on a fresh mount (StrictMode / popover remount).
- **Nested dialog backdrop:** Base UI hides a nested dialog's backdrop; force it with `backdropProps={{ forceRender: true }}` when the host modal is backdrop-less.
- **Floating + modal surfaces all stay `z-50`** so nested popups inside dialogs/drawers stack by DOM order; don't raise modals above the floating layer.
- **ScrollArea layout:** Root is `flex flex-col` and Viewport is `flex-1 min-h-0` (not `h-full`), so it scrolls inside max-height/flex parents without a definite-height ancestor.
- **Links are not Buttons:** for a link styled as a button, put `buttonVariants(...)` on the `<a>` — never `<Button render={<a/>}>`. `nativeButton={false}` is only for rendering Button as a non-button element (div/span).
- **Theme tokens (Tailwind v4):** `:root` custom props referenced *only* by generated utilities can get purged — use spacing literals or `@theme static`. `@theme inline` inlines the raw token, so reference `var(--primary)` (not `var(--color-primary)`) unless a `--color-*` alias is defined in [styles.css](styles.css).
- **Grayscale palette is user-facing "Base color"** (not "Neutral", to avoid the Tailwind `neutral` clash); the internal type stays `NeutralColor`.
