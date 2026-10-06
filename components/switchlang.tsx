'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLanguageTarget, getLocale } from '../lib/site'

export default function LanguageSwitcher({ routes }: { routes: readonly string[] }) {
  const pathname = usePathname()
  const english = getLocale(pathname) === 'en'
  const href = getLanguageTarget(pathname, routes)

  return (
    <Link href={href} lang={english ? 'zh' : 'en'}
      aria-label={english ? '切换到中文' : 'Switch to English'}
      onClick={() => { document.cookie = `NEXT_LOCALE=${english ? 'zh' : 'en'}; Max-Age=31536000; Path=/; SameSite=Lax` }}>
      {english ? '中文' : 'English'}
    </Link>
  )
}