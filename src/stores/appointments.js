import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";

export const useAppointmentsStore = defineStore("appointments", () => {
	const services = ref([]);
	const appointmentDate = ref("");
	const appointmentHours = ref([]);
	const appointmentTime = ref("");

	onMounted(() => {
		const startHour = 7;
		const endHour = 18;

		for (let hour = startHour; hour <= endHour; hour++) {
			appointmentHours.value.push(`${hour}:00`);
		}
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

	function createAppointment() {
		const appointment = {
			services: services.value.map((service) => service._id),
			date: appointmentDate.value,
			time: appointmentTime.value,
			totalAmount: totalAmount.value,
		};
	}

	const isServiceSelected = computed(() => {
		return (id) => services.value.some((service) => service._id === id);
	});

	const noServicesSelected = computed(() => services.value.length === 0);

	const totalAmount = computed(() => {
		return services.value.reduce((total, service) => total + service.price, 0);
	});

	const isValidReservation = computed(() =>
		Boolean(services.value && appointmentDate.value && appointmentTime.value)
	);

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
	};
});
