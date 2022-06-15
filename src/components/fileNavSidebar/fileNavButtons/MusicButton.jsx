import React, { useEffect, useState } from 'react'

const MusicButton = ({active}) => {

  const [color, setColor] = useState('#000000')

  useEffect(() =>{
    active ? (
      setColor('#FF9900')
    ) : (
      setColor('#000000')
    )
  }, [active])
  
  return (
    <div className='file-nav-button'>
    <svg className='file-nav-button-icon' height="32" viewBox="0 0 35 36" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M29.1668 4.9751V25.3918C29.1666 26.6758 28.7426 27.9239 27.9607 28.9425C27.1788 29.961 26.0827 30.6931 24.8423 31.0253C23.602 31.3574 22.2867 31.271 21.1004 30.7794C19.9142 30.2879 18.9233 29.4187 18.2814 28.3066C17.6395 27.1945 17.3824 25.9016 17.5501 24.6286C17.7179 23.3555 18.3009 22.1734 19.2089 21.2654C20.117 20.3575 21.2992 19.7746 22.5723 19.607C23.8453 19.4394 25.1381 19.6966 26.2502 20.3386V7.89176H13.1252V25.3918C13.1249 26.6758 12.7009 27.9239 11.919 28.9425C11.1371 29.961 10.041 30.6931 8.80067 31.0253C7.5603 31.3574 6.24501 31.271 5.05876 30.7794C3.87251 30.2879 2.8816 29.4187 2.2397 28.3066C1.59779 27.1945 1.34076 25.9016 1.50847 24.6286C1.67618 23.3555 2.25926 22.1734 3.16728 21.2654C4.0753 20.3575 5.25752 19.7746 6.5306 19.607C7.80368 19.4394 9.09648 19.6966 10.2085 20.3386V4.9751H29.1668ZM7.29184 28.3084C8.06539 28.3084 8.80725 28.0011 9.35423 27.4542C9.90121 26.9072 10.2085 26.1653 10.2085 25.3918C10.2085 24.6182 9.90121 23.8764 9.35423 23.3294C8.80725 22.7824 8.06539 22.4751 7.29184 22.4751C6.51829 22.4751 5.77642 22.7824 5.22944 23.3294C4.68246 23.8764 4.37517 24.6182 4.37517 25.3918C4.37517 26.1653 4.68246 26.9072 5.22944 27.4542C5.77642 28.0011 6.51829 28.3084 7.29184 28.3084V28.3084ZM23.3335 28.3084C24.1071 28.3084 24.8489 28.0011 25.3959 27.4542C25.9429 26.9072 26.2502 26.1653 26.2502 25.3918C26.2502 24.6182 25.9429 23.8764 25.3959 23.3294C24.8489 22.7824 24.1071 22.4751 23.3335 22.4751C22.56 22.4751 21.8181 22.7824 21.2711 23.3294C20.7241 23.8764 20.4168 24.6182 20.4168 25.3918C20.4168 26.1653 20.7241 26.9072 21.2711 27.4542C21.8181 28.0011 22.56 28.3084 23.3335 28.3084Z"/>
    </svg>
    Music
  </div>
  )
}

export default MusicButton;