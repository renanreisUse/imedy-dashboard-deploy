import api from "./api";

const API_URL = "https://api.imedyapp.com.br/";

class DoctorService {
  getDoctors() {
    return api().get(API_URL + "doctor");
  }
  deleteDoctor(id) {
    return api().delete(API_URL + `doctor/${id}`)
  }
  batchDoctor(formData){
    return api().post(API_URL + 'doctor/batch', formData)
  }
}

export default new DoctorService();
