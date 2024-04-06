import React, { useEffect } from 'react';  
import { useRouter } from 'next/router';  

export default function home() {

    const router = useRouter();

    useEffect(() => {  
        // 在组件挂载后执行跳转  
        router.push('/en');

      }, []); // 依赖数组为空，确保只在组件挂载时执行一次 



}