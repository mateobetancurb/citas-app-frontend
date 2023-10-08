import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AuthAPI from "../api/AuthAPI";
import AppointmentAPI from "../api/AppointmentAPI";

export const useAuthUserStore = defineStore("authUser", () => {
	const userAuth = ref({});
	const router = useRouter();
	const userAppointments = ref([]);
	const isLoading = ref(true);

	onMounted(async () => {
		try {
			const {
				data: { user },
			} = await AuthAPI.auth();
			userAuth.value = user;
			await getUserAppointments();
		} catch (error) {
			console.log(error);
		} finally {
			isLoading.value = false;
		}
	});

	async function getUserAppointments() {
		try {
			const { data } = await AppointmentAPI.getUserAppointments(
				userAuth.value._id
			);
			userAppointments.value = data;
		} catch (error) {
			console.log(error);
		}
	}

	const userLogout = () => {
		localStorage.clear();
		userAuth.value = {};
		router.push({ name: "login" });
	};

	const getUserName = computed(() =>
		userAuth.value?.name ? userAuth.value?.name : ""
	);

	const noAppointments = computed(() => {
		return userAppointments.value.length === 0;
	});

	return {
		userAuth,
		getUserName,
		userAppointments,
		noAppointments,
		isLoading,
		userLogout,
	};
});
