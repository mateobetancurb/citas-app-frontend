import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AppointmentAPI from "../api/AppointmentAPI";
import { formatDateISO } from "../helpers";

export const useAppointmentsStore = defineStore("appointments", () => {
	const services = ref([]);
	const appointmentDate = ref("");
	const appointmentHours = ref([]);
	const appointmentTime = ref("");
	const appointmentsByDate = ref([]);

	const toast = inject("toast");
	const router = useRouter();

	onMounted(() => {
		const startHour = 7;
		const endHour = 18;

		for (let hour = startHour; hour <= endHour; hour++) {
			appointmentHours.value.push(`${hour}:00`);
		}
	});

	watch(appointmentDate, async () => {
		appointmentTime.value = "";
		if (appointmentDate.value === "") return;

		const { data } = await AppointmentAPI.getByDate(appointmentDate.value);
		appointmentsByDate.value = data;
	});

	function onServiceSelected(service) {
		if (
			services.value.some(
				(selectedService) => selectedService._id === service._id
			)
		) {
			services.value = services.value.filter(
				(selectedService) => selectedService._id !== service._id
			);
		} else {
			if (services.value.length === 2) {
				alert("Máximo 2 servicios por cita");
				return;
			}
			services.value.push(service);
		}
	}

	async function createAppointment() {
		const appointment = {
			services: services.value.map((service) => service._id),
			date: formatDateISO(appointmentDate.value),
			time: appointmentTime.value,
			totalAmount: totalAmount.value,
		};
		try {
			const { data } = await AppointmentAPI.create(appointment);
			toast.open({
				message: data.msg,
				duration: 5000,
				type: "success",
			});
			router.push({ name: "my-appointments" });
			clearAppointmentData();
		} catch (error) {
			console.log();
		}
	}

	function clearAppointmentData() {
		services.value = [];
		appointmentDate.value = "";
		appointmentTime.value = "";
	}

	const isServiceSelected = computed(() => {
		return (id) => services.value.some((service) => service._id === id);
	});

	const noServicesSelected = computed(() => services.value.length === 0);

	const totalAmount = computed(() => {
		return services.value.reduce((total, service) => total + service.price, 0);
	});

	const isDateSelected = computed(() => {
		return appointmentDate.value ? true : false;
	});

	const isValidReservation = computed(() =>
		Boolean(services.value && appointmentDate.value && appointmentTime.value)
	);

	const disableTime = computed(() => {
		return (hour) => {
			return appointmentsByDate.value.find(
				(appointment) => appointment.time === hour
			);
		};
	});

	return {
		isServiceSelected,
		services,
		appointmentDate,
		appointmentHours,
		appointmentTime,
		totalAmount,
		noServicesSelected,
		isValidReservation,
		onServiceSelected,
		createAppointment,
		isDateSelected,
		disableTime,
	};
});
