/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly VERCEL_ANALYTICS_ID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
