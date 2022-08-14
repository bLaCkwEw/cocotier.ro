module.exports = {
	plugins: [require.resolve("prettier-plugin-astro")],
	pluginSearchDirs: ["."],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
	useTabs: true,
	semi: false,
}
