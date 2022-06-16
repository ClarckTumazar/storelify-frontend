import upload from "./upload-icon.svg";
import "./FileView.css";
import { storage } from "../../firebase";
import { useEffect, useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import formatFileSize from '../../utils/formatFileSize';
import FileService from "../../service/fileService";
import getFileType from "../../utils/getFileType";
import { v4 } from "uuid";

const FileView = () => {
  //* this contains who is the current user.
  const user = "clarck";

  //* this sets the state for what folder is currently accessed.
  const [currentFolder, setCurrentFolder] = useState("images"); 
  
  //* this is the path in the firebase storage in where to store the files.
  const [folderPath, setFolderPath] = useState(`${user}/${currentFolder}`)

  //* this contains the files metadata to be stored on MySql using Spring Boot.
  const [fileList, setFileList] = useState();
  
  //* this is used as a reference to accessed an input tag using another div.
  const hiddenFileInput = useRef(null);

  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(true);


  //* this functions runs and parse the list of all files in the current folder.
  useEffect(() => {
    setLoading(true)
    FileService.getAllFiles()
      .then((response) => {
        console.log(response.data)
        setFileList(response.data)
      })
      .catch((error) => {
        console.log(error)
        alert('failed to get All files!')
      });
    setLoading(false)
    setRender(false)
  },[render]);


  //* this is the function that clicks the input tag programmatically.
  const handleClick = () => {
    hiddenFileInput.current.click();
  };


  //* this handles the change in file input and uploads the file in firebase.
  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileRef = ref( storage, `${folderPath}/${file.name + v4()}`);
   

    //* uploads the file in the firebase
    uploadBytes(fileRef, file)
      .then((response) => {
        alert('file uploaded to firebase!')
        console.log(response)
        getDownloadURL(response.ref)
          .then((url) => {
           uploadFileData(file, url)
          })
      })  
      .catch((error) => {
        alert("file Upload Failed :(");
        return
      });
  };



  //* function to upload the file Data in MySql.
  const uploadFileData = (file, url) => {

    const fileExtension = file.name.split('.').pop()
    const fileType = getFileType(fileExtension)

     //* sets the file metadata to be sent to spring boot   
     let newFileData = {
      fileName: file.name,
      fileType: fileType,
      fileSize: formatFileSize(file.size),
      fileUrl: url,
    };

    //* sends the file metadata in the backend (MySQL)
    FileService.saveFile(newFileData)
      .then((response) => {
        alert('fileData uploaded to MySql!')
        setRender(true)
      })
      .catch((error) => {
        alert("error fileservice!");
      });
  }


  return (
    <div className="FileView">
      <header>
        <div>{currentFolder}</div>
        <div className="upload-button" onClick={handleClick}>
          <img
            className="upload-button-icon"
            src={upload}
            alt="upload-button"
          />
          Upload file
        </div>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={(e) => handleChange(e)}
          style={{ display: "none" }}
        />
      </header>
      <table>
        <thead>
          <tr>
            <th className="th-name">Name</th>
            <th className="th-type">Type</th>
            <th className="th-size">Size</th>
            <th className="action-col"></th>
          </tr>
        </thead>


        {!loading && (
          <tbody>
            {fileList?.length > 0 ? (
              fileList.map((file) => (
                <tr className='tr-item' key={file.fileid}>
                  <td className="td-name">{file.fileName}</td>
                  <td>{file.fileType}</td>
                  <td>{file.fileSize}</td>
                  <td><input type='checkbox' /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No files found!</td>
                <td></td>
                <td></td>
                <td></td>
                
                </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default FileView;
