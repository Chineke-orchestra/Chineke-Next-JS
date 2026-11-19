import { fetchJson } from 'lib/drupal';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { page, id } = req.query;

    let url = `${process.env.BACKEND_URL}/jsonapi/views/news_list/default?include=field_feature_image.field_media_image,field_tags_category&`;

    if (id && +id >= 0) {
      url += `views-filter[field_tags_category_target_id][0]=${id}&`;
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
