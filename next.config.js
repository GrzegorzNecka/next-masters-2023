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
		],
	},
};

module.exports = withMDX(nextConfig);
