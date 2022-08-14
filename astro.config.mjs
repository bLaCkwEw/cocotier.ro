import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import prefetch from "@astrojs/prefetch"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
	site: "https://preview.cocotier.ro",
	vite: {
		define: {
			"import.meta.env.VERCEL_ANALYTICS_ID": JSON.stringify(
				process.env.VERCEL_ANALYTICS_ID
			),
		},
	},
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			theme: "min-dark",
			wrap: true,
		},
		remarkPlugins: ["remark-gfm", "remark-smartypants"],
	},
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		sitemap({
			changefreq: "monthly",
			priority: 0.8,
		}),
		prefetch({
			throttle: 5,
		}),
	],
})
