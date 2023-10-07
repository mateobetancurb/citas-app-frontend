<script setup>
import { useAuthUserStore } from "../../stores/authUser";
const user = useAuthUserStore();
</script>

<template>
	<h2 class="text-4xl font-extrabold text-white mt-10">Mis citas</h2>
	<p class="text-white text-lg mt-5">
		Aquí podrás administrar tus próximas citas
	</p>
</template>
