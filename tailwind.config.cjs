/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			colors: {
				accent: "rgb(59 130 246)",
			},
		},
	},
	darkMode: "class",
	plugins: [require("@tailwindcss/typography")],
};
