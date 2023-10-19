/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		serverActions: true,
		optimizePackageImports: [
			'date-fns',
			'lucide-react',
		],
	},
};

module.exports = nextConfig;
