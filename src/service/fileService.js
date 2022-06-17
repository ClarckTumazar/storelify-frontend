import axios from "axios";

const STORELIFY_API_BASE_URL 
  = "http://localhost:8080/storelify/api/files"

class FileService {

  saveFile(file) {
    return axios.post(STORELIFY_API_BASE_URL, file);

  }
  
  getAllFiles() {
    return axios.get(STORELIFY_API_BASE_URL);
  }

  deleteAllFiles(fileIdList) {
    return axios.post(STORELIFY_API_BASE_URL + '/delete', fileIdList);
  }
}


export default new FileService();