import "./FileView.css";
import { v4 } from "uuid";

import upload from "./upload-icon.svg";
import cancel from "../../icons/cancel-icon.svg";

import { storage } from "../../firebase";
import { useEffect, useRef, useState } from "react";

import getFileType from "../../utils/getFileType";
import formatFileSize from '../../utils/formatFileSize';
import FileService from "../../service/fileService";
import fileService from "../../service/fileService";
import FileRow from "./FileRow";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const FileView = () => {
  //* this contains who is the current user folder and folderPath.
  const user = "clarck";
  const [currentFolder, setCurrentFolder] = useState("Pictures"); 
  const [folderPath, setFolderPath] = useState(`${user}/${currentFolder}`)



  //* this contains the files metadata to be stored on MySql using Spring Boot.
  const [fileList, setFileList] = useState();



  //* this holds the file data for selected rows/ clicked checkboxes.
  const [firebaseIdList, setFirebaseIdList] = useState([]);
  const [fileIdList, setFileIdList] = useState([]);
  const [fileNameList, setFileNameList] = useState([]);



  //* Other useState and References needed.
  const hiddenFileInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(true);
  const [selectedFileCtr, setSelectedFileCtr] = useState(0);




  //* Parse FILES in TABLE
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




  //* Clicks checkbox PROGRAMMATICALLY
  const handleClick = () => {
    hiddenFileInput.current.click();
  };




  //* UPLOAD file to FireBase
  const uploadToFirebase = (e) => {
    const file = e.target.files[0];
    const fileName = `${file.name}`
    const fileRef = ref( storage, `${folderPath}/${fileName}`);

    console.log(fileList)
    console.log(fileName)
    console.log(fileList.includes(fileName))
    
    let fileExist = false
    fileList.forEach(file => {
      if (file['fileName'] == fileName) {
        fileExist = true
        return 
      }
    });

    if (fileExist) {
      alert("upload error: File name already exist! Change file name to continue")
      return
    }
    
   
    uploadBytes(fileRef, file)
      .then((response) => {
        alert('file uploaded to firebase!')
        console.log(response)
        getDownloadURL(response.ref)
          .then((url) => {
           uploadFileData(file, fileName, url)
          })
      })  
      .catch((error) => {
        alert("file Upload Failed :(");
        return
      });
  };




  //* UPLOAD File Data To MySQL
  const uploadFileData = (file, fileName, url) => {

    const fileExtension = file.name.split('.').pop()
    const fileType = getFileType(fileExtension, file)
    console.log(file)


     let newFileData = {
      firebaseId: fileName,
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




  //* Sets CHECKBOX state to TRUE and updates the UI
  const checkboxClicked = (file) => {  
    document.getElementById('delete-button').classList.remove('hide-button')
    document.getElementById('download-button').classList.remove('hide-button')
    document.getElementById('selected-file-label').classList.remove('hide-button')
    document.getElementById('cancel-button').classList.remove('hide-cancel-button')
    document.getElementById('fileview-title').classList.add('hide-button')
    document.getElementById('fileview-header').classList.add('bg-orange')
    document.getElementById('upload-button').classList.add('hide-button')
    
    if (firebaseIdList.includes(file.firebaseId) === false) {
      setFirebaseIdList((prev) => [...prev, file.firebaseId])
      setFileIdList((prev) => [...prev, file.fileid])
      setFileNameList((prev) => [...prev, [file.fileName, file.fileUrl]])
      setSelectedFileCtr((ctr) => ctr + 1)
      return
    }
    else {
      setFirebaseIdList((prevElement) => {
        return prevElement.filter((id) => id !== file.firebaseId)
      })

      setFileIdList((prevElement) => {
        return prevElement.filter((id) => id !== file.fileid)
      })

      setFileNameList((prevElement) => {
        return prevElement.filter((id) => id[0] !== file.fileName)
      })
      
      selectedFileCtr > 0 && (setSelectedFileCtr((ctr) => ctr - 1))
      return
    }
  }
  console.log(firebaseIdList)
  console.log(fileIdList)
  console.log(selectedFileCtr)




  //* Unchecks all the checkbox clicked
  const uncheckedAll = () => {
    let checkboxList = document.getElementsByClassName('td-checkbox')
    let size = fileList?.length
    let ctr = 0

    for(ctr; ctr < size; ctr++) {
      if (checkboxList[ctr].checked === true) {
        checkboxList[ctr].click()
      }
    }
  }




  //* Deletes all the selected file. 
  const deleteSelectedFile = () => {
    //* delete in firebase
    firebaseIdList.map((firebaseId) => {
      return (
        deleteObject(ref(storage, `${folderPath}/${firebaseId}`))
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log('file deletion failed :(')
            console.log(error)
          }))
    })

    //* delete in sql
    fileService.deleteAllFiles(fileIdList)
      .then((response) => {
        console.log(response)
        alert('SUCCESFULL DELETION MYSQL')
      })
      .catch((error) => {
        console.log(error)
        alert('Failed to delete all in mysql')
      })

    uncheckedAll();
    setRender(true);
  }



  //* Downloads all the selected file. 
  const downloadSelectedFile = () => {
    alert('im clicked! download')
    console.log(fileNameList)
    fileNameList.map((file) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = file[0]; // first element in file array is fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      };
      xhr.open('GET', file[1]); // second element in file arrat is the downloadUrl
      xhr.send();
    })
    uncheckedAll();
  }




  //* hides the delete and downlaod button when no file selected.
  useEffect(() => {
    if (selectedFileCtr === 0){
      document.getElementById('delete-button').classList.add('hide-button')
      document.getElementById('download-button').classList.add('hide-button')
      document.getElementById('selected-file-label').classList.add('hide-button')
      document.getElementById('cancel-button').classList.add('hide-cancel-button')
      document.getElementById('fileview-title').classList.remove('hide-button')
      document.getElementById('fileview-header').classList.remove('bg-orange')
      document.getElementById('upload-button').classList.remove('hide-button')
    }
  }, [selectedFileCtr])
  



  return (
    <div className="FileView">
      <header className="fileview-header" id="fileview-header">
        <div id="fileview-title">{currentFolder}</div>
        <div className="button hide-cancel-button" id="cancel-button" onClick={uncheckedAll}><img src={cancel} alt="x" height={28} /></div>
        <div className="button-group">
          <div 
            className="button" 
            id="selected-file-label">
            Selected {selectedFileCtr} file{selectedFileCtr > 1 && (<>s</>)} |
          </div>
          <div 
            className="button hide-button" 
            id="download-button"
            onClick={downloadSelectedFile}>
            Download {selectedFileCtr > 1 &&(<>all</>)}
          </div>
          <div 
            className="button hide-button" 
            id="delete-button"
            onClick={deleteSelectedFile}>
            Delete {selectedFileCtr > 1 &&(<>all</>)}
          </div>
          <div 
            className="button" 
            id="upload-button" 
            onClick={handleClick}>
            <img
              className="upload-button-icon"
              src={upload}
              alt="upload-button"
            />
            Upload
          </div>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={(e) => uploadToFirebase(e)}
            style={{ display: "none" }}
          />
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th className="th-name">Name</th>
            <th className="th-type">Type</th>
            <th className="th-size">Size</th>
            <th className="th-action">
            <input 
              type='checkbox' 
              onChange={(e) => console.log(e.target.value)}
            />
            </th>
          </tr>
        </thead>


        {!loading && (
          <tbody>
            {fileList?.length > 0 ? (
              fileList.map((file) => (
                <FileRow file={file} checkboxClicked={checkboxClicked} key={file.fileid} />
            ))) : (
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
