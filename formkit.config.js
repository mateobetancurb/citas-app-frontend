import { generateClasses } from "@formkit/themes";

const config = {
	config: {
		classes: generateClasses({
			global: {
				wrapper: "space-y-2 mb-3",
				message:
					"bg-red-300 text-red-800 text-center text-sm font-bold p-2 my-5 rounded-lg",
				label: "block mb-1 font-bold text-md text-white",
				input:
					"w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400",
			},
			submit: {
				input:
					"$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-3 mt-5 transition-colors",
			},
		}),
	},
};

export default config;
