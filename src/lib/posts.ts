import { getCollection, type CollectionEntry } from "astro:content";

/**
 * All published blog posts, sorted newest first.
 *
 * Every consumer (home, archive, post pages, RSS, sitemap) must use this
 * helper so that `draft: true` posts are consistently excluded everywhere.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
	const posts = await getCollection("blog", ({ data }) => data.draft !== true);

	return posts.sort(
		(a, b) => b.data.date_pub.getTime() - a.data.date_pub.getTime()
	);
}
