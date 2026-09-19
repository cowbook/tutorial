import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    use: { baseURL: process.env.SITE_URL || 'http://127.0.0.1:4173', locale: 'zh-CN' },
    webServer: process.env.SITE_URL ? undefined : {
        command: 'node scripts/serve-export.mjs',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: false,
    },
})