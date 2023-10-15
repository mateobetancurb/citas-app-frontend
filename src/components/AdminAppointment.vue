<script setup>
import {
	formatCurrency,
	displayFormatDate,
	formatTime,
	formatName,
} from "../helpers";
defineProps({
	appointment: {
		type: Object,
	},
});
</script>

<template>
	<div class="bg-white p-5 space-y-3 rounded-lg">
		<div class="flex justify-between">
			<p class="text-gray-500 font-black">
				Fecha:
				<span class="font-light">
					{{ displayFormatDate(appointment.date) }}
				</span>
			</p>
			<p class="text-gray-500 font-black">
				Hora:
				<span class="font-light"> {{ formatTime(appointment.time) }}</span>
			</p>
		</div>

		<p class="text-gray-500 font-black">
			Nombre:
			<span class="font-light">{{ formatName(appointment.user.name) }} </span>
		</p>
		<p class="text-gray-500 font-black">
			Correo:
			<span class="font-light">{{ appointment.user.email }} </span>
		</p>

		<p class="text-lg font-black">Servicios Solicitados en la cita</p>
		<div v-for="service in appointment.services" :key="service._id">
			<p>{{ service.name }}</p>
			<p class="text-2xl font-black text-blue-500">
				{{ formatCurrency(service.price) }}
			</p>
		</div>

		<p class="text-2xl font-black text-right">
			Total a pagar:
			<span class="text-blue-600">
				{{ formatCurrency(appointment.totalAmount) }}
			</span>
		</p>
	</div>
</template>
