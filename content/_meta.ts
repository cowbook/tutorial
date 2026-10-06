import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
    index: { title: '首页', display: 'hidden' },
    home: {
        title: '首页',
        display: 'hidden',
        theme: { layout: 'full', breadcrumb: false, sidebar: false, toc: false, pagination: false },
    },
    about: { title: '关于牛叔', type: 'page' },
    py_begin: { title: 'Python 趣味入门系列' },
    _advanced: { title: '高级课程', display: 'hidden' },
    _django: { display: 'hidden' },
    en: { display: 'hidden' },
}

export default meta
