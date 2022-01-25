import api from "./api";

const API_URL = "https://api.imedyapp.com.br/"

class NotificationService {
  getNotifications(page, limit) {
    return api().get(API_URL + `notification?page=${page}&limit=${limit}`);
  }
  createNotification(data) {
    return api().post(API_URL + "notification", data);
  }
}

export default new NotificationService();
