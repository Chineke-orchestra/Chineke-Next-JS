import { drupal, fetchJson, localeOptions } from '../lib/drupal';
import { formatLink, formatMedia } from './adaptors';

export async function fetchFooterData(context) {
  const [featuredLinks, menuLinks, socialLinks, basicBlock, menuTitle] =
    await Promise.all([
      drupal.getResourceCollection('menu_items--footer-featured-links', {
        withAuth: false,
        ...localeOptions(context),
      }),
      drupal.getResourceCollection('menu_items--footer-menu-links', {
        withAuth: false,
        ...localeOptions(context),
      }),
      drupal.getResourceCollection('menu_items--social-links', {
        withAuth: false,
        params: { include: 'field_icon,field_icon.field_media_image' },
        ...localeOptions(context),
      }),
      drupal.getResourceCollection('block_content--basic', {
        withAuth: false,
        ...localeOptions(context),
      }),
      drupal.getResourceCollection('menu--menu', {
        withAuth: false,
        ...localeOptions(context),
      }),
    ]);

  const shortFeaturedLinks = featuredLinks.map((item) => ({
    title: item?.field_featured_title,
    tagline: item?.field_tagline,
    description: item?.description,
    link: formatLink({
      title: item?.title,
      uri: item?.url,
      options: item?.options,
    }),
    ctaTitle: item?.title,
  }));

  const shortMenuLinks = menuLinks.map((item) => ({
    link: formatLink({
      title: item?.title,
      uri: item?.url,
      options: item?.options,
    }),
  }));

  const shortSocialLinks = socialLinks.map((item) => ({
    icon: formatMedia(item?.field_icon?.field_media_image),
    link: formatLink({
      title: item?.title,
      uri: item?.url,
      options: item?.options,
    }),
  }));

  const shortBasicBlock = basicBlock.map((item) => ({
    title: item?.body?.value,
  }));

  const specificMenuTitle = menuTitle.find(
    (item) => item.id === 'cb6f142a-6aa3-40cf-8a82-27fc3d488884',
  );

  const shortMenuTitle = specificMenuTitle
    ? {
        title: specificMenuTitle.label,
      }
    : null;

  return {
    featuredLinks: shortFeaturedLinks,
    menuLinks: shortMenuLinks,
    socialLinks: shortSocialLinks,
    basicBlock: shortBasicBlock,
    menuTitle: shortMenuTitle,
  };
}

export async function fetchHeaderData(context) {
  try {
    const headerMenuResponse = await fetchJson(
      `${process.env.backendUrl}/jsonapi/menu_items/header-menu?include=field_field_logo_image,field_field_logo_image.field_media_image`,
    );

    const { data, included } = headerMenuResponse;

    const shortHeaderMenu = await Promise.all(
      data?.map(async (item) => {
        let imageUrl = null;
        let imagePageUrl = null;

        try {
          if (
            item?.attributes?.field_is_featured &&
            item?.relationships?.field_field_logo_image?.data?.id
          ) {
            const imageId = item.relationships.field_field_logo_image.data.id;
            const imageDetails = included.find((inc) => inc.id === imageId);

            if (imageDetails) {
              const mediaImageId =
                imageDetails.relationships.field_media_image.data.id;
              const mediaDetails = included.find(
                (inc) => inc.id === mediaImageId,
              );
              if (mediaDetails && mediaDetails.attributes?.uri?.url) {
                imageUrl = `${process.env.backendUrl}${mediaDetails.attributes.uri.url}`;
              }
            }
          }

          if (item?.attributes?.field_is_featured && item?.attributes?.url) {
            const response = await fetchJson(
              `${process.env.backendUrl}/router/translate-path?path=${item.attributes.url}`,
            );

            if (
              response?.jsonapi?.individual &&
              !response?.jsonapi?.individual?.includes('homepage') 
            ) {
              const featureImageUrl =
                response.jsonapi.individual +
                '?include=field_feature_image.field_media_image';
              const featureImageResponse =
                await fetchJson(featureImageUrl);

              if (
                featureImageResponse?.data &&
                featureImageResponse?.included
              ) {
                const featuredImageResponseId =
                  featureImageResponse.data.relationships.field_feature_image
                    .data.id;
                const imageDetail = featureImageResponse.included.find(
                  (inc) => inc.id === featuredImageResponseId,
                );
                if (
                  imageDetail &&
                  imageDetail.relationships?.field_media_image?.data?.id
                ) {
                  const imageDetailId =
                    imageDetail.relationships.field_media_image.data.id;
                  const fileDetail = featureImageResponse.included.find(
                    (inc) => inc.id === imageDetailId,
                  );

                  if (fileDetail && fileDetail.attributes?.uri?.url) {
                    imagePageUrl = `${process.env.backendUrl}${fileDetail.attributes.uri.url}`;
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error('Error processing menu item:', item.id, error);
        }

        return {
          id: item?.id,
          parentId: item?.attributes?.parent || null,
          description: item?.attributes?.description || null,
          enabled: item?.attributes?.enabled || null,
          isFeatured: item?.attributes?.field_is_featured || null,
          link: formatLink({
            title: item?.attributes?.title,
            uri: item?.attributes?.url,
            options: item?.attributes?.options,
          }),
          imageUrl: imageUrl,
          imagePageUrl: imagePageUrl,
        };
      }),
    );

    return {
      headerMenu: shortHeaderMenu,
    };
  } catch (error) {
    console.error('Failed to fetch header menu data:', error);
    return { headerMenu: [] };
  }
}
