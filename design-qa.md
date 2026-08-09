# Design QA — Agent UI CSS catalog

- Source visual truth: `.design-qa/source-aicss.png`
- Source full-page capture: `.design-qa/source-aicss-full.png`
- Implementation: `.design-qa/implementation-final-clean.png`
- Implementation full-page capture: `.design-qa/implementation-final-full.png`
- Combined comparison: `.design-qa/comparison-final.png`
- Viewport: 1280 × 720 CSS pixels
- Source pixels: 1280 × 720; implementation pixels: 1280 × 720
- Device pixel ratio: 2 for both browser captures
- Density normalization: none required; both captures came from the same browser and viewport
- State: light theme, first catalog section visible, Thinking + Reasoning expanded

## Full-view comparison evidence

The combined comparison shows the source and implementation in a single image at the same crop and scale. The implementation now matches the source catalog's dominant composition: 52.5px sticky header, immediate category heading, two-column card grid, 24px page margin, 24px grid gap, 604 × 345px cards, 280px preview stages, 65px metadata rows, 12px radii, and restrained half-pixel shadow treatment.

The implementation intentionally retains its own wordmark, calls to action, component content, and source code. It does not reproduce AICSS brand assets or licensed component code.

## Focused-region comparison evidence

The first two component cards were measured in browser-computed CSS and compared at full resolution:

- Source card: x 24, y 159.84, width 604, height 345
- Implementation card: x 24, y 159.84, width 604, height 345
- Source stage: width 604, height 280, padding 28
- Implementation stage: width 604, height 280, padding 28
- Source heading: x 24, y 111.84, 16px/24px, weight 500
- Implementation heading: x 24, y 111.84, 16px/24px, weight 500

No separate crop was necessary because the 1280px combined comparison keeps header, section heading, card edges, preview content, and metadata typography readable at original resolution.

## Required fidelity surfaces

- Fonts and typography: Inter/system stack, 425 body weight, 500 section heading weight, compact 14px card titles, and 12px metadata reproduce the source hierarchy. The independent wordmark is an intentional brand deviation.
- Spacing and layout rhythm: desktop frame, margins, card dimensions, stage height, metadata height, radii, gaps, and above-the-fold density match the measured source geometry.
- Colors and tokens: white background, `#1a1a1a` text, `#a1a1a1` secondary text, `#e6e8ec` dividers, and low-opacity card shadows follow the measured public CSS tokens.
- Image quality and asset fidelity: the target screen contains no required photographic or illustrative assets. AICSS logos and icons were intentionally not copied; Agent UI CSS uses its own text wordmark and existing component icon primitives.
- Copy and content: all implementation copy is original and appropriate to the independent component library.
- States and interactions: Thinking + Reasoning was verified in expanded and collapsed states and restored to the source comparison state. Fresh-server console inspection returned no errors or warnings.
- Accessibility: explicit focus styles and reduced-motion behavior are present. The selected desktop target has no visible overflow.

## Comparison history

### Pass 1 — blocked

- P1: the marketing hero displaced the component catalog below the fold, materially changing the target's information hierarchy.
- P2: card width, horizontal gap, section start position, preview sizing, and metadata rhythm were not locked to the source measurements.
- Fixes: removed the marketing hero and category toolbar; rebuilt the page around the measured catalog geometry and token values.

### Pass 2 — blocked

- P2: the grid used a 20px horizontal gap, producing 606px cards instead of the source's 604px cards.
- P2: the expanded reasoning preview was too wide and visually heavy.
- Fixes: set a 24px grid gap, adjusted the catalog top padding to 59.34px, narrowed the reasoning content, and simplified its open-state styling.

### Pass 3 — passed

- Desktop geometry matches the source measurements.
- Component content and branding differences are intentional and preserve the independent library.
- No actionable P0, P1, or P2 differences remain for the selected desktop target.
- Remaining gap: the in-app browser ignored the requested mobile viewport override and continued reporting 1280 × 720, so mobile visual QA remains unverified rather than claimed.

## Primary interactions tested

- Thinking + Reasoning: expanded → collapsed (`Thought for 8s`) → expanded.
- Header documentation and GitHub controls: valid links present.
- Fresh-server console: no errors or warnings.

## Follow-up polish

- P3: run a separate mobile visual QA pass when a browser surface honors viewport emulation.

final result: passed
