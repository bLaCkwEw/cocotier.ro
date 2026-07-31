import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// Astro plugins
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// Sätteri plugins (ported from remark/rehype)
import {
	autolinkHeadings,
	capitalizeHeadings,
	figure,
} from "./src/lib/markdown/satteri-plugins.ts";

const site = "https://cocotier.ro";

// https://astro.build/config
export default defineConfig({
	site: site,
	output: "static",
	prefetch: {
		prefetchAll: true,
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [sitemap(), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		processor: satteri({
			mdastPlugins: [capitalizeHeadings],
			hastPlugins: [figure, autolinkHeadings],
		}),
	},
});
