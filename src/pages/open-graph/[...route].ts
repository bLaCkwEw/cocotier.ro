import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const blogPosts = await getCollection("blog", ({ data }) => !data.draft);

const blogPages = Object.fromEntries(
	blogPosts.map((post) => [
		`blog/${post.id}`,
		{ title: post.data.title, description: post.data.description },
	])
);

const staticPages = {
	home: {
		title: "cocotier.ro",
		description:
			"Personal website where I write about anything and everything.",
	},
	blog: { title: "Blog", description: undefined },
	now: {
		title: "Now",
		description: "Figure out what I'm currently doing!",
	},
};

export const { getStaticPaths, GET } = await OGImageRoute({
	param: "route",
	pages: { ...staticPages, ...blogPages },
	getImageOptions: (_path, page) => ({
		title: page.title,
		description: page.description,
		logo: {
			path: "./public/cocotier-128x128.png",
			size: [80],
		},
		bgGradient: [[24, 24, 27]],
		fonts: ["./src/assets/Inter_18pt-Medium.ttf"],
		font: {
			title: {
				color: [255, 255, 255],
				size: 64,
				families: ["Inter"],
				weight: "Medium",
			},
			description: {
				color: [161, 161, 170],
				size: 36,
				families: ["Inter"],
				weight: "Medium",
			},
		},
		padding: 60,
	}),
});
