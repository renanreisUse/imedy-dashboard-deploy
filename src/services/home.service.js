import api from "./api";

const API_URL = process.env.BASE_URL

class HomeService {
  getHomeData() {
    return api().get(API_URL + "/home/dashboard");
  }
}

export default new HomeService();
