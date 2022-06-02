import api from "./api";

const API_URL = process.env.BASE_URL;

class AttendanceService {
    getAllByFilter(data) {
        return api().get(API_URL + `attendance/list-all?${data}`);
    }
}

export default new AttendanceService();