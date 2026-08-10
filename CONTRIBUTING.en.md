# Contributing

[简体中文](./CONTRIBUTING.md)

Thank you for helping improve Agent UI CSS. Issues, documentation fixes, component proposals, and pull requests are welcome.

## Before you start

- Search existing issues before opening a duplicate.
- Open an issue first for large features or public API changes.
- Only submit code and assets you have the right to license under MIT.
- Do not copy proprietary libraries, paid source code, brand icons, or restricted assets.

## Local development

```bash
git clone https://github.com/zhaoxinyi02/agent-ui-css.git
cd agent-ui-css
npm install
npm run dev
```

Run these checks before submitting:

```bash
npm run check
npm run build
npm run build:site
```

## Conventions

- Keep components lightweight and avoid runtime UI dependencies beyond React.
- Prefix public CSS classes with `aui-`.
- Expose user-visible strings as props instead of hard-coding English into interactions.
- Preserve semantic HTML, keyboard access, and appropriate ARIA information.
- Make animation respect `prefers-reduced-motion`.
- Update both READMEs when public behavior changes.

## Pull requests

Keep each pull request focused. Include:

- What changed and why
- Any user-visible or public API impact
- Validation commands you ran
- Before and after screenshots for visual changes

By submitting a pull request, you agree that your contribution may be distributed under this repository's MIT License.
