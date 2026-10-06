import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../mdx-components'

const Wrapper = getMDXComponents().wrapper

export default async function ContentPage({ segments }: { segments: string[] }) {
    const { default: MDXContent, toc, metadata, sourceCode } = await importPage(segments)
    return (
        <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
            <MDXContent />
        </Wrapper>
    )
}
