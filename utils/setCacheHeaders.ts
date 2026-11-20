import type { IncomingMessage, ServerResponse } from 'http';

type Options = {
	req: IncomingMessage;
	res: ServerResponse;
	preview?: boolean;
};

export function setCacheHeaders({ req, res, preview }: Options) {
	if (preview || req.headers.cookie?.includes('__prerender_bypass')) {
		return;
	}
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=300, stale-while-revalidate=86400',
	);
}
