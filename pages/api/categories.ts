import { setCacheHeaders } from 'utils/setCacheHeaders';
import { fetchJson } from 'lib/drupal';

export default async function handler(req: any, res: any) {
  try {
        const data = await fetchJson(
      `${process.env.BACKEND_URL}/jsonapi/taxonomy_term/categories`,
    );

    setCacheHeaders({ req, res });
    return res.json({ data });
  } catch (err: any) {
    return res.status(err.status || 500).send(err.message);
  }
}
