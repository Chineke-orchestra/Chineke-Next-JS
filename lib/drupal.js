import { NextDrupalPages } from 'next-drupal';
import { DRUPAL_URL } from './constants';

const { CLIENT_ID, CLIENT_SECRET, DEBUG_MODE } = process.env;

export const drupal = new NextDrupalPages(DRUPAL_URL, {
	auth:
		CLIENT_ID && CLIENT_SECRET
			? { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET }
			: undefined,
	debug: Boolean(DEBUG_MODE),
});

export const fetchJson = async (url, { withAuth = false } = {}) => {
	const response = await drupal.fetch(url, { withAuth });
	if (!response.ok) {
		const error = new Error(`Request to ${url} failed: ${response.status}`);
		error.status = response.status;
		throw error;
	}
	return response.json();
};

export const localeOptions = ({ locale, defaultLocale } = {}) => ({
	locale,
	defaultLocale,
});
