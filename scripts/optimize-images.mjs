import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const images = ['cowhead1', 'xiaoniu', 'book', 'pj2', 'py_web', 'py_6']
sharp.cache(false)
sharp.concurrency(1)
let originalBytes = 0
let optimizedBytes = 0

for (const name of images) {
    const source = fileURLToPath(new URL(`../public/images/${name}.png`, import.meta.url))
    const destination = fileURLToPath(new URL(`../public/images/${name}.webp`, import.meta.url))
    const input = await readFile(source)
    const output = await sharp(input).webp({ lossless: true, exact: true, effort: 6 }).toBuffer()
    const before = await sharp(input).raw().toBuffer({ resolveWithObject: true })
    const after = await sharp(output).raw().toBuffer({ resolveWithObject: true })
    assert.deepEqual(after.info, before.info, `${name}: image dimensions or channels changed`)
    assert.ok(after.data.equals(before.data), `${name}: lossless pixel verification failed`)
    assert.ok(output.length < input.length, `${name}: optimized image is not smaller`)
    await writeFile(destination, output)
    originalBytes += input.length
    optimizedBytes += output.length
    console.log(`${name}: ${input.length} -> ${output.length} bytes (identical decoded pixels)`)
}

console.log(`Saved ${originalBytes - optimizedBytes} bytes (${Math.round((1 - optimizedBytes / originalBytes) * 100)}%). Original URLs remain available.`)
