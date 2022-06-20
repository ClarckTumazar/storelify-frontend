import React, { useEffect, useState } from "react";
import logo from "../navbar/storelify-logo.svg";
import "./HeroPage.css";
import bg from "../../img/heroPageBg.svg";
import HeroPageStart from "./HeroPageStart";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";


const HeroPage = () => {

  const [currentState, setCurrentState] = useState('welcome');
  const [pageLoader, setPageLoader] = useState(<HeroPageStart />);

  const setToRegister = (e) => {
    e.preventDefault()
    setCurrentState('register')
  }

  const setToLogin = (e) => {
    e.preventDefault()
    setCurrentState('Login')
    console.log("im clicked!")
  } 

  useEffect(() => {
    if (currentState === 'welcome')
      setPageLoader(<HeroPageStart 
        setToRegister={setToRegister}
        setToLogin={setToLogin}
        />)
    
    if (currentState === 'register')
      setPageLoader(<RegisterForm 
        setToLogin={setToLogin}
        />)
    
    if (currentState === 'Login')
      setPageLoader(<LoginForm 
        setToRegister={setToRegister}
        />)

  },[currentState])


  return (
    <>
        <div className="hero-page-bg">
          <img src={bg} alt="hero page bg" height="100%" />
        </div>
        <div className="hero-page-body">
          <div className="header">
            <img
              className="app-logo-hero-page"
              src={logo}
              alt="storelify-logo"
              height="100%"
            />
          </div>
          <div className="body">
          {pageLoader}
          </div>
        </div>

    </>
  );
};

export default HeroPage;
