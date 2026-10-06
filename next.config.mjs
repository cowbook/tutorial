import nextra from 'nextra'

const withNextra = nextra({
    search: { codeblocks: false },
})

export default withNextra({
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
})
