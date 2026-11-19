import { fetchJson } from 'lib/drupal';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { page, id, type } = req.query;

    let url = `${process.env.BACKEND_URL}/jsonapi/views/stories_list/${type}?include=field_feature_image.field_media_image,field_categories&`;

    if (id && +id >= 0) {
      url += `views-filter[field_categories_target_id][0]=${id}&`;
    }

    if (page) {
      url += `page=${page}`;
    }

    const data = await fetchJson(url);

    return res.json({ ...data });
  } catch (err: any) {
    return res.status(err.status || 500).send(err.message);
  }
}
