import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LanguageSwitcher() {
  const { pathname } = useRouter()
  const english = pathname === '/en' || pathname.startsWith('/en/')
  const href = english
    ? pathname === '/en' || pathname === '/en/home' ? '/home/' : pathname.slice(3) + '/'
    : pathname === '/home' || pathname === '/' ? '/en/' : '/en' + pathname + '/'

  return (
    <Link href={href} lang={english ? 'zh' : 'en'}
      aria-label={english ? '切换到中文' : 'Switch to English'}
      onClick={() => { document.cookie = `NEXT_LOCALE=${english ? 'zh' : 'en'}; Max-Age=31536000; Path=/; SameSite=Lax` }}>
      {english ? '中文' : 'English'}
    </Link>
  )
}