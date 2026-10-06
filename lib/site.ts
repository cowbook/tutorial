import type { Metadata } from 'next'

export type Locale = 'zh' | 'en'

export const site = {
    url: 'https://www.xiaoniushu.com',
    repository: 'https://github.com/cowbook/tutorial',
    zh: {
        name: '小牛叔 - 零基础学编程',
        description: '小牛叔的零基础编程教程：Python 入门、前端开发和 AI 应用。',
        home: '/home/',
    },
    en: {
        name: 'Uncle Cow - Programming Tutorials',
        description: 'Programming tutorials for beginners: Python, front-end development, and AI applications.',
        home: '/en/',
    },
} as const

export function normalizePath(path: string): string {
    const segments = path.split('/').filter(Boolean)
    return segments.length ? `/${segments.join('/')}/` : '/'
}

export function getLocale(path: string): Locale {
    const normalized = normalizePath(path)
    return normalized.startsWith('/en/') ? 'en' : 'zh'
}

export function getLanguageTarget(path: string, routes: readonly string[]): string {
    const normalized = normalizePath(path)
    const locale = getLocale(normalized)
    const targetLocale = locale === 'en' ? 'zh' : 'en'
    if (normalized === '/' || normalized === '/home/' || normalized === '/en/' || normalized === '/en/home/') {
        return site[targetLocale].home
    }
    const target = locale === 'en' ? normalized.slice(3) : `/en${normalized}`
    return routes.includes(target) ? target : site[targetLocale].home
}

export function getPageMetadata(path: string, title: string, routes: readonly string[], description?: string): Metadata {
    const locale = getLocale(path)
    const settings = site[locale]
    const normalized = normalizePath(path)
    const canonical = normalized === '/en/home/' ? '/en/' : normalized
    const alternate = getLanguageTarget(canonical, routes)
    const hasTranslation = getLanguageTarget(alternate, routes) === canonical
    const languages = hasTranslation ? {
        'zh-CN': locale === 'zh' ? canonical : alternate,
        en: locale === 'en' ? canonical : alternate,
        'x-default': canonical === '/home/' || canonical === '/en/' ? '/' : locale === 'zh' ? canonical : alternate,
    } : undefined
    const pageTitle = `${title} | ${settings.name}`
    const pageDescription = description || `${title} — ${settings.description}`
    return {
        title: pageTitle,
        description: pageDescription,
        alternates: { canonical, languages },
        openGraph: {
            type: 'website',
            url: canonical,
            title: pageTitle,
            description: pageDescription,
            locale: locale === 'zh' ? 'zh_CN' : 'en_US',
            siteName: settings.name,
            images: [{ url: '/images/cowhead1.png', alt: settings.name }],
        },
        twitter: { card: 'summary', title: pageTitle, description: pageDescription },
        verification: { google: 'gn-S40gtsUfPS5aCDnKb4pk1zUS3chBqE76dQPJkq1A' },
    }
}
