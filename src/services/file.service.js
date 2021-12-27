import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class FileService {
  createBanner(formData) {
    return api().post(API_URL + "file", formData);
  }
}

export default new FileService();
