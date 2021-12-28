import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class FileService {
  getImageUrl(file) {
    return api().post(API_URL + "file", file);
  }
}

export default new FileService();
