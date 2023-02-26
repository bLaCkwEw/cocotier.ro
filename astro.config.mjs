import { defineConfig } from "astro/config";
// Astro plugins
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/static";
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
		tailwind(),
		prefetch({
			selector: "a[href^='/']",
			throttle: 3,
		}),
		sitemap(),
		compress({
			logger: 1,
		}),
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
					behavior: "append",
					properties: {},
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["mx-2 text-blue-500"],
						},
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
			lazyLoadPlugin,
		],
	},
});
