import api from "./api";

const API_URL = process.env.BASE_URL

class AuthService {
  login(user) {
    return api()
      .post(API_URL + "auth", { ...user })
      .then(({ data }) => {
        localStorage.setItem("token", data.token.accessToken);
        localStorage.setItem("user", JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          image: data.user.image,
          status: data.user.status,
          roles: data.user.roles,
          token: data.user.token
        }));
      });
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  
  recoveryPassword(email){
    return api().post(API_URL + "auth/recovery-password", email);
  }
  
  updatePassword(data){
    return api().put(API_URL + "auth/update-password", data);
  }

  updatePasswordDoctor(data){
    return api().put(API_URL + "auth/doctor/update-password", data);
  }

  updatePasswordPatient(data){
    return api().put(API_URL + "auth/patient/update-password", data);
  }
}

export default new AuthService();
