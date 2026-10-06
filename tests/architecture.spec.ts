import { test, expect } from '@playwright/test'
import { getContentRoutes } from '../lib/content-routes.mjs'
import { getLanguageTarget, getLocale, getPageMetadata, normalizePath } from '../lib/site'

const routes = ['/', ...getContentRoutes(), '/en/home/']

test('locale helpers preserve chapter URLs and handle missing translations', () => {
    expect(normalizePath('')).toBe('/')
    expect(normalizePath('///')).toBe('/')
    expect(normalizePath('en/py_begin/intr01')).toBe('/en/py_begin/intr01/')
    expect(getLocale('/english/')).toBe('zh')
    expect(getLocale('/en/')).toBe('en')
    expect(getLanguageTarget('/py_begin/intr01/', routes)).toBe('/en/py_begin/intr01/')
    expect(getLanguageTarget('/en/py_begin/intr01/', routes)).toBe('/py_begin/intr01/')
    expect(getLanguageTarget('/en/home/', routes)).toBe('/home/')
    expect(getLanguageTarget('/untranslated/', routes)).toBe('/en/')
    expect(getLanguageTarget('/en/untranslated/', routes)).toBe('/home/')
    expect(getPageMetadata('/untranslated/', 'Untranslated', routes).alternates?.languages).toBeUndefined()
    expect(getPageMetadata('en/home', 'Home', routes).alternates?.canonical).toBe('/en/')
    expect(getPageMetadata('/en/py_begin/intr01/', 'Chapter', routes).alternates?.languages?.['x-default'])
        .toBe('/py_begin/intr01/')
})

test('all content routes and the English alias support direct requests', async ({ request }) => {
    for (const route of routes) {
        expect((await request.get(route)).status(), route).toBe(200)
    }
    expect((await request.get('/missing-chapter/')).status()).toBe(404)
    expect((await request.get('/images/missing.png')).status()).toBe(404)
    expect((await request.get('/%E0%A4%A')).status()).toBe(400)
    expect((await request.get('/404.html')).status()).toBe(200)
})

test('translated chapters have correct metadata, language and isolated navigation', async ({ page }) => {
    const titles: string[] = []
    for (const route of ['/py_begin/intr01/', '/en/py_begin/intr01/', '/py_begin/intr02/']) {
        await page.goto(route)
        const english = route.startsWith('/en/')
        await expect(page.locator('html')).toHaveAttribute('lang', english ? 'en' : 'zh-CN')
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.xiaoniushu.com${route}`)
        await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
        await expect(page.locator('link[hreflang="zh-CN"]')).toHaveAttribute('href', `https://www.xiaoniushu.com${route.replace(/^\/en/, '')}`)
        await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', `https://www.xiaoniushu.com${english ? route : `/en${route}`}`)
        const sidebar = page.locator('aside.nextra-sidebar')
        await expect(sidebar).toBeVisible()
        if (route === '/py_begin/intr02/') {
            await expect(page.getByRole('link', { name: '编辑本页', exact: true }))
                .toHaveAttribute('href', 'https://github.com/cowbook/tutorial/blob/main/content/py_begin/intr02.mdx')
        }
        const links = await sidebar.locator('a[href]').evaluateAll(elements => elements.map(element => element.getAttribute('href') || ''))
        expect(links.filter(link => english ? !link.startsWith('/en/') : link.startsWith('/en/'))).toEqual([])
        expect(links.some(link => link.includes('_advanced') || link.includes('_django'))).toBe(false)
        titles.push(await page.title())
    }
    expect(new Set(titles).size).toBe(titles.length)
})

for (const [route, label] of [['/home/', '搜索教程…'], ['/en/', 'Search tutorials…']]) {
    test(`static search returns only the current language on ${route}`, async ({ page }) => {
        const failures: string[] = []
        page.on('pageerror', error => failures.push(error.message))
        await page.goto(route)
        await page.getByRole('combobox', { name: label }).fill('Python')
        const results = page.locator('a[role="option"][href]')
        await expect(results.first()).toBeVisible()
        const hrefs = await results.evaluateAll(elements => elements.map(element => element.getAttribute('href') || ''))
        expect(hrefs.length).toBeGreaterThan(0)
        expect(hrefs.every(href => route === '/en/' ? href.startsWith('/en/') : !href.startsWith('/en/'))).toBe(true)
        await results.first().click()
        await expect(page.locator('main')).toBeVisible()
        expect(failures).toEqual([])
    })
}

test('Mermaid diagrams render locally in both languages', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.route('https://**/*', route => route.abort())
    for (const route of ['/py_begin/intr00/', '/en/py_begin/intr00/']) {
        await page.goto(route)
        await page.locator('main > div').last().scrollIntoViewIfNeeded()
        await expect(page.locator('main svg.flowchart')).toBeVisible({ timeout: 15000 })
    }
    expect(errors).toEqual([])
})

test('mobile homepages have usable navigation and no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    for (const route of ['/home/', '/en/']) {
        await page.goto(route)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        await expect(page.getByRole('link', { name: route === '/home/' ? 'Switch to English' : '切换到中文' })).toBeVisible()
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
        await page.getByRole('button', { name: 'Menu', exact: true }).click()
        await expect(page.getByRole('combobox')).toBeVisible()
        await page.getByRole('button', { name: 'Menu', exact: true }).click()
    }
})

test('dark mode applies and persists across language changes', async ({ page }) => {
    await page.goto('/home/')
    await page.getByRole('button', { name: /跟随系统|浅色/, exact: true }).click()
    await page.getByRole('option', { name: '深色', exact: true }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.getByRole('link', { name: 'Switch to English' }).click()
    await expect(page).toHaveURL(/\/en\/$/)
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
})

test('home cards and aliases have usable no-JavaScript links', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto('/home/')
    await page.getByRole('link', { name: /小牛叔 Python 趣味入门教程/ }).click()
    await expect(page).toHaveURL(/\/py_begin\/intr00\/$/)
    await page.goto('/en/home/')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.xiaoniushu.com/en/')
    await page.getByRole('link', { name: 'Continue to the English homepage' }).click()
    await expect(page).toHaveURL(/\/en\/$/)
    await context.close()
})
