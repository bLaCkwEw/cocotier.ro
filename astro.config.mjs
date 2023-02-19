import { defineConfig } from "astro/config";
// Astro plugins
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/static";
import serviceWorker from "astrojs-service-worker";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
// Markdown plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFigure from "rehype-figure";
import lazyLoadPlugin from "rehype-plugin-image-native-lazy-loading";
import remarkCapitalize from "remark-capitalize";

const site =
	process.env.VERCEL_ENV === "preview" ? "https://preview.cocotier.ro" : "https://cocotier.ro";

// https://astro.build/config
export default defineConfig({
	site: site,
	integrations: [
		mdx(),
		sitemap(),
		prefetch({
			selector: "a[href^='/']",
			throttle: 3,
		}),
		tailwind(),
		serviceWorker(),
		compress(),
	],
	output: "static",
	adapter: vercel({
		analytics: true,
	}),
	markdown: {
		remarkPlugins: [remarkCapitalize],
		rehypePlugins: [
			rehypeFigure,
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
				},
			],
			lazyLoadPlugin,
		],
	},
});
