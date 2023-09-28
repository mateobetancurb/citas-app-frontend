<script setup>
import SelectedService from "../../components/SelectedService.vue";
import { useAppointmentsStore } from "../../stores/appointments";

const appointmentsStore = useAppointmentsStore();
</script>

<template>
	<h3
		v-if="appointmentsStore.services.length === 0"
		class="mt-24 text-white text-center text-xl font-extrabold"
	>
		Aún no has agregado servicios a tu cita
	</h3>
	<div v-if="appointmentsStore.services.length > 1">
		<h2 class="text-3xl font-extrabold mt-10 text-white">
			Detalles de tu cita
		</h2>
		<p class="text-white text-md mb-10">
			Verifica la información y confirma tu cita
		</p>
		<h3 class="text-xl font-extrabold text-white mb-2">
			Estos son los servicios que quieres agendar:
		</h3>
		<div class="grid gap-5">
			<SelectedService
				v-for="service in appointmentsStore.services"
				:key="service._id"
				:service="service"
			/>
		</div>
	</div>
</template>
