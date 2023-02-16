import rss from '@astrojs/rss';
import type { AstroAdapter, AstroInstance } from 'astro';
import { getCollection } from 'astro:content';

export async function get(context) {
  const blog = await getCollection('blog');
	return rss({
    title: "Home - cocotier.ro",
    description: "Welcome to my website!",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date_pub,
      description: post.data.description,
			draft: post.data.draft,
      link: `/blog/${post.slug}/`,
    })),
  });
}
