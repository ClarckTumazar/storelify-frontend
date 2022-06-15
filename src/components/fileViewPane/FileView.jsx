import upload from './upload-icon.svg';
import './FileView.css';
import { useEffect, useRef, useState } from 'react';
import { storage }  from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';   

const FileView = () => {

  const [currentFolder, setCurrentFolder] = useState('images');
  const [fileList, setFileList ] = useState([]);
  const user = 'clarck';
  const hiddenFileInput = useRef(null);  
  

  const handleClick = () => {
    hiddenFileInput.current.click();
  };


  const folderRef = ref(storage, `${user}/${currentFolder}`)
  
  const handleChange = (e) => {
    const fileToUpload = e.target.files[0];
    const fileRef = ref(storage, `${user}/${currentFolder}/${fileToUpload.name + v4()}`)

    uploadBytes(fileRef, fileToUpload)
      .then((response) => {
        console.log(response)
        alert('file Uploaded!')
      })
      .catch((error) => {
        alert('file Upload Failed :(')
      })

    console.log(fileToUpload)
  }

  useEffect(() => {
    listAll(folderRef)
      .then((response) => {
        console.log(response.items)
        response.items.forEach((item) =>{ 
          getDownloadURL(item)
          .then((url) =>{
            setFileList((prev) => [...prev, url]) 
          })
          .catch((error) => {
            alert("error in setting the file list")
          })
        })
      })
      .catch((error) => {
        alert('unable to get list of files')
      })
  
    }, [])

    console.log(fileList[0]);



  return (
    <div className="FileView">
      <header>
        <div>{currentFolder}</div>
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