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
  updateElKadriRegistration(data){
    return api().put(API_URL + 'doctor/update-el-kadri-registration', data)
  }
  approveDocuments(data){
    return api().put(API_URL + 'doctor/approve', data)
  }
  disapproveDocuments(data){
    return api().put(API_URL + 'doctor/disapprove', data)
  }
  updateMedicalAppointment(id, data){
    return api().patch(API_URL + `doctor/${id}/medical-appointment`, data)
  }
}

export default new DoctorService();
