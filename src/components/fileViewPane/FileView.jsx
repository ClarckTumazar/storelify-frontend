import upload from "./upload-icon.svg";
import "./FileView.css";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import formatFileSize from '../../utils/formatFileSize';
import { v4 } from "uuid";

const FileView = () => {
  //* this contains who is the current user.
  const user = "clarck";


  //* this sets the state for what folder is currently accessed.
  const [currentFolder, setCurrentFolder] 
    = useState("images"); 


  //* this  contains the list of files being fetched.
  const [fileList, setFileList] 
    = useState([]);


  //* this contains the files metadata to be stored on MySql using Spring Boot.
  const [fileData, setFileData] 
    = useState({
      fileName: "",
      fileType: "",
      fileSize: "",
    });


  //* this is the path in the firebase storage in where to store the files.
  const [folderPath, setFolderPath] 
    = useState(`${user}/${currentFolder}`)


  //* this is used as a reference to accessed an input tag using another div.
  const hiddenFileInput = useRef(null);


  //* this is the function that clicks the input tag programmatically.
  const handleClick = () => {
    hiddenFileInput.current.click();
  };


  //* this handles the change in file input and uploads the file in firebase.
  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileRef = ref( storage, `${folderPath}/${file.name + v4()}`);

    let newFileData = {
      fileName: file.name,
      fileType: file.type,
      fileSize: formatFileSize(file.size),
    };
    setFileData((prev) => ({...prev, ...newFileData}));

    uploadBytes(fileRef, file)
      .then((response) => {
        console.log(response);
        alert("file Uploaded!");
      })

      .catch((error) => {
        alert("file Upload Failed :(");
        return
      });
  };
  console.log(fileData);



//* this functions runs and parse the list of all files in the current folder.
  useEffect(() => {
    listAll(ref(storage, folderPath))
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item)
            .then((url) => {
              setFileList((prev) => [...prev, url]);
            })
            .catch((error) => {
              alert("error in setting the file list");
            });
        });
      })
      .catch((error) => {
        alert("unable to get list of files");
      });
  },[]);

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
          Upload
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
        <tbody>
          <tr>
            <td className="td-name">Clarck.jpeg</td>
            <td>PDF</td>
            <td>4MB</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FileView;
