import React, { useState } from 'react'
import NavBar from '../navbar/NavBar';
import AppBody from '../appBody/AppBody';
import { useParams } from 'react-router-dom';

const Home = () => {

  const { userEmail } = useParams();
  //const [storage, setStorage ] = useState(0);
  return (
    <>
      <NavBar />
      <AppBody userEmail = {userEmail}/>
    </>
  )
}

export default Home;