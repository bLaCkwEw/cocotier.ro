import rss from "@astrojs/rss";
import { markdownToHtml } from "satteri";
import { getPublishedPosts } from "@lib/posts";
import {
	autolinkHeadings,
	capitalizeHeadings,
	figure,
} from "@lib/markdown/satteri-plugins";

export async function GET(context: { site: any }) {
	const blog = await getPublishedPosts();
	return rss({
		title: "cocotier.ro",
		description:
			"Personal website where I write about anything and everything.",
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date_pub,
			description: post.data.description,
			content: markdownToHtml(post.body ?? "", {
				mdastPlugins: [capitalizeHeadings],
				hastPlugins: [figure, autolinkHeadings],
			}).html,
			link: `/blog/${post.id}`,
		})),
	});
}
