import React, { useEffect, useState } from 'react'

const FileButton = ({active}) => {

  const [color, setColor] = useState('#000000')

  useEffect(() =>{
    active ? (
      setColor('#FF9900')
    ) : (
      setColor('#000000')
    )
  }, [active])
  
  return (
    <div className='file-nav-button' id='file-icon'>
    <svg className='file-nav-button-icon' height="36" viewBox="0 0 35 36" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3728 9.35002L16.2894 12.2667H29.1665V26.85H5.83317V9.35002H13.3728ZM14.5832 6.43335H5.83317C4.229 6.43335 2.93109 7.74585 2.93109 9.35002L2.9165 26.85C2.9165 28.4542 4.229 29.7667 5.83317 29.7667H29.1665C30.7707 29.7667 32.0832 28.4542 32.0832 26.85V12.2667C32.0832 10.6625 30.7707 9.35002 29.1665 9.35002H17.4998L14.5832 6.43335Z"/>
    </svg>
    Files
  </div>
  )
}

export default FileButton;