import './AppBody.css';
import FileNav from '../fileNavSidebar/FileNav';
import FileView from '../fileViewPane/FileView';
import { useState } from 'react';

const AppBody = ({userEmail, setStorage}) => {

  const [activeButton, setActiveButton] = useState('all');
  console.log(activeButton)

  return (
    <div className="AppBody">
      <FileNav setActiveButton = {setActiveButton}/>
      <FileView userEmail = {userEmail} activeButton={activeButton} />
    </div>
  );
}

export default AppBody;