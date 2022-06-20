import React from 'react'

const HeroPageStart = ({setToRegister, setToLogin}) => {
  return (
    <>
      <h1>
        Store <span style={{ color: "#ff9900" }}>files </span>
        anywhere and anytime
      </h1>
      <p>
        a small pocket app to store, manage and upload your files. Never
        face the hassle of finding free cloud storage.
      </p>
      <div className="hero-page-button-group">
        <div className="create-account-button" onClick={(e) => setToRegister(e)}>Create account</div>
        <div className="login-button" onClick={(e) => setToLogin(e)}>Login now</div>
      </div>
    </>
  ) 
} 

export default HeroPageStart