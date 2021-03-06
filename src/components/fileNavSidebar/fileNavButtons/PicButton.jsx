import React, { useEffect, useState } from 'react'

const PicButton = ({active}) => {

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
          <path d="M29.1665 6.43351V23.9335H11.6665V6.43351H29.1665ZM29.1665 3.51685H11.6665C10.0623 3.51685 8.74984 4.82935 8.74984 6.43351V23.9335C8.74984 25.5377 10.0623 26.8502 11.6665 26.8502H29.1665C30.7707 26.8502 32.0832 25.5377 32.0832 23.9335V6.43351C32.0832 4.82935 30.7707 3.51685 29.1665 3.51685ZM16.7707 17.6189L19.2353 20.9148L22.8519 16.3939L27.7082 22.4752H13.1248L16.7707 17.6189ZM2.9165 9.35018V29.7668C2.9165 31.371 4.229 32.6835 5.83317 32.6835H26.2498V29.7668H5.83317V9.35018H2.9165Z" />
        </svg>
        Pictures
      </div>
  )
}

export default PicButton;