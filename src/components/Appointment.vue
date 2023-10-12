<script setup>
import { RouterLink } from "vue-router";
import { displayFormatDate, formatCurrency } from "../helpers";
import { useAppointmentsStore } from "../stores/appointments";
defineProps({
	appointment: {
		type: Object,
	},
});

const appointmentsStore = useAppointmentsStore();
</script>

<template>
	<div class="bg-white p-5 space-y-3 rounded-lg">
		<div class="text-gray-500 font-black flex justify-between">
			<p>
				Fecha:
				<span class="font-light">{{
					displayFormatDate(appointment.date)
				}}</span>
			</p>
			<p>
				Hora:
				<span class="font-light">{{ appointment.time }}</span>
			</p>
		</div>
		<p class="text-lg text-center font-black">Este es el resumen de tu cita:</p>
		<div v-for="service in appointment.services" :key="service._id">
			<p class="font-black">
				Servicio: <span class="font-normal">{{ service.name }}</span>
			</p>
			<p class="font-black">
				Precio:
				<span class="text-lg text-blue-800">{{
					formatCurrency(service.price)
				}}</span>
			</p>
		</div>
		<p class="text-lg font-black text-right">
			Total a pagar:
			<span class="text-blue-800">{{
				formatCurrency(appointment.totalAmount)
			}}</span>
		</p>
		<div class="flex gap-2 items-center">
			<RouterLink
				:to="{ name: 'edit-appointment', params: { id: appointment._id } }"
				class="bg-blue-800 rounded-lg p-3 text-white text-sm font-black flex-1 md:flex-none hover:bg-blue-700 transition-colors"
			>
				Editar cita
			</RouterLink>
			<button
				@click="appointmentsStore.deleteAppointment(appointment._id)"
				class="bg-red-600 rounded-lg p-3 text-white text-sm font-black flex-1 md:flex-none hover:bg-red-500 transition-colors"
			>
				Cancelar cita
			</button>
		</div>
	</div>
</template>
