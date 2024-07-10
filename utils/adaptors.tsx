import { I_Tag } from 'components/NewsList/NewsList';
import { I_Watch_And_Listen_Props } from 'components/WatchAndListen/WatchAndListen';
import { Colors, I_Card, I_Link, I_Media } from 'types/index';

export const formatMedia = (media: {
  uri: { url?: string };
  resourceIdObjMeta?: { alt: string };
}): I_Media => {
  return {
    url: media?.uri?.url ? `${process.env.backendUrl}${media.uri.url}` : '',
    alt: media?.resourceIdObjMeta?.alt || '',
  };
};

export const formatLink = (link: {
  title: string;
  uri: string;
  options?: {
    attributes: {
      target: '_self' | '_blank' | 'none';
      rel: string;
    };
  };
}): I_Link => {
  let target = '_self' as '_self' | '_blank';
  let rel = '';

  if (
    link?.options?.attributes?.target &&
    link?.options?.attributes?.target !== 'none'
  ) {
    target = link?.options?.attributes?.target;
  } else {
    target = '_self';
  }

  if (link?.options?.attributes?.rel) {
    rel = link?.options?.attributes?.rel;
  } else if (target === '_blank') {
    rel = 'nofollow noopener';
  } else {
    rel = '';
  }

  return {
    url: link?.uri?.replace('internal:', ''),
    title: link?.title,
    target,
    rel,
  };
};

export const formatCardData = (
  data: {
    field_title: string;
    field_body_text_formatted: {
      value: string;
    };
    field_link: any;
  }[],
): I_Card[] => {
  return data?.map((item: any) => {
    return {
      title: item?.field_title,
      body: item?.field_body_text_formatted?.value,
      link: formatLink(item?.field_link),
    };
  });
};

export const formatTagsData = (
  data: {
    name: string;
  }[],
): string[] => {
  return data?.map((item) => item.name);
};

export const formatCardWithImageData = (
  data: {
    field_card_background_color: { color: string };
    field_target_option: string;
    field_stories: {
      title: string;
      path: { alias: string };
      field_tags: any[];
    };
    field_story_image: any;
  }[],
): {
  backgroundColor: Colors;
  link: I_Link;
  tag: string;
  image: I_Media;
}[] => {
  return data?.map((item) => {
    return {
      backgroundColor: item?.field_card_background_color?.color as Colors,
      image: formatMedia(item?.field_story_image?.field_media_image),
      link: {
        url: item?.field_stories?.path?.alias,
        title: item?.field_stories?.title,
        target:
          item?.field_target_option === 'new_browser' ? '_blank' : '_self',
      },
      tag: item?.field_stories?.field_tags?.[0]?.name,
    };
  });
};

export const getMediaFromIncluded = (included: any, mediaId: string) => {
  const media = included?.find((item: any) => item?.id === mediaId) || null;
  const file =
    included?.find(
      (item: any) =>
        item.id === media?.relationships?.field_media_image?.data?.id,
    ) || null;

  return { media, file };
};

export const formatViewEndpointPath = (
  viewId: string,
  displayId: string,
  optionalInclude: string = '',
) => {
  return `${process.env.backendUrl}/jsonapi/views/${viewId}/${displayId}?include=field_feature_image.field_media_image${optionalInclude}`;
};

export const formatEventsCardsData = (
  data: any,
): {
  tag?: string;
  link: I_Link;
  image: I_Media;
  backgroundColor: Colors;
  fullWidthImage?: boolean;
  date?: string;
} => {
  const colors = ['#ED5500', '#FCDD00', '#1E1E4C', '#0341F2'];
  return data?.data?.map((item: any, index: number) => {
    const mediaId = item?.relationships?.field_feature_image?.data?.id;
    const { media, file } = getMediaFromIncluded(data?.included, mediaId);

    const imageUrl = file?.attributes?.uri?.url
      ? `${process.env.backendUrl}${file?.attributes?.uri?.url}`
      : null;

    return {
      tag: item?.attributes?.field_location,
      link: {
        url: item?.attributes?.path?.alias || '',
        title: item?.attributes?.title,
      },
      backgroundColor: colors[index % 4],
      image: {
        url: imageUrl,
        alt: media?.relationships?.field_media_image?.data?.meta?.alt || '',
      },
      date: item?.attributes?.field_date?.value,
    };
  });
};

export const formatWatchAndListenData = (
  data: any,
): I_Watch_And_Listen_Props[] => {
  return data?.map((item: any) => {
    return {
      tags: item?.field_tags?.map((item: any) => item.name),
      title: item?.name,
      spotifyUrl: item?.field_media_oembed_audio,
      videoUrl: item?.field_media_oembed_video,
      image: formatMedia(item?.field_feature_img),
    };
  });
};

export const formatLatestNewsData = (
  data: any,
): {
  image: I_Media | null;
  link: I_Link;
  tags: string[] | null;
}[] => {
  console.log('Data:', JSON.stringify(data.data, null, 2));
  return data?.data?.map((item: any) => {
    const mediaId = item?.relationships?.field_feature_image?.data?.id;
    const { media, file } = getMediaFromIncluded(data?.included, mediaId);

    const tagsId = item?.relationships?.field_tags_category?.data?.[0]?.id;
    const tag = data?.included?.find(
      (includedItem: any) => includedItem.id === tagsId,
    );

    const imageUrl = file?.attributes?.uri?.url
      ? `${process.env.backendUrl}${file.attributes.uri.url}`
      : null;

    return {
      tags: tag?.attributes?.name ? [tag.attributes.name] : null,
      link: {
        url: item?.attributes?.path?.alias || '',
        title: item?.attributes?.title || '',
      },
      image: imageUrl
        ? {
            url: imageUrl,
            alt: media?.relationships?.field_media_image?.data?.meta?.alt || '',
          }
        : null,
    };
  });
};

export const formatNewsListData = (
  data: any,
): {
  image: I_Media;
  date: string;
  link: I_Link;
  category: string;
}[] => {
  return data?.data?.map((item: any) => {
    const mediaId = item?.relationships?.field_feature_image?.data?.id;
    const { media, file } = getMediaFromIncluded(data?.included, mediaId);

    const tagsId = item?.relationships?.field_tags_category?.data?.[0]?.id;

    const tag = data?.included?.find((item: any) => item.id === tagsId);

    const imageUrl = file?.attributes?.uri?.url
      ? `${process.env.backendUrl}${file.attributes.uri.url}`
      : null;

    return {
      category: tag?.attributes?.name || null,
      date: item?.attributes?.field_date_time,
      link: {
        url: item?.attributes?.path?.alias || '',
        title: item?.attributes?.title,
      },
      image: {
        url: imageUrl,
        alt: media?.relationships?.field_media_image?.data?.meta?.alt || '',
      },
    };
  });
};

export const formatNewsCategoriesData = (
  data: {
    attributes: { name: string; drupal_internal__tid: number };
  }[],
): I_Tag[] => {
  return data?.map((item) => {
    return {
      name: item.attributes?.name,
      id: item.attributes?.drupal_internal__tid,
    };
  });
};
