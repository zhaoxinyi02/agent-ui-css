import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

// Focused lint: the React Hooks rules (incl. the react-compiler rule) that `tsc`
// can't catch. Deliberately not the full JS/TS style recommended set — Prettier
// owns formatting and `typecheck` owns types.
export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', '*.config.mjs', 'scripts/**', '**/*.test.{ts,tsx}', 'src/test/**'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    linterOptions: {
      // Disable directives in the source target other lint configs (e.g. no-console);
      // don't flag them as unused under this focused hooks-only config.
      reportUnusedDisableDirectives: false,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
)
