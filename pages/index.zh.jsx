import React, { useEffect } from 'react';  
import Cookie from 'cookie';  
import { useRouter } from 'next/router';  




export const getServerSideProps = async(context) => {
    const acceptLanguage = context.req?.headers['accept-language'];
    // 从请求头中解析 cookies  
    const cookies = Cookie.parse(context.req?.headers.cookie || ''); 
    // 获取特定的 cookie 值  
    const cookieValue = cookies.NEXT_LOCALE || null;  
    
    return {
        props: {
            acceptLanguage,cookieValue
        }
    };
};


// 设置 cookie 的函数  
function setCookie(name, value, days = 365) {  
    const date = new Date();  
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  
    const expires = `; expires=${date.toUTCString()}`;  
    document.cookie = `${name}=${value}${expires}; path=/`;  
}  

export default function index({ acceptLanguage,cookieValue}) {

    const router = useRouter();

    
    // 在组件挂载后执行的逻辑  
    let redirectTo = '/home'; // 你想跳转到的页面路径  
    const delay = 1500; // 延迟 1.5 秒后跳转，你可以根据需要调整这个时间

    if(cookieValue == 'en'){

        useEffect(() => {  
            // 在组件挂载后执行跳转  
            router.push('/en');  
          }, []); // 依赖数组为空，确保只在组件挂载时执行一次 

        return;
    }else if(cookieValue == 'zh'){

        useEffect(() => {  
            // 在组件挂载后执行跳转  
            router.push('/home');  
          }, []); // 依赖数组为空，确保只在组件挂载时执行一次 
        return; 

    }else{

        let hasZh = false;

        for(let lang of acceptLanguage.split(',')){

            if(lang.indexOf('zh')>=0){
                hasZh = true;
                break;
            }

        }


        if(hasZh){
            redirectTo = '/home';
        }else{
            redirectTo = '/en';
        }



  
        useEffect(() => {

            if(hasZh){
                redirectTo = '/home';
                setCookie('NEXT_LOCALE','zh');
            }else{
                redirectTo = '/en';
                setCookie('NEXT_LOCALE','en');
            }
        
    
            // 使用 setTimeout 来设置延迟跳转  
            const timer = setTimeout(() => {  
                router.push(redirectTo);  
            }, delay);  
        
            // 清除定时器，确保在组件卸载时停止跳转  
            return () => clearTimeout(timer);


        }, [router]); // 监听 router 变化，如果路由变化则清除定时器  


    }
    
    return (
        <>
              <style>  
                {`  
                    h1 {  
                        font-size:30px;
                        margin: 30px 20%;
                        text-align:center;  
                    }

                    p {
                        font-size:18px;
                        line-height:150%;
                        margin:40px 20%;
                        color:#555;

                    }
                `}  
            </style>  

            <div>
                <h1> 小牛叔 - 零基础学编程</h1>
                <h1> Uncle Cow -  Programe Tutorial for Beginers </h1>
                <p>页面将在 {delay / 1000} 秒后自动跳转到  <a href={redirectTo}>{redirectTo=='/en'?'英文版':'中文版'}</a></p>  
                <p>After {delay / 1000} seconds,this page is redirecting to <a href={redirectTo}>{redirectTo=='/en'?'English Version':'Chinese Version'}</a>。</p>
            </div>
        
        </>
       
    );


}