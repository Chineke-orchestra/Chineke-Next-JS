import { getCurrentLocaleStore, globalDrupalStateStores } from 'lib/stores';

export default async function handler(req: any, res: any) {
  try {
    const { locale } = req.query;
    const store = getCurrentLocaleStore(
      locale as string,
      globalDrupalStateStores,
    );

    const data = await store.fetchData(
      `${process.env.BACKEND_URL}/jsonapi/taxonomy_term/categories`,
    );

    return res.json({ data });
  } catch (err: any) {
    return res.status(err.status).send(err.message);
  }
}
