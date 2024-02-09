import { withLocales } from 'nextra/locales'
import { NextRequest, NextResponse } from 'next/server'
import { kv } from "@vercel/kv";



const PUBLIC_FILE = /\.(.*)$/

export const middleware = withLocales(req => {
    // Your middleware code...



    kv.lpush('routes', req.nextUrl.pathname)


    //routes.push(req.nextUrl.pathname);

    let al = req.headers.get('accept-language')

    if (req.nextUrl.pathname == '/_next/static/chunks/pages/index.en.js' && al.indexOf('zh') >= 0 &&
        req.cookies.get('NEXT_LOCALE')) {

        //console.log(req.headers.get('accept-language'), typeof req.headers.get('accept-language'))
        //console.log(req.cookies.get('NEXT_LOCALE'))

        //console.log(req)






    }

    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return
    }

    if (req.nextUrl.locale === 'default') {
        const locale = req.cookies.get('NEXT_LOCALE') ? .value || 'en'

        return NextResponse.redirect(
            new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        )
    }


})