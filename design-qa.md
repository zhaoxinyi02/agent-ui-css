# Design QA — Agent UI CSS showcase and catalog

- Hero source direction: `.audit/2026-08-09-refinement/07-local-final-hero.png`
- Catalog source truth: `.design-qa/source-aicss.png`
- Current implementation: `.design-qa/hero-final.png`
- Hero comparison: `.design-qa/hero-comparison-side.png`
- Catalog comparison: `.design-qa/comparison-final.png`
- Primary desktop viewport: approximately 1280 × 720 CSS pixels, DPR 2
- State: light theme, Hero at page top, live component preview expanded
- Density normalization: the hero comparison scales both desktop captures to equal-width panels; the catalog comparison uses equal 1280 × 720 captures

## Full-view comparison evidence

The earlier Hero established an editorial type direction but did not demonstrate the component library. The refined Hero keeps the display typography and restrained blue accent while using the right half of the viewport for a live Thinking + Reasoning, Task List, and Agent Input composition. The entire Hero remains within the first desktop viewport and the catalog follows directly below it.

The catalog remains grounded in the measured AICSS public layout: 52.5px sticky header, 24px page margin, 24px grid gap, 604 × 345px cards, 280px preview stages, 65px metadata rows, 12px radii, and restrained half-pixel shadows. Branding, copy, component code, and interaction details remain original.

## Focused-region comparison evidence

- Hero: the side-by-side comparison keeps both complete desktop frames visible together. The new right-hand preview replaces empty informational space with functioning components, improving product demonstration without adding a decorative image asset.
- Catalog: browser-computed measurements match the source card and stage geometry exactly at 1280px width.
- No photographic, illustrative, or externally sourced brand asset is required by the selected implementation.

## Required fidelity surfaces

- Fonts and typography: Inter/system UI typography is retained for controls and catalog metadata; the Hero uses a large 500-weight sans-serif display line with a restrained serif emphasis. Wrapping remains balanced across three lines.
- Spacing and layout rhythm: the Hero uses a two-column presentation with aligned optical centers and stays within one desktop viewport. Catalog geometry remains unchanged from the previously passed measured comparison.
- Colors and tokens: white surfaces, `#1a1a1a` foreground, muted gray copy, `#e6e8ec` borders, and a single desaturated blue accent maintain the established token system.
- Image quality and asset fidelity: no raster hero art or replacement illustration is used. The preview is made from the actual reusable components being demonstrated.
- Copy and content: the headline communicates the product category; supporting copy names the agent behaviors covered; counts and licensing claims match the repository.
- States and interactions: Browse Components scrolls to `#components`; the wordmark returns to `#top`; reasoning, task disclosure, model selection, enhancer, and composer controls remain interactive.
- Accessibility: semantic headings, navigation labels, focus styles, disabled states, and reduced-motion rules remain present.

## Comparison history

### Catalog pass 1 — blocked

- P1: the original oversized marketing composition pushed all components below the fold.
- P2: catalog geometry was not measured against the reference.
- Fix: rebuilt the catalog to the source's measured layout.

### Catalog pass 2 — blocked

- P2: horizontal gap produced 606px cards rather than 604px cards; reasoning content was too heavy.
- Fix: matched the 24px gap and exact card coordinates, then simplified the reasoning component.

### Catalog pass 3 — passed

- No actionable P0, P1, or P2 desktop catalog differences remained.

### Hero restoration pass — passed

- User clarified that the project is a showcase and should retain a marketing Hero.
- The restored Hero demonstrates real components rather than using decorative filler.
- CTA hierarchy, first-screen fit, typography, stats, and live preview were visually inspected together.
- No actionable P0, P1, or P2 issues remain for the selected desktop Hero.

## Primary interactions tested

- Browse Components: navigated to `#components` and exposed the Thinking & Reasoning heading.
- Wordmark: returned to `#top` and restored the Hero.
- Fresh page console: no errors or warnings.
- Production type check and build: passed.

## Evidence limits

The in-app browser continues to ignore requested mobile viewport overrides and reports 1280px width, so mobile visual QA is not claimed in this pass. Responsive CSS remains implemented for widths below 760px.

## Follow-up polish

- P3: run a mobile-only visual pass when viewport emulation is available.

final result: passed
