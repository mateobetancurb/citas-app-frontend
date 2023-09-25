<script setup></script>

<template>
	<div class="flex justify-between">
		<h1 class="text-2xl lg:text-4xl font-black text-white">Animal Hospital</h1>
		<div class="flex flex-col space-y-5">
			<div class="flex gap-2 items-center">
				<p class="text-white text-right">
					Hola: <span class="font-bold">Sussana</span>
				</p>
				<button
					class="bg-red-600 hover:bg-red-700 p-2 rounded-xl transition-colors text-white"
					type="button"
				>
					Cerrar Sesión
				</button>
			</div>
			<nav class="flex gap-2 items-center justify-end">
				<button class="p-3 text-gray-200 font-black rounded-xl">
					Mis citas
				</button>
				<RouterLink
					:to="{ name: 'new-appointment' }"
					class="p-3 text-gray-200 rounded-xl bg-blue-700 hover:bg-blue-800 transition-colors"
				>
					Nueva Cita
				</RouterLink>
			</nav>
		</div>
	</div>
	<main>
		<RouterView />
	</main>
</template>
