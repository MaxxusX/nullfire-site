import { env } from "node:process";
import { defineConfig, passthroughImageService } from "astro/config";
//import purgecss from "astro-purgecss";

const isDevBuild = env.NODE_ENV === "development";

export default defineConfig({
	site: env.SITE_URL_OVERRIDE ?? "https://nullfire.pages.dev/",
	base: env.SITE_PATH_OVERRIDE ?? "/",
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
	compressHTML: true,
	scopedStyleStrategy: "class",
	build: {
		format: "file",
		inlineStylesheets: "never",
	},
	server: {
		host: false,
		port: 8080,
	},
	devToolbar: {
		enabled: false,
	},
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
		json: {
			stringify: true,
		},
		css: {
			transformer: "lightningcss",
			devSourcemap: isDevBuild,
			lightningcss: {
				minify: true,
				sourceMap: isDevBuild,
				errorRecovery: false,
				targets: {
					chrome: 112 << 16, // vite default: 87
					and_chr: 138 << 16,
					edge: 112 << 16, // vite default: 88
					firefox: 128 << 16, // vite default: 78
					and_ff: 140 << 16,
					safari: (16 << 16) | (6 << 8), // vite default: 14
					ios_saf: (16 << 16) | (7 << 8),
				},
			},
		},
		build: {
			// vite default: ["es2020", "edge88", "firefox78", "chrome87", "safari14"]
			target: ["es2020", "chrome112", "edge112", "firefox128", "safari16.6"],
			assetsInlineLimit: 0,
			cssCodeSplit: false,
			cssMinify: "lightningcss",
			minify: "esbuild",
			sourcemap: isDevBuild,
			reportCompressedSize: false,
			modulePreload: { polyfill: false },
		},
		esbuild: {
			supported: {
				"top-level-await": true,
			},
		},
	},
});
