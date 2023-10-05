<script setup>
import { onMounted, inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "../../api/AuthAPI";

const route = useRoute();
const router = useRouter();
const { token } = route.params;
const toast = inject("toast");
const secondsToRedirect = ref(7);
const isTokenValid = ref(true);

const countdown = ref(secondsToRedirect.value);
let countdownInterval;

onMounted(async () => {
	try {
		const { data } = await AuthAPI.verifyAccount(token);
		toast.open({
			message: data.msg,
			type: "success",
			duration: 6000,
		});

		countdownInterval = setInterval(() => {
			countdown.value -= 1;
			if (countdown.value === 0) {
				clearInterval(countdownInterval);
				router.push({ name: "login" });
			}
		}, 1000);
	} catch (error) {
		console.log(error);
		toast.open({
			message: error.response.data.msg,
			type: "error",
			duration: 6000,
		});

		isTokenValid.value = false;
	}
});
</script>

<template>
	<div v-if="isTokenValid">
		<p class="text-xl font-extrabold text-white text-center mt-32">
			En <span class="text-4xl">{{ countdown }}</span> segundos podrás iniciar
			sesión
		</p>
		<RouterView />
	</div>
</template>
