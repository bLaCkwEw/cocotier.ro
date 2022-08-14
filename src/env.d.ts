/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly VERCEL_ANALYTICS_ID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module "simple-astro-seo"
