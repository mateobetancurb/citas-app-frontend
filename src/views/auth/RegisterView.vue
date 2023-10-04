<script setup>
import AuthAPI from "../../api/AuthAPI";
import { ref } from "vue";

const password = ref("");

const handleSubmit = async ({ password_confirm, ...data }) => {
	try {
		await AuthAPI.register(data);
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="mb-10">
		<h1 class="text-3xl font-extrabold text-white text-center ,mt-10">
			¿No tienes una cuenta? Crea una
		</h1>
		<p class="text-lg text-white text-center">
			...y empieza a agendar tus citas
		</p>
	</div>

	<FormKit
		type="form"
		:actions="false"
		incomplete-message="No se pudo crear la cuenta. Hay errores en el formulario"
		@submit="handleSubmit"
	>
		<FormKit
			type="text"
			label="Nombre y apellido"
			name="name"
			placeholder="Escribe aquí tu nombre completo"
			validation="required:trim|length:10"
			:validation-messages="{
				required: 'El nombre es obligatorio',
				length: 'El nombre es muy corto',
			}"
		>
		</FormKit>
		<FormKit
			type="email"
			label="Correo electrónico"
			name="email"
			placeholder="Escribe aquí tu correo electrónico"
			validation="required|email"
			:validation-messages="{
				required: 'El correo es obligatorio',
				email: 'El correo no es válido',
			}"
		>
		</FormKit>
		<FormKit
			v-model="password"
			type="password"
			label="Contraseña"
			name="password"
			placeholder="Escribe aquí tu contraseña - Min 8 caracteres"
			validation="required:trim|length:8"
			:validation-messages="{
				required: 'Escribe una contraseña válida',
				length: 'Debes escribir mínimo 8 caracteres',
			}"
		>
		</FormKit>
		<FormKit
			v-if="password.trim().length > 7"
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
		<FormKit type="submit">Crear cuenta</FormKit>
	</FormKit>
</template>
