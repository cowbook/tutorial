import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: process.env.SITE_URL || 'http://127.0.0.1:4173',
        locale: 'zh-CN',
        channel: process.env.PLAYWRIGHT_CHANNEL,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    webServer: process.env.SITE_URL ? undefined : {
        command: 'node scripts/serve-export.mjs',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: false,
    },
})