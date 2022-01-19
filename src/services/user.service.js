import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class UserService {
  getAdmins(page, limit) {
    return api().get(API_URL + `user/admin?page=${page}&limit=${limit}`);
  }
  getAdmin(id) {
    return api().get(API_URL + `user/admin/${id}`);
  }
  createUserAdmin(data) {
    return api().post(API_URL + "user/admin", data);
  }
  updateAdminName(name) {
    return api().put(API_URL + "user/admin/update-name", name);
  }
  deleteAdmin(id) {
    return api().delete(API_URL + `user/admin/${id}`);
  }
  queryUsers(user) {
    return api().get(API_URL + `user?query=${user}`);
  }
}

export default new UserService();
