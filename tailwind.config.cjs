/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				winter: {
					primary: "#0856E9",
					"primary-content": "#eef4fd",
					secondary: "#463AA1",
					accent: "#C149AD",
					neutral: "#021431",
					"base-100": "#f9fbfd",
					"base-content": "#161C2D",
					info: "#93E6FB",
					success: "#80CED1",
					warning: "#EFD8BD",
					error: "#E58B8B",
				},
				winterdark: {
					primary: "#057AFF",
					secondary: "#463AA1",
					accent: "#C149AD",
					neutral: "#021431",
					"base-100": "#2A303C",
					info: "#93E6FB",
					success: "#80CED1",
					warning: "#EFD8BD",
					error: "#E58B8B",
				},
			},
		],
		darkTheme: "winterdark",
	},
}
