<script setup>
import AdminAppointment from "../../components/AdminAppointment.vue";
import { useAuthUserStore } from "../../stores/authUser";

const userStore = useAuthUserStore();
</script>

<template>
	<h2
		v-if="userStore.noAppointments === false"
		class="text-white text-lg mt-10 font-bold text-center"
	>
		Aquí podrás administrar tus próximas citas
	</h2>

	<p v-if="userStore.isLoading" class="text-white text-center text.2xl mt-5">
		Cargando...
	</p>
	<div v-else>
		<p
			v-if="userStore.noAppointments"
			class="text-white text-lg text-center mt-10"
		>
			Aún no hay citas agendadas
		</p>
		<div v-else class="grid grid-cols-1 gap-5 mt-10">
			<AdminAppointment
				v-for="appointment in userStore.userAppointments"
				:key="appointment._id"
				:appointment="appointment"
			/>
		</div>
	</div>
</template>
