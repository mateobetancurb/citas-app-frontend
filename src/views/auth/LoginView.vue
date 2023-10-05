<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "../../api/AuthAPI";
import { ref, computed } from "vue";

const toast = inject("toast");

const email = ref("");
const password = ref("");

const isValidForm = computed(() => {
	return Boolean(email.value && password.value);
});

const handleSubmit = async (formData) => {
	try {
		const {
			data: { token },
		} = await AuthAPI.login(formData);
		localStorage.setItem("AUTH_TOKEN", token);
		toast.open({
			message: "¡Qué gusto verte de nuevo!",
			duration: 7000,
			type: "success",
		});
		reset("loginForm");
	} catch (error) {
		console.log(error);
		toast.open({
			message: error.response.data.msg,
			duration: 7000,
			type: "error",
		});
	}
};
</script>

<template>
	<div class="mb-10">
		<h1 class="text-3xl font-extrabold text-white text-center ,mt-10">
			Iniciar sesión
		</h1>
		<p class="text-lg text-white text-center">
			...y empieza a agendar tus citas
		</p>
	</div>

	<FormKit
		id="loginForm"
		type="form"
		:actions="false"
		incomplete-message="No se pudo crear la cuenta. Hay errores en el formulario"
		@submit="handleSubmit"
	>
		<FormKit
			type="email"
			label="Correo electrónico"
			name="email"
			placeholder="Escribe aquí tu correo electrónico"
			validation="required:trim|email"
			:validation-messages="{
				required: 'El correo es obligatorio',
				email: 'El correo no es válido',
			}"
			v-model="email"
		>
		</FormKit>
		<FormKit
			type="password"
			label="Contraseña"
			name="password"
			placeholder="Escribe aquí tu contraseña"
			validation="required:trim"
			:validation-messages="{
				required: 'Escribe una contraseña válida',
				length: 'Debes escribir mínimo 8 caracteres',
			}"
			v-model="password"
		>
		</FormKit>

		<FormKit type="submit" v-if="isValidForm">Iniciar sesión</FormKit>
	</FormKit>
</template>
