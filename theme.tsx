import React from 'react'
import DocsTheme from 'nextra-theme-docs'
import type { NextraThemeLayoutProps } from 'nextra'
import { useRouter } from 'next/router'

// Each language has its own navigation tree, without Next.js server-side i18n.
export default function Theme(props: NextraThemeLayoutProps) {
    const { pathname } = useRouter()
    const english = pathname === '/en' || pathname.startsWith('/en/')
    const englishFolder = props.pageOpts.pageMap.find(item => item.kind === 'Folder' && item.name === 'en')
    const pageMap = english && englishFolder?.kind === 'Folder'
        ? englishFolder.children
        : props.pageOpts.pageMap.filter(item => item.kind === 'Meta' || item.name !== 'en')

    return <DocsTheme {...props} pageOpts={{ ...props.pageOpts, pageMap }}
        themeConfig={{ ...props.themeConfig, logoLink: english ? '/en/' : '/home/' }} />
}