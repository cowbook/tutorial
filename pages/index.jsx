import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function IndexPage() {
    const router = useRouter()

    useEffect(() => {
        const saved = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.slice('NEXT_LOCALE='.length)
        const locale = saved === 'en' || saved === 'zh'
            ? saved
            : (navigator.languages || [navigator.language]).some(language => /^zh\b/i.test(language)) ? 'zh' : 'en'
        router.replace(locale === 'en' ? '/en/' : '/home/')
    }, [router])

    return (
        <main style={{ maxWidth: 720, margin: '15vh auto', padding: 24, textAlign: 'center' }}>
            <Head><title>小牛叔 - 零基础学编程 | Uncle Cow</title></Head>
            <h1>小牛叔 - 零基础学编程</h1>
            <p>Uncle Cow — Programming Tutorials for Beginners</p>
            <p>请选择语言 / Choose your language</p>
            <p><Link href="/home/">中文</Link> · <Link href="/en/">English</Link></p>
        </main>
    )
}