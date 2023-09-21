/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		serverActions: true,
		// optimizePackageImports: ['date-fns'],
	},
};

module.exports = nextConfig;
