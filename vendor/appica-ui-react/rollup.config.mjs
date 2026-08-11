import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import preserveDirectives from 'rollup-preserve-directives'

const SRC = 'src'
const SKIP_DIRS = new Set(['test']) // non-shipping (test setup)

function collectInputs(root) {
  const files = []
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      const isDir = statSync(path).isDirectory()
      if (isDir) {
        if (dir === root && SKIP_DIRS.has(name)) continue
        walk(path)
      } else if (/\.(tsx?|jsx?)$/.test(name) && !/\.test\.[tj]sx?$/.test(name) && !/\.d\.[tj]sx?$/.test(name)) {
        files.push(path)
      }
    }
  }
  walk(root)
  return Object.fromEntries(files.map((f) => [relative(root, f).replace(/\.(tsx?|jsx?)$/, ''), f]))
}

const external = [
  'react',
  'react-dom',
  /^react\//,
  /^react-dom\//,
  'clsx',
  'tailwind-merge',
  'class-variance-authority',
  /^motion(\/.*)?$/,
  /^@base-ui\//,
  /^react-day-picker(\/.*)?$/,
  /^date-fns(\/.*)?$/,
  /^embla-carousel(-.*)?$/,
]

export default defineConfig({
  input: collectInputs(SRC),
  external,
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: SRC,
    entryFileNames: '[name].js',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    preserveDirectives(),
    esbuild({
      target: 'es2020',
      jsx: 'automatic',
      tsconfig: 'tsconfig.build.json',
    }),
  ],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
  onwarn(warning, warn) {
    // Rollup hoists "use client" / "use server" — that's exactly what we want.
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
    warn(warning)
  },
})
