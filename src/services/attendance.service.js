import api from "./api";

const API_URL = process.env.BASE_URL;

class AttendanceService {
    getNextByDoctorId(id) {
        return api().get(API_URL + `attendance/doctor/${id}`);
    };
    getAllByFilter(data) {
        return api().get(API_URL + `attendance/list-all?${data}`);
    };
    cancelAttendance(id) {
        return api().put(API_URL + `attendance/canceled-by-admin/${id}`)
    };
}

export default new AttendanceService();