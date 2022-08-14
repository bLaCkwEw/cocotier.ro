module.exports = {
	plugins: [require.resolve("prettier-plugin-astro")],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
	pluginSearchDirs: ["."],
	useTabs: true,
	semi: false,
	tabWidth: 2,
}
