import { useEffect, useState } from 'react';
import './FileNav.css';
import AllButton from './fileNavButtons/AllButton';
import PicButton from './fileNavButtons/PicButton';
import VidButton from './fileNavButtons/VidButton';
import MusicButton from './fileNavButtons/MusicButton';
import FileButton from './fileNavButtons/FileButton';

const FileNav = ({setActiveButton}) => {

  const [all, setAll] = useState(true);
  const [pic, setPic] = useState(false);
  const [vid, setVid] = useState(false);
  const [music, setMusic] = useState(false);
  const [file, setFile] = useState(false);

  const setActive = (e) => {
    const targetId = e.target.id;
    setAll(targetId === 'all-icon' ? true : false)
    setPic(targetId === 'pic-icon' ? true : false)
    setVid(targetId === 'vid-icon' ? true : false)
    setMusic(targetId === 'music-icon' ? true : false)
    setFile(targetId === 'file-icon' ? true : false)
  }

  useEffect(() => {
    if(all) { setActiveButton('All') }
    else if(pic) { setActiveButton('Pictures') }
    else if(vid) { setActiveButton('Videos') }
    else if(music) { setActiveButton('Music') }
    else if(file) { setActiveButton('Files') }
  }, [setActive])


  return (
    <div className='FileNav'>

      <div className='parent-button'>
        <div id='all-icon'className='overlay' onClick={(e) => setActive(e)} ></div>
        <AllButton active={all} />
      </div>

      <div className='parent-button'>
      <div id='pic-icon'className='overlay' onClick={(e) => setActive(e)} ></div>
        <PicButton active={pic} />
      </div>

      <div className='parent-button'>
      <div id='vid-icon'className='overlay' onClick={(e) => setActive(e)} ></div>
        <VidButton active={vid} />
      </div>

      <div className='parent-button'>
      <div id='music-icon'className='overlay' onClick={(e) => setActive(e)} ></div>
        <MusicButton active={music} />
      </div>

      <div className='parent-button'>
      <div id='file-icon'className='overlay' onClick={(e) => setActive(e)} ></div>
        <FileButton active={file} />
      </div>       
    
    </div>
  )
}

export default FileNav;