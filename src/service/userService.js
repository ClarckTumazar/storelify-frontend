import axios from "axios";

const STORELIFY_API_BASE_URL 
  = "http://localhost:8080/storelify/api/user"

class UserService {

  saveUser(user) {
    return axios.post(STORELIFY_API_BASE_URL, user);
  }
  
  checkUser(user) {
    return axios.post(STORELIFY_API_BASE_URL + "/check", user);
  }
  
  checkPassword(user) {
    return axios.post(STORELIFY_API_BASE_URL + "/match", user);
  }
}


export default new UserService();