import { env } from "node:process";
import { defineConfig, passthroughImageService } from "astro/config";
//import purgecss from "astro-purgecss";

const isDevBuild = env.NODE_ENV === "development";
const isGithubPages = env.IS_GITHUB_PAGES === "true";

export default defineConfig({
	site: isGithubPages ? "https://maxxusx.github.io/nullfire-site/" : (env.CF_PAGES_URL ?? "https://nullfire.pages.dev/"),
	base: isGithubPages ? "/nullfire-site/" : "/",
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
		css: {
			transformer: "lightningcss",
			lightningcss: {
				minify: true,
				sourceMap: isDevBuild,
				errorRecovery: false,
				targets: {
					and_chr: 128 << 16,
					and_ff: 127 << 16,
					android: 128 << 16,
					chrome: 109 << 16, // vite default: 87
					edge: 126 << 16, // vite default: 88
					firefox: 115 << 16, // vite default: 78
					ios_saf: (15 << 16) | (6 << 8),
					op_mob: 80 << 16,
					opera: 109 << 16,
					safari: (15 << 16) | (6 << 8), // vite default: 14
					samsung: 25 << 16,
				},
			},
		},
		build: {
			// vite default: ["es2020", "edge88", "firefox78", "chrome87", "safari14"]
			target: ["es2020", "edge126", "firefox115", "chrome109", "safari15.6"],
			assetsInlineLimit: 0,
			cssCodeSplit: false,
			cssMinify: "lightningcss",
			minify: "esbuild",
			sourcemap: isDevBuild,
			reportCompressedSize: false,
		},
	},
});
