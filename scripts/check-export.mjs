import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const output = new URL('../out/', import.meta.url).pathname
const required = ['index.html', 'home/index.html', 'en/index.html', 'about/index.html', 'en/about/index.html',
    'py_begin/index.html', 'en/py_begin/index.html', '404.html', 'CNAME', '.nojekyll']
for (const language of ['', 'en/']) {
    for (const chapter of ['intr00', 'intr01', 'intr02']) {
        required.push(`${language}py_begin/${chapter}/index.html`)
    }
}
for (const file of required) {
    assert.ok(existsSync(join(output, file)), `Missing exported file: ${file}`)
}
assert.equal(readFileSync(join(output, 'CNAME'), 'utf8').trim(), 'www.xiaoniushu.com')

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
console.log('Static export verified: homepage, both languages, chapters, domain, internal links and assets.')