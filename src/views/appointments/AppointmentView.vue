<script setup>
import SelectedService from "../../components/SelectedService.vue";
import { useAppointmentsStore } from "../../stores/appointments";
import { formatCurrency } from "../../helpers";

const appointmentsStore = useAppointmentsStore();
</script>

<template>
	<h3
		v-if="appointmentsStore.noServicesSelected"
		class="mt-24 text-white text-center text-xl font-extrabold"
	>
		Aún no has agregado servicios a tu cita
	</h3>
	<div v-else>
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
			<h2 class="text-right text-xl text-white">
				Total a pagar:
				<span class="font-black text-2xl">
					{{ formatCurrency(appointmentsStore.totalAmount) }}
				</span>
			</h2>
		</div>
	</div>
</template>
