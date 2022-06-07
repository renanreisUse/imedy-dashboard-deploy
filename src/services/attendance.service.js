import api from "./api";

const API_URL = process.env.BASE_URL;

class AttendanceService {
    getDoctorAvailableHours(id, date) {
        return api().get(API_URL + `attendance/available-hours/${id}?${date}`);
    };
    getNextByDoctorId(id) {
        return api().get(API_URL + `attendance/doctor/${id}`);
    };
    getAllByFilter(data) {
        return api().get(API_URL + `attendance/list-all?${data}`);
    };
    rescheduleAttendance(id, newDate) {
        return api().put(API_URL + `attendance/reschedule/${id}`, { newDate })
    };
    cancelAttendance(id) {
        return api().put(API_URL + `attendance/canceled-by-admin/${id}`)
    };
}

export default new AttendanceService();