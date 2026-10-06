import type { ReactNode } from 'react'
import SiteLayout from '../../components/site-layout'
import { site } from '../../lib/site'

export const metadata = {
    metadataBase: new URL(site.url),
}

export default function EnglishLayout({ children }: { children: ReactNode }) {
    return <SiteLayout locale="en">{children}</SiteLayout>
}
