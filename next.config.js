/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({ options: { remarkPlugins: [], rehypePlugins: [] } });

const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	images: {
		// domains: ["naszsklep-api.vercel.app"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "naszsklep-api.vercel.app",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "media.graphassets.com",
				port: "",
				pathname: "/**",
			},
		],
	},

	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	async redirects() {
		return [
			{
				source: "/products/category/:category",
				destination: "/products/:category/1",
				permanent: true,
			},
			{
				source: "/products/:category",
				destination: "/products/:category/1",
				permanent: true,
			},

			// {
			// 	source: "/products/category/t-shirts",
			// 	destination: "/products/t-shirts/1",
			// 	permanent: true,
			// },
		];
	},
};

module.exports = withMDX(nextConfig);
