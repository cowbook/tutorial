import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

/**
 * @param {string} directory
 * @param {string[]} segments
 * @returns {string[]}
 */
function readRoutes(directory, segments = []) {
    return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        if (entry.isDirectory()) return readRoutes(join(directory, entry.name), [...segments, entry.name])
        if (!entry.name.endsWith('.mdx')) return []
        const name = entry.name.slice(0, -4)
        const path = [...segments, ...(name === 'index' ? [] : [name])].join('/')
        return [path ? `/${path}/` : '/']
    })
}

export function getContentRoutes(directory = resolve('content')) {
    return readRoutes(directory).sort()
}
