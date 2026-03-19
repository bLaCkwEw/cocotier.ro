import { defineConfig } from "vite-plus";

export default defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	fmt: {
		useTabs: true,
		singleQuote: false,
		semi: true,
		trailingComma: "es5",
		printWidth: 100,
		sortTailwindcss: {},
		sortPackageJson: false,
		ignorePatterns: [
			"dist/",
			".astro/",
			"node_modules/",
			"npm-debug.log*",
			"yarn-debug.log*",
			"yarn-error.log*",
			"pnpm-debug.log*",
			".env",
			".env.production",
			".DS_Store",
			".jampack",
			".vercel",
		],
	},
});
