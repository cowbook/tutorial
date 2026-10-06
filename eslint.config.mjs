import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import next from '@next/eslint-plugin-next'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: { globals: { ...globals.node, ...globals.browser } },
    },
    {
        files: ['**/*.{ts,tsx}'],
        plugins: { '@next/next': next, 'react-hooks': reactHooks },
        rules: {
            ...next.configs.recommended.rules,
            ...next.configs['core-web-vitals'].rules,
            ...reactHooks.configs.flat.recommended.rules,
        },
    },
    globalIgnores(['.next/**', 'out/**', 'next-env.d.ts', 'playwright-report/**', 'test-results/**']),
])
