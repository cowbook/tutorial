import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

function getStoredLocale() {
    if (typeof document === 'undefined') return null;

    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith('NEXT_LOCALE='));

    return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function setCookie(name, value, days = 365) {
    if (typeof document === 'undefined') return;

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

export default function IndexPage() {
    const router = useRouter();
    const delay = 1500;

    const redirectTo = useMemo(() => {
        if (typeof navigator === 'undefined') return '/home';

        const savedLocale = getStoredLocale();
        const browserLocale = (savedLocale || navigator.language || '').toLowerCase();

        return browserLocale.includes('zh') ? '/home' : '/en';
    }, []);

    useEffect(() => {
        const savedLocale = getStoredLocale();
        const browserLocale = (savedLocale || (typeof navigator !== 'undefined' ? navigator.language : '') || '').toLowerCase();
        const language = browserLocale.includes('zh') ? 'zh' : 'en';
        const nextPath = language === 'zh' ? '/home' : '/en';

        setCookie('NEXT_LOCALE', language);

        const timer = setTimeout(() => {
            router.push(nextPath);
        }, delay);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            <style>
                {`
                    h1 {
                        font-size: 30px;
                        margin: 30px 20%;
                        text-align: center;
                    }

                    p {
                        font-size: 18px;
                        line-height: 150%;
                        margin: 40px 20%;
                        color: #555;
                    }
                `}
            </style>

            <div>
                <h1> 小牛叔 - 零基础学编程</h1>
                <h1> Uncle Cow - Programe Tutorial for Beginers </h1>
                <p>
                    页面将在 {delay / 1000} 秒后自动跳转到{' '}
                    <a href={redirectTo}>{redirectTo === '/en' ? '英文版' : '中文版'}</a>
                </p>
                <p>
                    After {delay / 1000} seconds, this page is redirecting to{' '}
                    <a href={redirectTo}>{redirectTo === '/en' ? 'English Version' : 'Chinese Version'}</a>。
                </p>
            </div>
        </>
    );
}