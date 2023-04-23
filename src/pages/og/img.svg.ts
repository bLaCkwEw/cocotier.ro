import { getCollection } from "astro:content";
import satori from "satori";

// export async function getStaticPaths() {
// 	return posts.map((post) => ({
// 		params: "hello world",
// 	}));
// }

export async function get({ params, request }) {
	const posts = await getCollection("blog");

	const html = {
		type: "div",
		props: {
			children: "Hello world!",
			style: {
				color: "red",
				background: "blue",
				fontSize: "64px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
			},
		},
	};

	const img = await satori(html, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "Acme",
				data: await fetch(
					"https://github.com/google/fonts/blob/main/ofl/acme/Acme-Regular.ttf?raw=true"
				).then((res) => res.arrayBuffer()),
				weight: 400,
				style: "normal",
			},
		],
	});
	return {
		body: img,
		encoding: "binary",
	};
}

// export function getStaticPaths() {
// 	return [{ params: { img: "full-logo-light.png" } }];
// }
