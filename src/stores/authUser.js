import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import AuthAPI from "../api/AuthAPI";

export const useAuthUserStore = defineStore("authUser", () => {
	const userAuth = ref({});

	onMounted(async () => {
		try {
			const {
				data: { user },
			} = await AuthAPI.auth();
			userAuth.value = user;
		} catch (error) {
			console.log(error);
		}
	});

	const getUserName = computed(() =>
		userAuth.value?.name ? userAuth.value?.name : ""
	);

	return {
		userAuth,
		getUserName,
	};
});
