import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	site: "https://cocotier.ro",
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			theme: "min-dark",
			wrap: true,
		},
		remarkPlugins: ["remark-gfm", "remark-smartypants"],
	},
	integrations: [
		tailwind(),
		sitemap({
			changefreq: "monthly",
			priority: 0.5,
			lastmod: new Date(),
		}),
		prefetch({
			throttle: 3,
		}),
		mdx(),
	],
});
