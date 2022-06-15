import upload from './upload-icon.svg';
import './FileView.css';
import { useRef, useState } from 'react';

const FileView = () => {
  const [title, setTitle] = useState('All');
  const hiddenFileInput = useRef(null);  

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded)
  }

  return (
    <div className="FileView">
      <header>
        <div>{title}</div>
        <div className='upload-button' onClick={handleClick}>
          <img className="upload-button-icon" src={upload} alt="upload-button" />
          Upload
        </div>
        <input type="file" ref={hiddenFileInput} onChange={(e) => handleChange(e)} style={{display:'none'}} />
      </header>
      <table>
        <thead>
          <tr>
            <th className='th-name'>Name</th>
            <th className='th-type'>Type</th>
            <th className='th-size'>Size</th>
            <th className='action-col'></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='td-name'>Clarck.jpeg</td>
            <td>PDF</td>
            <td>4MB</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FileView;