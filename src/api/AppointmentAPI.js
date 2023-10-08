import api from "../lib/axios";

export default {
	create(data) {
		const token = localStorage.getItem("AUTH_TOKEN");

		return api.post("/appointments/create-appointment", data);
	},
	getByDate(date) {
		return api.get(`/appointments/create-appointment?date=${date}`);
	},
};
