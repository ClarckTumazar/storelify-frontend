import "./FileView.css";
import { v4 } from "uuid";

import upload from "./upload-icon.svg";
import cancel from "../../icons/cancel-icon.svg";

import { storage } from "../../firebase";
import { useEffect, useRef, useState } from "react";

import {
  getFileType,
  imageExt,
  vidExt,
  audioExt,
  fileExt,
} from "../../utils/getFileType";
import FileService from "../../service/fileService";
import fileService from "../../service/fileService";
import FileRow from "./FileRow";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import StoragePane from "./StoragePane";

const FileView = ({ userEmail, activeButton }) => {
  //* this contains who is the current userEmail folder and folderPath.
  console.log(">>>>>>RE-RENDERING FILEVIEW<<<<<<<")
  const [currentFolder, setCurrentFolder] = useState("");
  const [folderPath, setFolderPath] = useState(`${userEmail}`);

  //* this contains the files metadata to be stored on MySql using Spring Boot.
  const [fileList, setFileList] = useState();
  const [filteredList, setFilteredList] = useState();

  //* this holds the file data for selected rows/ clicked checkboxes.
  const [fileIdList, setFileIdList] = useState([]);
  const [fileNameAndUrlList, setFileNameAndUrlList] = useState([]);

  //* Other useState and References needed.
  const hiddenFileInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(true);
  const [selectedFileCtr, setSelectedFileCtr] = useState(0);
  const [totalFileSize, setTotalFileSize] = useState();


  


  //* Parse FILES in TABLE
  useEffect(() => {
    setLoading(true);
    console.log("USE EFFECT: GET-ALL-FILES (render, activebutton)");
    setCurrentFolder(activeButton);
    FileService.getAllFiles(userEmail)
      .then((response) => {
        console.log(response.data);
        setFileList(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("failed to get All files!");
      });
    setLoading(false);
    setRender(false);
  }, [render, activeButton]); 

  console.log(`fileList: ${fileList?.length}`);
  console.log(`render value: ${render}`)
  console.log(`Current active button: ${activeButton}`);



//* sets the FilteredList to the original
  useEffect(() => {
    console.log("USE EFFECT: SET FILTERED LIST, GET FILE SIZE (fileList)");
    setFilteredList(fileList);
    getFileSize();
  }, [fileList]);
  console.log(`filtered List size: ${filteredList?.length}`)
  console.log(`Current total file size: ${totalFileSize}`)


  //* Get the total size of all files in the List
  const getFileSize = () => {
    console.log("FUNCTION: GetFileSize")
    let tFileSize = 0
    if (fileList?.length !== 0) {
      fileList?.map((file) => {
        //setTotalFileSize((prev) => [...prev, prev + file.fileSize])
        tFileSize = tFileSize + file.fileSize;
      });
    }
    console.log(`tFileSize: ${tFileSize}`)
    setTotalFileSize(tFileSize)

  };
  
  //* Filter the list based on active button
  useEffect(() => {
    console.log(`USE EFFECT: Filtering the list`);
    if (activeButton === "Pictures") {
      setFilteredList((prevElement) => {
        return prevElement.filter((file) =>
          imageExt.hasOwnProperty(file.fileName.split(".").pop())
        );
      });
    }

    if (activeButton === "Videos") {
      setFilteredList((prevElement) => {
        return prevElement.filter((file) =>
          vidExt.hasOwnProperty(file.fileName.split(".").pop())
        );
      });
    }

    if (activeButton === "Music") {
      setFilteredList((prevElement) => {
        return prevElement.filter((file) =>
          audioExt.hasOwnProperty(file.fileName.split(".").pop())
        );
      });
    }

    if (activeButton === "Files") {
      setFilteredList((prevElement) => {
        return prevElement.filter((file) =>
          fileExt.hasOwnProperty(file.fileName.split(".").pop())
        );
      });
    }
  }, [fileList, currentFolder]);
  console.log(`filteredList: ${filteredList?.length}`)

 


  //* Clicks checkbox PROGRAMMATICALLY
  const handleClick = () => {
    hiddenFileInput.current.click();
  };


  //* Deletes all the selected file.
  const deleteSelectedFile = () => {

    //* Delete first in firebase
    fileNameAndUrlList.map((file) => {
      return deleteObject(ref(storage, `${folderPath}/${file[0]}`))
        .then((response) => {
        })
        .catch((error) => {
          console.log("file deletion failed :(");
          console.log(error);
        });
    });
    deleteFilesInMySql()
  };

  
  //* delete in sql 
  const deleteFilesInMySql = () => {
    fileService.deleteAllFiles(fileIdList)     
      .then((response) => {
        alert("SUCCESFULL DELETION MYSQL")
        uncheckedAll()
        setRender(true)
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete all in mysql");
      });
  }    



  //* UPLOAD file to Firebase
  const uploadToFirebase = (e) => {
    const file = e.target.files[0];
    const fileName = `${file.name}`;
    const fileRef = ref(storage, `${folderPath}/${fileName}`);

    // console.log(fileList);
    // console.log(fileName);
    // console.log(fileList.includes(fileName));

    let fileExist = false;
    fileList.forEach((file) => {
      if (file["fileName"] === fileName) {
        fileExist = true;
        return;
      }
    });

    if (fileExist) {
      alert(
        "upload error: File name already exist! " + 
        "Change file name to continue"
      );
      return;
    }

    uploadBytes(fileRef, file)
      .then((response) => {
        alert("file uploaded to firebase!");
        console.log(`upload firebase response: ${response}`);
        getDownloadURL(response.ref).then((url) => {
          uploadFileData(file, url);
        });
      })
      .catch((error) => {
        alert("file Upload Failed :(");
        return;
      });
  };

  //* UPLOAD File Data To MySQL
  const uploadFileData = (file, url) => {
    const fileExtension = file.name.split(".").pop();
    const fileType = getFileType(fileExtension, file);
    // console.log(file);
    // console.log(formatFileSize(file.size));

    let newFileData = {
      userEmail: userEmail,
      fileName: file.name,
      fileType: fileType,
      fileSize: file.size,
      fileUrl: url,
    };

    // console.log(file.size);
    // console.log(file.size + file.size);

    //* sends the file metadata in the backend (MySQL)
    FileService.saveFile(newFileData)
      .then((response) => {
        alert("fileData uploaded to MySql!");
        setRender(true);
      })
      .catch((error) => {
        alert("error fileservice!");
      });
  };

  //* Sets CHECKBOX state to TRUE and updates the UI
  const checkboxClicked = (file) => {
    document.getElementById("delete-button").classList.remove("hide-button");
    document.getElementById("download-button").classList.remove("hide-button");
    document
      .getElementById("selected-file-label")
      .classList.remove("hide-button");
    document
      .getElementById("cancel-button")
      .classList.remove("hide-cancel-button");
    document.getElementById("fileview-title").classList.add("hide-button");
    document.getElementById("fileview-header").classList.add("bg-orange");
    document.getElementById("upload-button").classList.add("hide-button");

    if (fileIdList.includes(file.fileid) === false) {
      setFileIdList((prev) => [...prev, file.fileid]);
      setFileNameAndUrlList((prev) => [...prev, [file.fileName, file.fileUrl]]);
      setSelectedFileCtr((ctr) => ctr + 1);
      return;
    } else {
      setFileIdList((prevElement) => {
        return prevElement.filter((id) => id !== file.fileid);
      });

      setFileNameAndUrlList((prevElement) => {
        return prevElement.filter((id) => id[0] !== file.fileName);
      });

      selectedFileCtr > 0 && setSelectedFileCtr((ctr) => ctr - 1);
      return;
    }
  };
  console.log(`selected id list: ${fileIdList}`);
  console.log(`selected row counter: ${selectedFileCtr}`);



  //* Unchecks all the checkbox clicked
  const uncheckedAll = () => {
    let checkboxList = document.getElementsByClassName("td-checkbox");
    let size = filteredList?.length;
    let ctr = 0;

      
    for (ctr; ctr < size; ctr++) {
      if (checkboxList[ctr].checked === true) {
        console.log(checkboxList[ctr])
        checkboxList[ctr].click();
      }
    }
  };

  //* Checks all the checkbox clicked
  const checkedAll = () => {
    let checkboxList = document.getElementsByClassName("td-checkbox");
    let size = fileList?.length;
    let ctr = 0;

    console.log(checkboxList)
    for (ctr; ctr < size; ctr++) {
      if (checkboxList[ctr].checked === false) {
        checkboxList[ctr].click();
      }
    }
  };

    
 
  //* Downloads all the selected file.
  const downloadSelectedFile = () => {
    console.log(`downloading: ${fileNameAndUrlList}`);
    fileNameAndUrlList.map((file) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = file[0]; // first element in file array is fileName
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      xhr.open("GET", file[1]); // second element in file arrat is the downloadUrl
      xhr.send();
    });
    uncheckedAll();
  };

  //* hides the delete and downlaod button when no file selected.
  useEffect(() => {
    if (selectedFileCtr === 0) {
      document.getElementById("delete-button").classList.add("hide-button");
      document.getElementById("download-button").classList.add("hide-button");
      document
        .getElementById("selected-file-label")
        .classList.add("hide-button");
      document
        .getElementById("cancel-button")
        .classList.add("hide-cancel-button");
      document.getElementById("fileview-title").classList.remove("hide-button");
      document.getElementById("fileview-header").classList.remove("bg-orange");
      document.getElementById("upload-button").classList.remove("hide-button");
    }
  }, [selectedFileCtr]);

  return (
    <div className="FileView">
        <StoragePane storage={totalFileSize} />
        <header className="fileview-header" id="fileview-header">
          <div id="fileview-title">{currentFolder}</div>
          <div
            className="button hide-cancel-button"
            id="cancel-button"
            onClick={uncheckedAll}
          >
            <img src={cancel} alt="x" height={28} />
          </div>
          <div className="button-group">
            <div className="button" id="selected-file-label">
              Selected {selectedFileCtr} file{selectedFileCtr > 1 && <>s</>} |
            </div>
            <div
              className="button hide-button"
              id="download-button"
              onClick={downloadSelectedFile}
            >
              Download {selectedFileCtr > 1 && <>all</>}
            </div>
            <div
              className="button hide-button"
              id="delete-button"
              onClick={deleteSelectedFile}
            >
              Delete {selectedFileCtr > 1 && <>all</>}
            </div>
            <div className="button" id="upload-button" onClick={handleClick}>
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
      <div className="fileViewBody">
        <table>
          <thead>
            <tr>
              <th className="th-name">Name</th>
              <th className="th-type">Type</th>
              <th className="th-size">Size</th>
              <th className="th-action">
                <input
                  type="checkbox"
                  onChange={(e) => console.log(e.target.value)}
                />
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {filteredList?.length > 0 ? (
                filteredList.map((file) => (
                  <FileRow
                    file={file}
                    checkboxClicked={checkboxClicked}
                    key={file.fileid}
                  />
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
    </div>
  );
};

export default FileView;
