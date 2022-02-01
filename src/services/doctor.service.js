import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class DoctorService {
  getDoctors(page, limit) {
    return api().get(API_URL + `doctor?page=${page}&limit=${limit}`);
  }
  getDoctor(id){
    return api().get(API_URL + `doctor/${id}`);
  }
  deleteDoctor(id) {
    return api().delete(API_URL + `doctor/${id}`)
  }
  batchDoctor(formData){
    return api().post(API_URL + 'doctor/batch', formData)
  }
}

export default new DoctorService();
