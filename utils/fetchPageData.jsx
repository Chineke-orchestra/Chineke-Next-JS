import { drupal, localeOptions } from '../lib/drupal';
import { fetchLists } from 'utils/fetchLists';
import { fetchFooterData, fetchHeaderData } from '../utils/dataFetcher';
import { includesArray, getHrefLang } from './fetchPageDataConfig';

export async function fetchPageData(context, path) {
  const { locale, locales } = context;
  const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const hrefLang = getHrefLang(locales, origin);
  const withAuth = Boolean(context.preview);

  const translated = await drupal.translatePath(`/${path}`, { withAuth });
  if (!translated) {
    throw new Error(`Unable to resolve path: ${path}`);
  }
  const {
    entity: { uuid },
    jsonapi: { resourceName },
  } = translated;

  // Adjust the includes array based on resourceName if needed
  let dynamicIncludesArray = [...includesArray];

  if (resourceName === 'node--events') {
    const excludeFromParams = ['field_reusable_components.field_stats'];
    dynamicIncludesArray = dynamicIncludesArray.filter((item) =>
      !excludeFromParams.includes(item)
    );
    dynamicIncludesArray.push('field_feature_image.field_media_image');
    dynamicIncludesArray.push('field_video.field_feature_img');
    dynamicIncludesArray.push('field_tags');
    dynamicIncludesArray.push('field_amenities.field_icon.field_media_image');
  } else {
    if (resourceName === 'node--news' || resourceName === 'node--stories') {
      dynamicIncludesArray.push('field_feature_image.field_media_image');
    }
    if (resourceName === 'node--news') {
      dynamicIncludesArray.push('field_tags_category');
    }
    if (resourceName === 'node--stories') {
      dynamicIncludesArray.push('field_categories');
    }
  }

  const params = { include: dynamicIncludesArray.join(',') };

  if (context.preview && context.previewData?.resourceVersion) {
    params.resourceVersion = context.previewData.resourceVersion;
  }

  const pageData = await drupal.getResource(resourceName, uuid, {
    params,
    withAuth,
    ...localeOptions(context),
  });

  const footerMenu = await fetchFooterData(context);
  const headerMenu = await fetchHeaderData(context);

  return {
    pageData: {
      ...pageData,
      field_reusable_components: await fetchLists(
        pageData?.field_reusable_components,
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
