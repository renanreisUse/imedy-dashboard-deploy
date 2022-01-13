import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class UserService {
  getAdmins(page, limit){
    return api().get(API_URL + `user?page=${1}&limit=${10}`)
  }
  getAdmin(id){
    return api().get(API_URL + `user/admin/${id}`)
  }
  createUserAdmin(data){
    return api().post(API_URL + 'user/admin', data)
  }
  deleteAdmin(){
    return api().delete(API_URL + 'user/admin')
  }
  queryUsers(user) {
    return api().get(API_URL + `user?query=${user}`);
  }
}

export default new UserService();
