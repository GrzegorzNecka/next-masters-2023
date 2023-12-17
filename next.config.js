/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({ options: { remarkPlugins: [], rehypePlugins: [] } });

const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	images: {
		domains: ["naszsklep-api.vercel.app"],
	},
};

module.exports = withMDX(nextConfig);
