'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { site } from '../lib/site'

export default function LanguageRedirect({ href }: { href?: string }) {
    const router = useRouter()
    useEffect(() => {
        if (href) {
            router.replace(href)
            return
        }
        const saved = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.slice('NEXT_LOCALE='.length)
        const locale = saved === 'en' || saved === 'zh' ? saved
            : (navigator.languages || [navigator.language]).some(language => /^zh\b/i.test(language)) ? 'zh' : 'en'
        router.replace(site[locale].home)
    }, [href, router])
    return null
}
