// next.config.js
const path = require('path')
const withNextra = require('nextra')('nextra-theme-docs', './theme.config.tsx')
module.exports = withNextra({
    i18n: {
        locales: ['en', 'zh', 'de'],
        defaultLocale: 'en',
        localeDetection: false,

    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
})