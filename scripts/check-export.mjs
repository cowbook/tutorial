import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getContentRoutes } from '../lib/content-routes.mjs'

const output = fileURLToPath(new URL('../out/', import.meta.url))
const contentRoutes = getContentRoutes(fileURLToPath(new URL('../content/', import.meta.url)))
const required = ['index.html', 'home/index.html', 'en/index.html', 'about/index.html', 'en/about/index.html',
    'py_begin/index.html', 'en/py_begin/index.html', 'en/home/index.html',
    '404.html', 'CNAME', '.nojekyll', 'sitemap.xml', 'robots.txt',
    '_pagefind/pagefind.js', '_pagefind/pagefind-entry.json']
for (const language of ['', 'en/']) {
    for (const chapter of ['intr00', 'intr01', 'intr02']) {
        required.push(`${language}py_begin/${chapter}/index.html`)
    }
}
for (const file of required) {
    assert.ok(existsSync(join(output, file)), `Missing exported file: ${file}`)
}
assert.equal(readFileSync(join(output, 'CNAME'), 'utf8').trim(), 'www.xiaoniushu.com')
const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8')
for (const route of contentRoutes) {
    const html = readFileSync(join(output, route, 'index.html'), 'utf8')
    const language = route.startsWith('/en/') ? 'en' : 'zh-CN'
    assert.match(html, new RegExp(`<html[^>]*lang="${language}"`), `${route}: incorrect document language`)
    assert.ok(html.includes(`href="https://www.xiaoniushu.com${route}"`), `${route}: missing canonical URL`)
    assert.match(html, /<meta name="description" content="[^"]+"/, `${route}: missing description`)
    assert.ok(sitemap.includes(`<loc>https://www.xiaoniushu.com${route}</loc>`), `${route}: missing from sitemap`)
}
const searchIndex = JSON.parse(readFileSync(join(output, '_pagefind/pagefind-entry.json'), 'utf8'))
for (const [prefix, language] of [['/en/', 'en'], ['/', 'zh-cn']]) {
    const expected = contentRoutes.filter(route => prefix === '/en/' ? route.startsWith(prefix) : !route.startsWith('/en/')).length
    assert.equal(searchIndex.languages[language]?.page_count, expected, `Incomplete ${language} search index`)
}

// Check the actual rendered links and assets, not just Next's successful exit code.
function checkDirectory(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const file = join(directory, entry.name)
        if (entry.isDirectory()) {
            if (entry.name !== '_next') checkDirectory(file)
        } else if (entry.name.endsWith('.html')) {
            const html = readFileSync(file, 'utf8')
            for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"?#]*)[^"]*"/g)) {
                if (url.startsWith('//')) continue
                const path = join(output, decodeURIComponent(url))
                assert.ok(existsSync(path) || existsSync(join(path, 'index.html')), `${file}: missing local target ${url}`)
            }
        }
    }
}
checkDirectory(output)
console.log(`Static export verified: ${contentRoutes.length} content routes, aliases, metadata, sitemap, bilingual search, domain, links and assets.`)