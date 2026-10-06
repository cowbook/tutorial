import type { MetadataRoute } from 'next'
import { contentRoutes, publicRoutes } from '../lib/content'
import { getLanguageTarget, getLocale, site } from '../lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    return ['/', ...contentRoutes].map(path => {
        const locale = getLocale(path)
        const alternate = getLanguageTarget(path, publicRoutes)
        const hasTranslation = getLanguageTarget(alternate, publicRoutes) === path
        return {
            url: `${site.url}${path}`,
            alternates: hasTranslation ? { languages: {
                'zh-CN': `${site.url}${locale === 'zh' ? path : alternate}`,
                en: `${site.url}${locale === 'en' ? path : alternate}`,
            } } : undefined,
        }
    })
}
