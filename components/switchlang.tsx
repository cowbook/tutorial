// LanguageSwitcher.js  
import React, { useEffect } from 'react';  
import Cookies from 'js-cookie';  
import { useRouter } from 'next/router';  


  
const LanguageSwitcher = ({ acceptLanguage }) => {  
  const router = useRouter();  
  const loca = Cookies.get('NEXT_LOCALE');  

  useEffect(() => {  
    if (!loca && acceptLanguage.split(',')[0].indexOf('en')>=0 ) {  
        
        router.push('/en');  
       
    }  
  }, [acceptLanguage, router]);  
  
  return null;  
};  
  
export default LanguageSwitcher;