import { getCurrentLocaleStore, globalDrupalStateStores } from 'lib/stores';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { locale, page, id } = req.query;

    const store = getCurrentLocaleStore(
      (locale as string) || 'en',
      globalDrupalStateStores,
    );

    let url = `${process.env.BACKEND_URL}/jsonapi/views/news_list/default?include=field_feature_image.field_media_image,field_tags_category&`;

    if (id && +id >= 0) {
      url += `views-filter[field_tags_category_target_id][0]=${id}&`;
    }

    if (page) {
      url += `page=${page}`;
    }

    const data = await store.fetchData(url);

    return res.json({ ...data });
  } catch (err: any) {
    return res.status(err.status).send(err.message);
  }
}
