import React, { useEffect, useState } from 'react'

const AllButton = ({active}) => {

  const [color, setColor] = useState('#000000')

  useEffect(() =>{
    active ? (
      setColor('#FF9900')
    ) : (
      setColor('#000000')
    )
  }, [active])
  
  return (
    <div className='file-nav-button' >
        <svg className='file-nav-button-icon' height="32" viewBox="0 0 41 41" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path d="M7.1665 13.9335H13.8332V7.26685H7.1665V13.9335ZM17.1665 33.9335H23.8332V27.2668H17.1665V33.9335ZM7.1665 
          33.9335H13.8332V27.2668H7.1665V33.9335ZM7.1665 23.9335H13.8332V17.2668H7.1665V23.9335ZM17.1665 23.9335H23.8332V17.2668H17.1665V23.9335ZM27.1665 
          7.26685V13.9335H33.8332V7.26685H27.1665ZM17.1665 13.9335H23.8332V7.26685H17.1665V13.9335ZM27.1665 23.9335H33.8332V17.2668H27.1665V23.9335ZM27.1665 
          33.9335H33.8332V27.2668H27.1665V33.9335Z" />
        </svg>
        All
      </div>
  )
}

export default AllButton;