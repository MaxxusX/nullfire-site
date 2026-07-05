import { env } from "node:process";
import { defineConfig, passthroughImageService } from "astro/config";
//import purgecss from "astro-purgecss";

const isDevBuild = env.NODE_ENV === "development" || env.MODE === "development";

export default defineConfig({
	site: env.SITE_URL_OVERRIDE ?? "https://nullfire.pages.dev/",
	base: "/",
	trailingSlash: "ignore",
	output: "static",
	integrations: [
		/*	
 		purgecss({
			fontFace: true, // removes any unused @font-face if set to true
			keyframes: true, // removes unused keyframes by setting if set to true
			rejected: true, // scan through the removed list to see if there's anything wrong
			rejectedCss: false, // keeps the discarded CSS
			variables: false, // removes any unused CSS variables if set to true
  		}),
		*/
	],
	compressHTML: "jsx",
	prerenderConflictBehavior: "error",
	scopedStyleStrategy: "class",
	build: {
		format: "file",
		inlineStylesheets: "never",
	},
	server: {
		host: false,
		port: 8080,
		headers: {
			"Cache-Control": "no-cache",
			"No-Vary-Search": "params",
			"Speculation-Rules": "/prefetch.json",
			"Content-Language": "en-US",
			"Referrer-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "credentialless",
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Resource-Policy": "same-origin",
			"Content-Security-Policy": "default-src 'self' https: data:; script-src 'self'; script-src-attr 'none'; style-src 'self' https: data: 'unsafe-inline'; manifest-src 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests; block-all-mixed-content",
			"Permissions-Policy": "cross-origin-isolated=(),storage-access=(),deferred-fetch=(),deferred-fetch-minimal=()",
			"X-DNS-Prefetch-Control": "off",
			"X-Download-Options": "noopen",
			"X-XSS-Protection": "0",
		},
	},
	devToolbar: { enabled: false },
	image: {
		service: passthroughImageService(), // temp. cannot install sharp rn.
		/*
		service: {
			config: {
				limitInputPixels: false,
			},
		},
		*/
	},
	vite: {
		mode: isDevBuild ? "development" : "production",
		logLevel: "info",
		json: { stringify: true },
		css: {
			transformer: "lightningcss",
			devSourcemap: isDevBuild,
			lightningcss: {
				minify: true,
				sourceMap: isDevBuild,
				errorRecovery: false,
				targets: {
					chrome: 112 << 16, // vite default: 111
					and_chr: 138 << 16,
					edge: 112 << 16, // vite default: 111
					firefox: 128 << 16, // vite default: 114
					and_ff: 140 << 16,
					safari: (16 << 16) | (6 << 8), // vite default: 16.4
					ios_saf: (16 << 16) | (7 << 8),
				},
			},
		},
		build: {
			target: ["chrome112", "edge112", "firefox128", "safari16.6", "ios16.6"],
			assetsInlineLimit: 0,
			cssCodeSplit: false,
			cssMinify: "lightningcss",
			minify: "oxc",
			sourcemap: isDevBuild,
			reportCompressedSize: false,
			modulePreload: { polyfill: false },
		},
	},
});
