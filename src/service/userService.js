import axios from "axios";

const STORELIFY_API_BASE_URL 
  = "http://localhost:8080/storelify/api/user"

class UserService {

  saveUser(user) {
    return axios.post(STORELIFY_API_BASE_URL, user);

  }
  
  
}


export default new UserService();