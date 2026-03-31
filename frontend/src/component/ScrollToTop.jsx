import React from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const pathName = useLocation();

  useEffect(()=>{
    window.scrollTop({top:0,behavior:"smooth"});
  },[pathName]);

  return null;
}

export default ScrollToTop