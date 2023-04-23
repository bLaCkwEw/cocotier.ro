import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	schema: z.object({
		title: z.string().max(65, {
			message: "Title must be less than 65 characters.",
		}),
		description: z.string().max(160, {
			message: "Description must be less than 160 characters.",
		}),
		date_pub: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		date_updated: z
			.string()
			.or(z.date())
			.transform((str) => (str ? new Date(str) : undefined))
			.optional(),
		draft: z.boolean().optional(),
	}),
});

const notes = defineCollection({
	schema: z.object({
		date_pub: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		content: z.string(),
		img: z.string().optional(),
		img_alt: z.string().optional(),
	}),
});

export const collections = { blog, notes };
