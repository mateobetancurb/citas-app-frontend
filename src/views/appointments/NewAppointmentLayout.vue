<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAppointmentsStore } from "../../stores/appointments";

const route = useRoute();
const appointmentsStore = useAppointmentsStore();

onMounted(() => {
	appointmentsStore.clearAppointmentData();
});
</script>

<template>
	<nav class="my-5 flex gap-3">
		<RouterLink
			:to="{ name: 'new-appointment' }"
			class="flex-1 text-center p-3 font-extrabold transition-colors hover:bg-blue-600 hover:text-white rounded-xl"
			:class="
				route.name === 'new-appointment'
					? 'bg-blue-700 text-white'
					: 'bg-white text-blue-500'
			"
		>
			Servicios
		</RouterLink>
		<RouterLink
			:to="{ name: 'appointment-details' }"
			class="flex-1 text-center p-3 font-extrabold transition-colors hover:bg-blue-600 hover:text-white rounded-xl"
			:class="
				route.name === 'appointment-details'
					? 'bg-blue-700 text-white'
					: 'bg-white text-blue-500'
			"
		>
			Cita y Resumen
		</RouterLink>
	</nav>
	<RouterView />
</template>
