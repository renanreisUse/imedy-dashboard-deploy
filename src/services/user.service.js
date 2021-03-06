import api from "./api";

const API_URL = process.env.BASE_URL

class UserService {
  getAdmins(data) {
    return api().get(API_URL + `user/admin?${data}`);
  }
  getAdmin(id) {
    return api().get(API_URL + `user/admin/${id}`);
  }
  queryUsers(user) {
    return api().get(API_URL + `user?page=1&limit=10&query=${user}`);
  }
  createUserAdmin(data) {
    return api().post(API_URL + "user/admin", data);
  }
  updateAdminName(name) {
    return api().put(API_URL + "user/admin/update-name", name);
  }
  updateAdminStatus(status) {
    return api().put(API_URL + "user/admin/update-status", status);
  }
  deleteAdmin(id) {
    return api().delete(API_URL + `user/admin/${id}`);
  }
}

export default new UserService();
