import api from "./api";

const API_URL = process.env.BASE_URL

class PatientService {
  getPatients(page, limit) {
    return api().get(API_URL + `patient?page=${page}&limit=${limit}`);
  }
  getPatient(id) {
    return api().get(API_URL + `patient/${id}`);
  }
  deletePatient(id) {
    return api().delete(API_URL + `patient/${id}`)
  }
  updateStatus(data){
    return api().put(API_URL + 'patient/update-status', data)
  }
  updateElKadriStatus(data){
    return api().put(API_URL + 'patient/update-el-kadri-registration', data)
  }
}

export default new PatientService();
