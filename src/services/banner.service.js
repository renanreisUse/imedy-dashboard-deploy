import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class BannerService {
  getBanners() {
    return api().get(API_URL + "banner");
  }
  createBanner(data) {
    return api().post(API_URL + "banner", data);
  }
}

export default new BannerService();
