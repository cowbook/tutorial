import { importPage } from 'nextra/pages'
import ContentPage from '../../../components/content-page'
import { contentRoutes, publicRoutes } from '../../../lib/content'
import { getLocale, getPageMetadata } from '../../../lib/site'

type Props = { params: Promise<{ mdxPath?: string[] }> }

export const dynamicParams = false

export function generateStaticParams() {
    return contentRoutes.filter(route => getLocale(route) === 'en')
        .map(route => ({ mdxPath: route.split('/').filter(Boolean).slice(1) }))
}

export async function generateMetadata({ params }: Props) {
    const { mdxPath = [] } = await params
    const segments = ['en', ...mdxPath]
    const { metadata } = await importPage(segments)
    return getPageMetadata(segments.join('/'), metadata.title, publicRoutes, metadata.description || undefined)
}

export default async function Page({ params }: Props) {
    const { mdxPath = [] } = await params
    return <ContentPage segments={['en', ...mdxPath]} />
}
