import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		sitemap({
			changefreq: "monthly",
			priority: 0.5,
			lastmod: new Date(),
		}),
	],
	site: "https://cocotier.ro",
});
