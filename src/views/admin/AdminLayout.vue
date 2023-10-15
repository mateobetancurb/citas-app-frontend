<script setup>
import { useAuthUserStore } from "../../stores/authUser";
import { formatName } from "../../helpers";
const userStore = useAuthUserStore();
</script>

<template>
	<div class="flex justify-between">
		<div>
			<h2 class="text-xl lg:text-2xl font-black text-white">
				Panel de Administración
			</h2>
		</div>

		<div class="flex flex-col space-y-5">
			<div class="flex gap-2 items-center">
				<p class="text-white text-right">
					Hola {{ formatName(userStore.getUserName) }}
				</p>
				<button
					type="button"
					class="bg-red-600 hover:bg-red-700 p-2 text-white text-xs font-extrabold rounded-lg transition-colors"
					@click="userStore.userLogout"
				>
					Cerrar Sesión
				</button>
			</div>
		</div>
	</div>
	<main class="space-y-6">
		<RouterView />
	</main>
</template>
