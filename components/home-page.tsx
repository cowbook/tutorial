import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '../lib/site'

const copy = {
    zh: {
        title: '小牛叔 - 零基础也能快速 DIY 学会 Python 编程',
        intro: '专注于初学者，教您快速入门编程，小牛叔只做看得懂的教程。',
        courseTitle: '跟白领小秘 Vivien 学编程',
        courseSubtitle: '视频课程，适合零基础学习者',
        courseItems: ['职场编程入门', '从基础语法开始', '爬虫与数据分析', 'AI 应用实践'],
        tutorialTitle: '小牛叔 Python 趣味入门教程',
        tutorialSubtitle: '免费直观，适合 DIY，图文并茂',
        tutorialItems: ['选择入门语言', 'Python 的优点', '安装配置 Python', '掌握重要概念'],
        bookTitle: 'Python 青少年趣味编程',
        bookSubtitle: '小牛叔撰写的正式出版物',
        bookItems: ['青少年入门书籍', '通过故事学习编程', '趣味项目与练习'],
        languageTitle: '选择入门语言：Python or JS',
        languageText: '零基础可以从 Python 或 JS（包括 TS）入门。如果今后不只是做前端开发，小牛叔建议首先学会 Python。Python 易于学习、使用和维护，适用于网站开发、数据分析、自动化和 AI 等领域。',
        more: '详细文章',
        downloadTitle: 'Python 解释器（官网下载）',
        downloadText: '建议先阅读入门教程，再从 Python 官网选择仍受支持的稳定版本。不要为初学者默认推荐已停止维护的 Python 3.7 或 3.8。安装前请核对操作系统和处理器要求。',
        windows: 'Windows 官方下载',
        mac: 'macOS 官方下载',
        pythonSite: 'Python 官方网站',
        bookText: '本书以青少年喜爱的奇幻探险故事为脉络，将 Python 知识贯穿其中，通过故事连接编程乐趣，涵盖变量、函数、语句、模块、类和面向对象编程，并通过时钟动画和贪吃蛇项目进行实践。',
        bookAudience: '适合青少年、儿童，以及希望陪伴孩子学习编程的家长。',
        buy: '当当图书信息页',
        resources: '免费资源链接',
        source: '源码与课后习题',
        videos: 'B 站同步免费视频课程',
        community: '学习交流 QQ 群：1051096460',
        about: '关于本站',
        aboutText: '本站使用 React、Next.js App Router 和 Nextra Docs 主题。教程在构建时导出为静态 HTML，通过 GitHub Actions 部署到 GitHub Pages，无需运行时服务器。',
        technical: '技术链接',
        chapter: '/py_begin/intr00/',
    },
    en: {
        title: '3F Learning - Fancy, Focused, and Friendly',
        intro: 'Uncle Cow — focused, accessible programming tutorials for beginners.',
        courseTitle: 'Advanced Course',
        courseSubtitle: 'Chinese video courses for beginners',
        courseItems: ['Start without a development background', 'Learn fundamental syntax', 'Web scraping and data analysis', 'Practical AI applications'],
        tutorialTitle: 'Free Python Tutorial',
        tutorialSubtitle: 'Illustrated lessons for independent learners',
        tutorialItems: ['Choose a starter language', 'Explore Python’s strengths', 'Install and configure Python', 'Learn important concepts'],
        bookTitle: 'Python Programming Fun for Youth',
        bookSubtitle: 'An officially published Chinese book',
        bookItems: ['An introductory book for young learners', 'Learn through stories', 'Practical projects and exercises'],
        languageTitle: 'Choosing a starter language: Python or JS',
        languageText: 'Start with Python or JS (including TS). If you do not plan to focus exclusively on front-end development, Uncle Cow recommends Python first. It is easy to learn and maintain, and useful for websites, data analysis, automation, and AI.',
        more: 'Read the lesson',
        downloadTitle: 'Python Interpreter',
        downloadText: 'Read the introductory tutorial, then choose a supported stable release from the official Python website. End-of-life Python 3.7 and 3.8 releases are not recommended for beginners. Check the operating system and processor requirements before installing.',
        windows: 'Official Windows downloads',
        mac: 'Official macOS downloads',
        pythonSite: 'The official Python website',
        bookText: 'This introductory book follows a fantasy adventure story to connect programming concepts with practical exercises. It covers variables, functions, statements, modules, classes, and object-oriented programming, followed by clock animation and Snake game projects.',
        bookAudience: 'For young learners and parents who want to learn programming with their children.',
        buy: 'Book information on DangDang',
        resources: 'Free resources',
        source: 'Source code and exercises',
        videos: 'Free accompanying videos on Bilibili',
        community: 'Learning community QQ group: 1051096460',
        about: 'About this site',
        aboutText: 'This site uses React, Next.js App Router, and the Nextra Docs theme. Tutorials are exported as static HTML at build time and deployed to GitHub Pages through GitHub Actions, without a runtime server.',
        technical: 'Technical links',
        chapter: '/en/py_begin/intr00/',
    },
} as const

const cardClass = 'mt-10 rounded-2xl border border-slate-200 px-8 pb-8 shadow-xl transition-transform hover:scale-105 dark:border-slate-700'
const sectionClass = 'mt-16 grid gap-8 rounded-2xl p-4 md:p-10 lg:grid-cols-2 even:bg-slate-50 dark:even:bg-slate-900'
const headingClass = 'my-6 text-2xl font-bold'

export default function HomePage({ locale }: { locale: Locale }) {
    const text = copy[locale]
    return (
        <div className="home">
            <div className="home-hero items-center md:flex">
                <Image src="/images/cowhead1.webp" alt={locale === 'zh' ? '小牛叔' : 'Uncle Cow'}
                    width={256} height={256} preload className="mx-auto h-auto w-[240px] pt-10 md:mx-0"
                    style={{ height: 'auto' }} />
                <div className="grow p-4 md:p-10">
                    <h1 className="text-5xl leading-normal font-bold">{text.title}</h1>
                    <p className="mt-6 text-xl font-light">{text.intro}</p>
                </div>
            </div>
            <div className="grid gap-6 p-4 md:p-10 lg:grid-cols-3">
                <section className={cardClass}>
                    <h2 className={headingClass}>{text.courseTitle}</h2>
                    <p>{text.courseSubtitle}</p>
                    <ul className="mt-4 list-inside list-disc space-y-2">{text.courseItems.map(item => <li key={item}>{item}</li>)}</ul>
                </section>
                <Link href={text.chapter} className={cardClass}>
                    <h2 className={headingClass}>{text.tutorialTitle}</h2>
                    <p>{text.tutorialSubtitle}</p>
                    <ol className="mt-4 list-inside list-decimal space-y-2">{text.tutorialItems.map(item => <li key={item}>{item}</li>)}</ol>
                </Link>
                <a href="#book" className={cardClass}>
                    <h2 className={headingClass}>{text.bookTitle}</h2>
                    <p>{text.bookSubtitle}</p>
                    <div className="mt-4 flex items-center gap-4">
                        <Image src="/images/book.webp" alt={text.bookTitle} width={611} height={800}
                            className="h-auto w-[90px] shrink-0 shadow-xl" style={{ height: 'auto' }} />
                        <ul className="list-inside list-disc space-y-2">{text.bookItems.map(item => <li key={item}>{item}</li>)}</ul>
                    </div>
                </a>
            </div>
            <section className={sectionClass}>
                <a href="https://www.python.org/" target="_blank" rel="noreferrer">
                    <Image src="/images/pj2.webp" alt={text.languageTitle} width={1000} height={563}
                        className="h-auto w-full max-w-[400px] rounded-2xl shadow-xl"
                        style={{ width: '100%', height: 'auto' }} />
                </a>
                <div>
                    <h2 className={headingClass}>{text.languageTitle}</h2>
                    <p>{text.languageText}</p>
                    <p className="mt-8"><Link href={text.chapter} className="btn-blue-round">{text.more}</Link></p>
                </div>
            </section>
            <section className={sectionClass}>
                <div>
                    <h2 className={headingClass}>{text.downloadTitle}</h2>
                    <p>{text.downloadText}</p>
                    <ul className="mt-6 space-y-3 underline">
                        <li><a href="https://www.python.org/downloads/windows/">{text.windows}</a></li>
                        <li><a href="https://www.python.org/downloads/macos/">{text.mac}</a></li>
                    </ul>
                </div>
                <a href="https://www.python.org/" target="_blank" rel="noreferrer">
                    <Image src="/images/py_web.webp" alt={text.pythonSite} width={1100} height={686}
                        className="h-auto w-full max-w-[550px] rounded-2xl shadow-xl"
                        style={{ width: '100%', height: 'auto' }} />
                    {text.pythonSite}
                </a>
            </section>
            <section className={sectionClass} id="book">
                <a href="https://product.dangdang.com/28524470.html" target="_blank" rel="noreferrer">
                    <Image src="/images/book.webp" alt={text.bookTitle} width={611} height={800}
                        className="h-auto w-full max-w-[250px] rounded-2xl shadow-xl"
                        style={{ width: '100%', height: 'auto' }} />
                    {text.buy}
                </a>
                <div>
                    <h2 className={headingClass}>{text.bookTitle}</h2>
                    <p>{text.bookText}</p>
                    <p className="mt-4">{text.bookAudience}</p>
                    <h3 className="my-4 text-xl font-semibold">{text.resources}</h3>
                    <ul className="space-y-2">
                        <li><a className="underline" href="https://github.com/markzhang716/py_youth">{text.source}</a></li>
                        <li><a className="underline" href="https://www.bilibili.com/read/readlist/rl793330">{text.videos}</a></li>
                        <li>{text.community}</li>
                    </ul>
                </div>
            </section>
            <section className={sectionClass}>
                <Image src="/images/nextra.jpg" alt="Nextra" width={750} height={505}
                    className="h-auto w-full max-w-[475px] rounded-2xl shadow-xl"
                    style={{ width: '100%', height: 'auto' }} />
                <div>
                    <h2 className={headingClass}>{text.about}</h2>
                    <p>{text.aboutText}</p>
                    <h3 className="my-4 text-xl font-semibold">{text.technical}</h3>
                    <ul className="space-y-2 underline">
                        <li><a href="https://react.dev/">React</a></li>
                        <li><a href="https://nextjs.org/">Next.js</a></li>
                        <li><a href="https://nextra.site/">Nextra</a></li>
                        <li><a href="https://docs.github.com/en/pages">GitHub Pages</a></li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
