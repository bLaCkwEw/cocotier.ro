import "astro/client";

import type { AstroConfig } from "astro";

declare module "astro" {
	interface AstroConfig {
		output: "static" | "server" | "hybrid";
	}
}
