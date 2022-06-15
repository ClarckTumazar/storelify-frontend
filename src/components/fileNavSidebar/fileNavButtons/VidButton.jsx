import React, { useEffect, useState } from 'react'

const VidButton = ({active}) => {

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
        <path d="M17.4998 3.51685C9.44984 3.51685 2.9165 10.0502 2.9165 18.1002C2.9165 26.1502 9.44984 32.6835 17.4998 32.6835C25.5498 32.6835 32.0832 26.1502 32.0832 18.1002C32.0832 10.0502 25.5498 3.51685 17.4998 3.51685ZM17.4998 29.7668C11.0686 29.7668 5.83317 24.5314 5.83317 18.1002C5.83317 11.6689 11.0686 6.43351 17.4998 6.43351C23.9311 6.43351 29.1665 11.6689 29.1665 18.1002C29.1665 24.5314 23.9311 29.7668 17.4998 29.7668ZM13.854 24.6627L24.0623 18.1002L13.854 11.5377V24.6627Z"/>
      </svg>
      Videos
    </div>
  )
}

export default VidButton;