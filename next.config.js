// next.config.js
const path = require('path')
const withNextra = require('nextra')('./theme.tsx', './theme.config.tsx')

module.exports = withNextra({
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
})