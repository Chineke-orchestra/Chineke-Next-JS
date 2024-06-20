import { getCurrentLocaleStore, globalDrupalStateStores } from '../lib/stores';
import { getPreview } from '../lib/getPreview';
import { translatePath } from '@pantheon-systems/drupal-kit';
import { fetchLists } from 'utils/fetchLists';
import { fetchFooterData, fetchHeaderData } from '../utils/dataFetcher';
import { includesArray, getHrefLang } from './fetchPageDataConfig';

export async function fetchPageData(context, path) {
  const { locale, locales } = context;
  const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const hrefLang = getHrefLang(locales, origin);
  const lang = context.preview ? context.previewData.previewLang : locale;

  const store = getCurrentLocaleStore(lang, globalDrupalStateStores);

  // get the uuid and resource name from the resource's path alias
  const {
    entity: { uuid },
    jsonapi: { resourceName },
  } = await translatePath(`${store.apiBase}/router/translate-path/`, path, {});

  // Adjust the includes array based on resourceName if needed
  let dynamicIncludesArray = [...includesArray];
  if (resourceName === 'node--news' || resourceName === 'node--stories') {
    dynamicIncludesArray.push('field_feature_image.field_media_image');
  }
  if (resourceName === 'node--news') {
    dynamicIncludesArray.push('field_tags_category');
  }
  if (resourceName === 'node--stories') {
    dynamicIncludesArray.push('field_categories');
  }

  const includeParam = dynamicIncludesArray.join(',');

  const params = `include=${includeParam}`;

  const previewParams =
    context.preview && (await getPreview(context, resourceName, params));

  if (previewParams?.error) {
    return {
      redirect: {
        destination: previewParams.redirect,
        permanent: false,
      },
    };
  }

  // fetch page data
  const pageData = await store.getObject({
    objectName: resourceName,
    id: uuid,
    params: context.preview ? previewParams : params,
    refresh: true,
    res: context.res,
    anon: context.preview ? false : true,
  });

  const footerMenu = await fetchFooterData(context);
  const headerMenu = await fetchHeaderData(context);

  return {
    pageData: {
      ...pageData,
      field_reusable_components: await fetchLists(
        pageData?.field_reusable_components,
        store,
        pageData,
        resourceName,
      ),
    },
    hrefLang,
    footerMenu,
    headerMenu,
    resourceName,
    preview: Boolean(context.preview),
  };
}
