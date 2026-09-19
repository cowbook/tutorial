import { test, expect } from '@playwright/test'

test('homepage detects Chinese and supports round-trip language switching', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    expect((await page.goto('/'))?.status()).toBe(200)
    await expect(page).toHaveURL(/\/home\/$/)
    await expect(page.getByRole('link', { name: 'Switch to English' })).toBeVisible()
    await page.getByRole('link', { name: 'Switch to English' }).click()
    await expect(page).toHaveURL(/\/en\/$/)
    await expect(page.getByRole('link', { name: '切换到中文' })).toBeVisible()
    await page.getByRole('link', { name: '切换到中文' }).click()
    await expect(page).toHaveURL(/\/home\/$/)
    expect(errors).toEqual([])
})

test('saved English preference works on the root URL', async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: 'NEXT_LOCALE', value: 'en', url: baseURL! }])
    await page.goto('/')
    await expect(page).toHaveURL(/\/en\/$/)
    await expect(page.getByRole('link', { name: '切换到中文' })).toBeVisible()
})

test('English browser without a cookie reaches English homepage', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, locale: 'en-US' })
    const page = await context.newPage()
    await page.goto('/')
    await expect(page).toHaveURL(/\/en\/$/)
    await context.close()
})

test('chapter deep links and same-chapter language switching work', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    expect((await page.goto('/py_begin/intr01/'))?.status()).toBe(200)
    await page.getByRole('link', { name: 'Switch to English' }).click()
    await expect(page).toHaveURL(/\/en\/py_begin\/intr01\/$/)
    expect((await page.reload())?.status()).toBe(200)
    await page.getByRole('link', { name: '切换到中文' }).click()
    await expect(page).toHaveURL(/\/py_begin\/intr01\/$/)
    expect(errors).toEqual([])
})

test('both language pages load images and all local assets', async ({ page }) => {
    const failures: string[] = []
    page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(new URL(page.url()).origin)) failures.push(response.url()) })
    for (const path of ['/home/', '/en/', '/py_begin/intr00/', '/en/py_begin/intr00/']) {
        await page.goto(path, { waitUntil: 'networkidle' })
        await expect(page.locator('img').first()).toBeVisible()
        expect(await page.locator('img').first().evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
    }
    expect(failures).toEqual([])
})

test('homepage has usable fallback links without JavaScript', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
    const page = await context.newPage()
    expect((await page.goto('/'))?.status()).toBe(200)
    await page.getByRole('link', { name: '中文' }).click()
    await expect(page).toHaveURL(/\/home\/$/)
    await context.close()
})