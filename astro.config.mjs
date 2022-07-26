import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap"; // Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
// @ts-check
// https://astro.build/config

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
	site: "https://cocotier.ro",
	integrations: [
		sitemap({
			canonicalURL: "https://cocotier.ro",
		}),
		prefetch(),
	],
});
