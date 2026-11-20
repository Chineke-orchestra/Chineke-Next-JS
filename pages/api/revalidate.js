import { timingSafeEqual } from 'crypto';

function secretMatches(provided) {
  const expected = process.env.DRUPAL_REVALIDATE_SECRET;
  if (!expected || typeof provided !== 'string') {
    return false;
  }
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (!secretMatches(req.query.secret)) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  const { path } = req.query;

  if (typeof path !== 'string' || !/^\/(?![/\\])/.test(path)) {
    return res.status(400).json({ message: 'Invalid path' });
  }

  try {
    await res.revalidate(path);
    return res.status(200).json({ revalidated: true, path });
  } catch (error) {
    return res.status(500).json({ message: 'Revalidation failed' });
  }
}
