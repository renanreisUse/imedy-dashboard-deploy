import api from "./api";

const API_URL = process.env.BASE_URL

class BannerService {
  getBanners(page, limit) {
    return api().get(API_URL + `banner?page=${page}&limit=${limit}`);
  }
  getBanner(id) {
    return api().get(API_URL + `banner/${id}`);
  }
  createBanner(data) {
    return api().post(API_URL + "banner", data);
  }
  updateBannerStatus(data){
    return api().put(API_URL + "banner/update-status", data);
  }
}

export default new BannerService();
