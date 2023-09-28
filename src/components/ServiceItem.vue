<script setup>
import { formatCurrency } from "../helpers";
import { useAppointmentsStore } from "../stores/appointments";

const appointmentsStore = useAppointmentsStore();

defineProps({
	service: {
		type: Object,
	},
});
</script>

<template>
	<div
		@click="appointmentsStore.onServiceSelected(service)"
		class="flex justify-between items-end flex-col p-5 space-y-5 rounded-lg cursor-pointer"
		:class="
			appointmentsStore.isServiceSelected(service._id)
				? 'bg-blue-700 text-white'
				: 'bg-white'
		"
	>
		<p class="text-xl text-start font-extrabold">
			{{ service.name }}
		</p>
		<p
			class="text-2xl font-extrabold"
			:class="
				appointmentsStore.isServiceSelected(service._id)
					? 'text-white'
					: 'text-blue-900'
			"
		>
			{{ formatCurrency(service.price) }}
		</p>
	</div>
</template>
