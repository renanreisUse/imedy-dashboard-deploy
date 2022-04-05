import api from "./api";

const API_URL = process.env.BASE_URL

class NotificationService {
  getNotifications(data) {
    return api().get(API_URL + `notification?${data}`);
  }
  createNotification(data) {
    return api().post(API_URL + "notification", data);
  }
}

export default new NotificationService();
