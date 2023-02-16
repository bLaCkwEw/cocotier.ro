import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/static";

const site =
	process.env.VERCEL_ENV === "preview"
		? "https://preview.cocotier.ro"
		: "https://cocotier.ro";

// https://astro.build/config
export default defineConfig({
	// site: 'https://cocotier.ro',
	site: site,
	integrations: [
		mdx(),
		sitemap(),
		prefetch({
			selector: "a[href^='/']",
			throttle: 3,
		}),
		tailwind(),
	],
	output: "static",
	adapter: vercel({
		analytics: true,
	}),
});
