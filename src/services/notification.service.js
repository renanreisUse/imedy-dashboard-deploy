import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class NotificationService {
  getNotifications() {
    return api().get(API_URL + "notification");
  }
  createNotifications(data) {
    return api().post(API_URL + "notification", data);
  }
}

export default new NotificationService();
