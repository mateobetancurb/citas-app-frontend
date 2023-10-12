import api from "../lib/axios";

export default {
	create(data) {
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
	updateAppointment(id, data) {
		return api.put(`/appointments/edit-appointment/${id}`, data);
	},
	deleteAppointment(id) {
		return api.delete(`/appointments/delete-appointment/${id}`);
	},
};
