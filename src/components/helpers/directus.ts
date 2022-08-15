import type { Post } from "@components/types"

const DIRECTUS_URL = "https://tcwk2rc4.directus.app"

export const directus = {
	getPosts: async () => {
		const posts = await fetch(
			`${DIRECTUS_URL}/items/blog_posts?sort[]=-date_published`
		).then((res) => res.json())

		let filtered_posts = posts.data.map((post: Post) => {
			if (post.status !== "published") {
				return
			}
			return post
		})

		//  Causes error if undefined
		filtered_posts = filtered_posts.filter((item: object) => {
			return item !== undefined
		})

		return filtered_posts
	},
}
