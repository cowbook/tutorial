import Link from 'next/link'

export default function NotFound() {
    return <main className="language-landing">
        <h1>404 — 页面不存在 / Page not found</h1>
        <p><Link href="/home/">中文首页</Link> · <Link href="/en/">English homepage</Link></p>
    </main>
}
