import api from "../lib/axios";

export default {
	create(data) {
		const token = localStorage.getItem("AUTH_TOKEN");

		return api.post("/appointments/create-appointment", data);
	},
	getByDate(date) {
		return api.get(`/appointments/create-appointment?date=${date}`);
	},
	getUserAppointments(userId) {
		return api.get(`/users/${userId}/appointments`);
	},
	getAppointmentById(id) {
		return api.get(`/appointments/edit-appointment/${id}`);
	},
};
