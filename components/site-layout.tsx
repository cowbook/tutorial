import Image from 'next/image'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import type { ReactNode } from 'react'
import { publicRoutes } from '../lib/content'
import { site, type Locale } from '../lib/site'
import LanguageSwitcher from './switchlang'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

export default async function SiteLayout({ children, locale }: { children: ReactNode; locale: Locale }) {
    const english = locale === 'en'
    const settings = site[locale]
    const pages = await getPageMap(english ? '/en' : '/')
    const pageMap = english ? pages : pages
        .filter(page => !('name' in page) || page.name !== 'en')
        .map(page => 'data' in page
            ? { ...page, data: Object.fromEntries(Object.entries(page.data).filter(([name]) => name !== 'en')) }
            : page)
    const navbar = (
        <Navbar logoLink={settings.home} projectLink={site.repository}
            logo={<div className="logo">
                <Image src="/images/xiaoniu.webp" alt="" width={436} height={425}
                    className="h-auto w-[30px] shrink-0" />
                <strong>{english ? 'Uncle Cow' : '小牛叔'}</strong>
                <span>{english ? 'Programming Tutorials' : '零基础学编程'}</span>
            </div>}>
            <LanguageSwitcher routes={publicRoutes} />
        </Navbar>
    )
    return (
        <html lang={english ? 'en' : 'zh-CN'} dir="ltr" suppressHydrationWarning>
            <Head faviconGlyph="🐄" />
            <body>
                <Layout pageMap={pageMap} navbar={navbar}
                    copyPageButton={false}
                    footer={<Footer>Copyright © Shanghai ShiShilian Co.</Footer>}
                    docsRepositoryBase={`${site.repository}/blob/main`}
                    editLink={english ? 'Edit this page' : '编辑本页'}
                    feedback={{ content: english ? 'Question? Give us feedback' : '问题反馈' }}
                    search={<Search placeholder={english ? 'Search tutorials…' : '搜索教程…'}
                        emptyResult={english ? 'No results found.' : '没有找到结果。'}
                        errorText={english ? 'Failed to load search index.' : '搜索索引加载失败。'}
                        loading={english ? 'Loading…' : '加载中…'} />}
                    themeSwitch={english ? { light: 'Light', dark: 'Dark', system: 'System' }
                        : { light: '浅色', dark: '深色', system: '跟随系统' }}
                    toc={{ title: english ? 'On this page' : '本页内容', backToTop: english ? 'Back to top' : '返回顶部' }}>
                    {children}
                </Layout>
            </body>
        </html>
    )
}
