import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class AuthService {
  login(user) {
    return api()
      .post(API_URL + "auth", { ...user })
      .then(({ data }) => {
        localStorage.setItem("token", data.token.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      });
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  
  recoveryPassword(email){
    return api().post(API_URL + "/auth/recovery-password", email);
  }
  
  updatePassword(data){
    return api().put(API_URL + "/auth/update-password", data);
  }
}

export default new AuthService();
