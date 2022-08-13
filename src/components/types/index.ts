export interface Post {
	// Technical
	status: string;
	slug: string;

	// Post part of post
	title: string;
	description?: string;
	content?: string;
	image?: string;
	date_published?: string;
	tags?: [];
}
