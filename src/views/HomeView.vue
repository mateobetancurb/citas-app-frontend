<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
	<div class="h-[100%] space-y-5 flex flex-col justify-center items-center">
		<h1 class="text-white text-4xl font-black text-center mt-10">
			Barbería Susa
		</h1>
		<h2 class="text-white text-lg">¡Te damos la bienvenida!</h2>
		<button
			@click="() => router.push({ name: 'login' })"
			class="text-[#1F2937] px-4 py-2 rounded-lg mt-5 mx-auto block shadow-xl hover:bg-[#303844] hover:text-white transition-colors bg-white"
		>
			Inicia sesión
		</button>
	</div>
</template>
