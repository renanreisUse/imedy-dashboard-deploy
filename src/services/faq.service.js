import api from "./api";

const API_URL = process.env.BASE_URL;

class FaqService {
  getAllFaqs(recipients, page, limit) {
    return api().get(API_URL + `faq/${recipients}?page=${page}&limit=${limit}`);
  }
  getFaq(id) {
    return api().get(API_URL + `faq/detail/${id}`);
  }
  updateFaq(id, data) {
    return api().put(API_URL + `faq/${id}`, data);
  }
  getPhoneNumber() {
    return api().get(API_URL + "faq/phone-number");
  }
  updatePhoneNumber(data) {
    return api().put(API_URL + "faq/phone-number", data);
  }
  createFaq(data) {
    return api().post(API_URL + `faq`, data);
  }
  deleteFaq(id) {
    return api().delete(API_URL + `faq/${id}`);
  }
}

export default new FaqService();
