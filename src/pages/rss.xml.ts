import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context: { site: any }) {
	const blog = await getCollection("blog");
	return rss({
		title: "cocotier.ro",
		description: "Personal website where I write about anything and everything.",
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date_pub,
			description: post.data.description,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"])
			}),
			link: `/blog/${post.slug}`,
		})),
	});
}
