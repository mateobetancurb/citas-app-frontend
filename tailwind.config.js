/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js}",
		"./node_modules/vue-tailwind-datepicker/**/*.js",
		"./formkit.config.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				app: "url('/img/home.jpg')",
			},
			colors: {
				"vtd-primary": colors.blue,
			},
		},
	},
	plugins: [],
};
