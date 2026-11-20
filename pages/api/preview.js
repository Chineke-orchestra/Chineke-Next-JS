import { drupal } from '../../lib/drupal';

export default async function handler(req, res) {
	const { path } = req.query;

	if (typeof path !== 'string' || !/^\/(?![/\\])/.test(path)) {
		return res.status(400).json({ message: 'Invalid path' });
	}

	const validation = await drupal.fetch(
		drupal.buildUrl('/next/draft-url').toString(),
		{
			method: 'POST',
			withAuth: true,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(req.query),
		},
	);

	if (
		!validation.ok ||
		!validation.headers.get('content-type')?.includes('json')
	) {
		return res.status(403).json({ message: 'Draft URL validation failed' });
	}

	res.setDraftMode({ enable: true });
	res.writeHead(307, { Location: path });
	return res.end();
}
