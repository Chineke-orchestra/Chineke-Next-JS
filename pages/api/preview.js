import { drupal } from '../../lib/drupal';

export default async function handler(req, res) {
	return drupal.preview(req, res);
}
