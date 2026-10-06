import type { Metadata } from 'next'
import Link from 'next/link'
import LanguageRedirect from '../../components/language-redirect'

export const metadata: Metadata = {
    title: '小牛叔 - 零基础学编程 | Uncle Cow',
    description: '请选择语言 / Choose your language — Python and programming tutorials.',
    alternates: { canonical: '/', languages: { 'zh-CN': '/home/', en: '/en/', 'x-default': '/' } },
}

export default function IndexPage() {
    return (
        <main className="language-landing" data-pagefind-ignore="all">
            <LanguageRedirect />
            <h1>小牛叔 - 零基础学编程</h1>
            <p>Uncle Cow — Programming Tutorials for Beginners</p>
            <p>请选择语言 / Choose your language</p>
            <p><Link href="/home/">中文</Link> · <Link href="/en/">English</Link></p>
        </main>
    )
}
