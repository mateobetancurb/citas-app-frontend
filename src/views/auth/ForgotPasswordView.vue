<script setup>
import { ref, computed, inject } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "../../api/AuthAPI";

const toast = inject("toast");

const handleSubmit = async ({ email }) => {
	try {
		const { data } = await AuthAPI.forgotPassword({ email });
		toast.open({
			message: data.msg,
			duration: 8000,
			type: "success",
		});
		reset("resetPasswordForm");
	} catch (error) {
		toast.open({
			message: error.response.data.msg,
			duration: 5000,
			type: "error",
		});
	}
};

const email = ref("");
const isEmailValid = computed(() => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.value);
});
</script>

<template>
	<div class="mb-6">
		<h1 class="text-3xl font-extrabold text-white text-center mt-10 mb-1">
			¿Olvidaste tu contraseña?
		</h1>
		<p class="text-md text-white text-center">
			Escribe tu correo y te enviaremos un código para crear una nueva
		</p>
	</div>
	<FormKit
		id="resetPasswordForm"
		type="form"
		:actions="false"
		incomplete-message="No se pudo crear la cuenta. Hay errores en el formulario"
		@submit="handleSubmit"
	>
		<FormKit
			type="email"
			v-model="email"
			label="Correo electrónico"
			name="email"
			placeholder="Escribe aquí tu correo electrónico"
			validation="required:trim|email"
			:validation-messages="{
				required: 'El correo es obligatorio',
				email: 'El correo no es válido',
			}"
		>
		</FormKit>
		<FormKit type="submit" v-if="isEmailValid"> Enviar instrucciones</FormKit>
	</FormKit>
</template>
