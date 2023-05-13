import { defineConfig } from "astro/config";
// Astro plugins
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/static";
// Markdown plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFigure from "rehype-figure";
import remarkCapitalize from "remark-capitalize";

const site =
	process.env.VERCEL_ENV === "preview" ? "https://preview.cocotier.ro" : "https://cocotier.ro";

// https://astro.build/config
export default defineConfig({
	site: site,
	output: "static",
	adapter: vercel(),
	integrations: [
		tailwind(),
		prefetch({
			selector: "a[href^='/']",
			throttle: 3,
		}),
		sitemap(),
	],
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
		],
	},
});
