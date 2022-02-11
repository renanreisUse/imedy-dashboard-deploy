import api from "./api";

const API_URL = process.env.BASE_URL

class FileService {
  getImageUrl(file) {
    return api().post(API_URL + "file", file);
  }
}

export default new FileService();
