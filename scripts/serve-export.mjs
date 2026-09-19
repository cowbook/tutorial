import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'

const root = resolve('out')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }

// A strict file server: deliberately no SPA fallback, just like GitHub Pages.
createServer(async (request, response) => {
    try {
        const url = new URL(request.url, 'http://localhost')
        let file = resolve(root, '.' + decodeURIComponent(url.pathname))
        if (file !== root && !file.startsWith(root + sep)) throw new Error('Invalid path')
        if ((await stat(file)).isDirectory()) {
            if (!url.pathname.endsWith('/')) {
                response.writeHead(301, { Location: url.pathname + '/' + url.search }).end()
                return
            }
            file = resolve(file, 'index.html')
        }
        const content = await readFile(file)
        response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(content)
    } catch {
        response.writeHead(404).end('Not found')
    }
}).listen(4173, '127.0.0.1', () => console.log('Static export: http://127.0.0.1:4173'))