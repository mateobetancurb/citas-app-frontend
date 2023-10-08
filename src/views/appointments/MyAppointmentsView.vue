<script setup>
import { useRouter } from "vue-router";
import { useAuthUserStore } from "../../stores/authUser";
import Appointment from "../../components/Appointment.vue";
const userStore = useAuthUserStore();
const router = useRouter();
</script>

<template>
	<p v-if="userStore.isLoading" class="text-white text-center text-lg mt-10">
		Cargando...
	</p>
	<div v-if="userStore.noAppointments" class="mt-10 text-center">
		<h2 class="text-white text-2xl font-extrabold">Aún no tienes citas</h2>
		<button
			@click="router.push({ name: 'new-appointment' })"
			class="text-white underline"
		>
			Agenda tu cita aquí
		</button>
	</div>
	<div v-else>
		<h2 class="text-4xl font-extrabold text-white mt-10">Mis citas</h2>
		<p class="text-white text-lg mt-5">
			Aquí podrás administrar tus próximas citas
		</p>
		<div class="grid grid-cols-1 gap-5 mt-10">
			<Appointment
				v-for="appointment in userStore.userAppointments"
				:key="appointment._id"
				:appointment="appointment"
			/>
		</div>
	</div>
</template>
