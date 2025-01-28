import React, { useEffect } from 'react';

const useCustomCookieBanner = (src, id) => {
    useEffect(() => {

      if (document.getElementById(id)) return;
    
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.async = true;

      document.head.appendChild(script);
    
      return () => {
        if (document.getElementById(id)) {
          document.head.removeChild(script);
        }
      };
    }, [src, id]); 
    };

export default useCustomCookieBanner;
