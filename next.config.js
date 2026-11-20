const path = require('path');
const getLocales = require('./scripts/get-locales');

if (!process.env.BACKEND_URL) {
	throw new Error(
		'BACKEND_URL is not set. Set it in .env.local for local development, or in the Pantheon Secrets Manager.',
	);
}

const backendUrl = process.env.BACKEND_URL.replace(/\/$/, '');
const { protocol, hostname, port } = new URL(
	process.env.IMAGE_DOMAIN
		? `${backendUrl.startsWith('http:') ? 'http' : 'https'}://${process.env.IMAGE_DOMAIN}`
		: backendUrl,
);

process.env.NEXT_PUBLIC_FRONTEND_URL = (process.env.FRONTEND_URL || '').replace(
	/\/$/,
	'',
);

module.exports = async () => {
	const locales = await getLocales();

	return {
		env: {
			backendUrl,
			imageUrl: `${protocol}//${hostname}${port ? `:${port}` : ''}`,
		},
		reactStrictMode: true,
		cacheHandler: path.resolve(__dirname, './cacheHandler.mjs'),
		cacheMaxMemorySize: 0,
		experimental: {
			imgOptConcurrency: Number(process.env.IMAGE_OPT_CONCURRENCY || 2),
		},
		images: {
			maximumDiskCacheSize: 500 * 1024 * 1024,
			remotePatterns: [
				{
					protocol: protocol.replace(':', ''),
					hostname,
					...(port && { port }),
				},
			],
		},
		i18n: {
			locales,
			defaultLocale: 'en',
		},
		output: 'standalone',
		async rewrites() {
			return [
				{
					// inline-images can still be fetched from their source
					source: '/sites/default/:path*',
					destination: `${backendUrl}/sites/default/:path*`,
				},
				{
					source: '/sitemap.xml',
					destination: '/api/sitemap',
				},
			];
		},
	};
};
