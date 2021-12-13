import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class UserService {
  queryUsers(user) {
    return api().get(API_URL + `user?query=${user}`);
  }
}

export default new UserService();
