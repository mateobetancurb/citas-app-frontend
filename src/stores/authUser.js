import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AuthAPI from "../api/AuthAPI";

export const useAuthUserStore = defineStore("authUser", () => {
	const userAuth = ref({});
	const router = useRouter();

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

	const userLogout = () => {
		localStorage.clear();
		userAuth.value = {};
		router.push({ name: "login" });
	};

	return {
		userAuth,
		getUserName,
		userLogout,
	};
});