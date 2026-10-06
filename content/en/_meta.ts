import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
    index: {
        title: 'Home',
        display: 'hidden',
        theme: { layout: 'full', breadcrumb: false, sidebar: false, toc: false, pagination: false },
    },
    about: { title: 'About me', type: 'page' },
    home: { display: 'hidden' },
    py_begin: { title: 'Python for Beginners' },
    _advanced: { display: 'hidden' },
    _django: { display: 'hidden' },
}

export default meta
