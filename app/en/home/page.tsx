import Link from 'next/link'
import LanguageRedirect from '../../../components/language-redirect'
import { publicRoutes } from '../../../lib/content'
import { getPageMetadata } from '../../../lib/site'

export const metadata = {
    ...getPageMetadata('/en/home/', 'Programming Tutorials for Beginners', publicRoutes),
    robots: { index: false, follow: true },
}

export default function EnglishHomeAlias() {
    return (
        <main className="language-landing" data-pagefind-ignore="all">
            <LanguageRedirect href="/en/" />
            <Link href="/en/">Continue to the English homepage</Link>
        </main>
    )
}
