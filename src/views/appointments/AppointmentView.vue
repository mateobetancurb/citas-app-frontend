<script setup>
import { ref } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import SelectedService from "../../components/SelectedService.vue";
import { useAppointmentsStore } from "../../stores/appointments";
import { formatCurrency } from "../../helpers";

const appointmentsStore = useAppointmentsStore();

const dateAppointmentFormatter = ref({
	date: "DD/MM/YYYY",
	month: "MMM",
});

const dDate = (date) => {
	const today = new Date();
	return date < today || date.getMonth() > today.getMonth() + 1;
};
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
			<h2 class="text-right mb-5 text-xl text-white">
				Total a pagar:
				<span class="font-black text-2xl">
					{{ formatCurrency(appointmentsStore.totalAmount) }}
				</span>
			</h2>
		</div>
		<hr class="mb-5" />
		<div class="space-y-8">
			<h3 class="text-2xl font-extrabold text-white">Fecha y Hora</h3>
			<div class="lg:flex gap-5 items-start">
				<div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
					<VueTailwindDatepicker
						i18n="es-CO"
						as-single
						no-input
						:disable-date="dDate"
						:formatter="dateAppointmentFormatter"
						v-model="appointmentsStore.appointmentDate"
					/>
				</div>
				<div
					class="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-5 mt-10 lg:mt-0 mb-5"
				>
					<button
						v-for="hour in appointmentsStore.appointmentHours"
						:key="hour"
						@click="appointmentsStore.appointmentTime = hour"
						class="block text-blue-600 rounded-lg text-xl font-black p-3 hover:bg-blue-600 hover:text-white transition-colors"
						:class="
							appointmentsStore.appointmentTime === hour
								? 'bg-blue-600 text-white'
								: 'bg-white'
						"
					>
						{{ hour }}
					</button>
				</div>
			</div>
		</div>
		<div v-if="appointmentsStore.isValidReservation" class="flex justify-end">
			<button
				class="w-full md:w-auto bg-blue-700 p-3 rounded-lg font-black text-white hover:bg-blue-800 transition-colors"
			>
				Confirmar reservación
			</button>
		</div>
	</div>
</template>
