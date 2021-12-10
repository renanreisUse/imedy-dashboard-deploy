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
    localStorage.removeItem("token");
  }
}

export default new AuthService();
