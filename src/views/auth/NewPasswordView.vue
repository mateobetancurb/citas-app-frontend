<script setup>
import { computed, ref, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reset } from "@formkit/vue";
import AuthAPI from "../../api/AuthAPI";

const route = useRoute();
const router = useRouter();
const toast = inject("toast");
const { token } = route.params;
const isValidToken = ref(false);
const isLoading = ref(true);

onMounted(async () => {
	try {
		const { data } = await AuthAPI.verifyPasswordResetToken(token);
		isValidToken.value = true;
	} catch (error) {
		toast.open({
			message: error.response.data.msg,
			type: "error",
			duration: 20000,
		});
	} finally {
		isLoading.value = false;
	}
});

const password = ref("");
const confirmPassword = ref();

const showConfirmPasswordInput = computed(() => {
	return password.value && password.value.trim().length > 0;
});

const showBtnSubmit = computed(() => {
	return (
		password.value &&
		password.value.trim().length > 0 &&
		confirmPassword.value &&
		confirmPassword.value.trim().length > 0
	);
});

const handleSubmit = async ({ password }) => {
	try {
		const { data } = await AuthAPI.updatePassword(token, {
			password: password,
		});
		toast.open({
			message: data.msg,
			type: "success",
			duration: 7000,
		});
		reset("newPasswordForm");
		router.push({ name: "login" });
	} catch (error) {
		toast.open({
			message: error.response.data.msg,
			type: "error",
			duration: 5000,
		});
	}
};
</script>

<template>
	<p v-if="isLoading" class="text-center text-xl text-white font-bold">
		Cargando...
	</p>
	<div v-if="isLoading === false && isValidToken === true">
		<div class="mb-6">
			<h1 class="text-3xl font-extrabold text-white text-center mt-10 mb-1">
				Restablece tu contraseña
			</h1>
			<p class="text-md text-white text-center">Escribe tu nueva contraseña</p>
		</div>
		<FormKit
			id="newPasswordForm"
			type="form"
			:actions="false"
			incomplete-message="No se pudo crear la cuenta. Hay errores en el formulario"
			@submit="handleSubmit"
		>
			<FormKit
				v-model="password"
				type="password"
				label="Contraseña"
				name="password"
				placeholder="Escribe aquí tu contraseña - Min 8 caracteres"
				validation="required:trim|length:1"
				:validation-messages="{
					required: 'Escribe una contraseña válida',
					length: 'Debes escribir mínimo 8 caracteres',
				}"
			>
			</FormKit>
			<FormKit
				v-if="showConfirmPasswordInput"
				v-model="confirmPassword"
				type="password"
				label="Repite tu contraseña"
				name="password_confirm"
				placeholder="Escribe nuevamente tu contraseña"
				validation="required:trim|confirm"
				:validation-messages="{
					required: 'Escribe una contraseña válida',
					confirm: 'Las contraseñas deben ser iguales',
				}"
			>
			</FormKit>
			<FormKit type="submit" v-if="showBtnSubmit"> Guardar</FormKit>
		</FormKit>
	</div>
	<h2
		v-if="isLoading === false && isValidToken === false"
		class="text-3xl font-black text-[#DC3545] text-center"
	>
		El token no es válido
	</h2>
</template>
