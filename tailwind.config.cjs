/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss-scoped-groups"),
		require('flowbite/plugin'),
		require('@tailwindcss/line-clamp'),
	],
}
