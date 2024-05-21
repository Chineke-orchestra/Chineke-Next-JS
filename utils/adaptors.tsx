import { Colors, I_Card, I_Link, I_Media } from 'types/index';

export const formatMedia = (media: {
  uri: { url: string };
  resourceIdObjMeta?: { alt: string };
}): I_Media => {
  return {
    url: `${process.env.BACKEND_URL}${media?.uri.url}`,
    alt: media?.resourceIdObjMeta?.alt || '',
  };
};

export const formatLink = (link: {
  title: string;
  uri: string;
  options?: {
    attributes: {
      target: '_self' | '_blank';
      rel: string;
    };
  };
}): I_Link => {
  let target = '_self' as '_self' | '_blank';
  let rel = '';
  if (link?.options?.attributes?.target) {
    target = link?.options?.attributes?.target;
  } else if (link?.uri?.includes('internal')) {
    target = '_self';
  } else {
    target = '_blank';
  }
  if (link?.options?.attributes?.rel) {
    rel = link?.options?.attributes?.rel;
  } else if (link?.uri?.includes('internal')) {
    rel = '';
  } else {
    rel = 'nofollow noopenner';
  }
  return {
    url: link?.uri.replace('internal:', ''),
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
  return data.map((item) => item.name);
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
  const media = included?.find((item: any) => item?.id === mediaId);
  const file = included?.find(
    (item: any) =>
      item.id === media?.relationships?.field_media_image?.data?.id,
  );

  return { media, file };
};

export const formatViewEndpointPath = (viewId: string, displayId: string) => {
  return `${process.env.BACKEND_URL}/jsonapi/views/${viewId}/${displayId}?include=field_feature_image.field_media_image`;
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

    return {
      tag: item?.attributes?.field_location,
      link: {
        url: item?.attributes?.path?.alias || '',
        title: item?.attributes?.title,
      },
      backgroundColor: colors[index % 4],
      image: {
        url: `${process.env.BACKEND_URL}${file?.attributes?.uri?.url}`,
        alt: media?.relationships?.field_media_image?.data?.meta?.alt,
      },
      date: item?.attributes?.field_date?.value,
    };
  });
};
