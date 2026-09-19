import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function EnglishHomeAlias() {
    const router = useRouter()
    useEffect(() => { router.replace('/en/') }, [router])
    return <Link href="/en/">Continue to the English homepage</Link>
}