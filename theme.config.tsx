import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Image  from 'next/image'
import LanguageSwitcher from './components/switchlang'

const config: DocsThemeConfig = {

  faviconGlyph:'🐄',
  head: () =>{

    const router = useRouter()

    //console.log('logo',router)

    if(!(router.pathname === '/en' || router.pathname.startsWith('/en/'))){

    return(
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="小牛书-零基础编程学习教程" />
      <meta property="og:description" content="小牛叔的零基础编程学习教程,包括Python基础,Python类,AI应用,pygame游戏设计,大模型应用" />
      <meta name="google-site-verification" content="gn-S40gtsUfPS5aCDnKb4pk1zUS3chBqE76dQPJkq1A" />
      <title>小牛叔 - 零基础学编程</title>
    </>
    )}

    else{



      return (
        <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Uncle Cow - Programming Tutorial For Beginers" />
        <meta property="og:description" content="Programming Tutorial For Beginers,inluding Foundation,Class,AI,pygame,Big Modal" />
        <meta name="google-site-verification" content="gn-S40gtsUfPS5aCDnKb4pk1zUS3chBqE76dQPJkq1A" />
        <title>Uncle Cow - Programming Tutorial For Beginers</title>
      </>
      )
    }
  },
  logo: ()=> {

    const router = useRouter()

    //console.log('logo',router)

    if(!(router.pathname === '/en' || router.pathname.startsWith('/en/'))){

      return (
        <div className='logo'>
          <Image src="/images/xiaoniu.png" alt="logo" width={30} height={30} />
          <h1>小牛叔 </h1>
          <span> - 零基础学编程</span>
        </div>
      )

    }else{

      return (
        <div className='logo'>
        <Image src="/images/xiaoniu.png" alt="logo" width={30} height={30} />
        <h1> Uncle Cow </h1>
        <span> - Programming Tutorial For Beginers</span>
      </div>
      )

    }

    
},
  project: {
    link: 'https://github.com/cowbook/tutorial',
  },  
  navbar: {
    extraContent: LanguageSwitcher,
  },
  docsRepositoryBase: 'https://github.com/cowbook/tutorial',
  footer: {
    text: 'Copyright@ Shanghai ShiShilian Co.',
  },
  themeSwitch: {
    useOptions() {
      return {
        light: 'Light',
        dark: 'Dark',
        system: 'Light'
      }
    }
  }

}

export default config
