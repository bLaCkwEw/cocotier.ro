const DIRECTUS_URL = "https://tcwk2rc4.directus.app";

export const directus = {
	getPost: async (id: number) => {
		const res = await fetch(
			`${DIRECTUS_URL}/items/blog_posts/${id}?fields=*,tags.tags_id.tags`
		);
		const d = await res.json();
		return d.data;
	},

	getPosts: async (limit?: number) => {
		if (!limit) {
			const res = await fetch(
				`${DIRECTUS_URL}/items/blog_posts?fields=*,tags.tags_id.tags&sort[]=-date_created`
			);
			const d = await res.json();
			return d.data;
		}

		if (limit) {
			const res = await fetch(
				`${DIRECTUS_URL}/items/blog_posts?fields=*,tags.tags_id.tags&limit=${limit}&sort[]=-date_created`
			);
			const d = await res.json();
			return d.data;
		}
	},

	getImage: async (id: string, imageName?: string) => {
		let link = `${DIRECTUS_URL}/assets/${id}/${imageName}?format=webp`;
		return link;
	},
};
