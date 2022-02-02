import api from "./api";

const API_URL = process.env.BASE_URL

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
  updateStatus(data){
    return api().put(API_URL + 'doctor/update-status', data)
  }
  approveDocuments(data){
    return api().put(API_URL + 'doctor/approve', data)
  }
}

export default new DoctorService();
