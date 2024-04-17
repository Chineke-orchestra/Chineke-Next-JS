import { translatePath } from '@pantheon-systems/drupal-kit';
import { I_Card, I_Link, I_Media } from 'types/index';

export const formatMedia = (media: {
  uri: { url: string };
  resourceIdObjMeta?: { alt: string };
}): I_Media | null => {
  if (!media) {
    return null;
  }
  return {
    url: `${process.env.BACKEND_URL}${media.uri.url}`,
    alt: media.resourceIdObjMeta?.alt || '',
  };
};

export const formatLink = (link: {
  title: string;
  uri: string;
}): I_Link | null => {
  if (!link) {
    return null;
  }

  return {
    url: link?.uri?.replace('internal:', ''),
    title: link?.title,
    target: link?.uri?.includes('internal') ? '_self' : '_blank',
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
): (I_Card | null)[] => {
  return data?.map((item: any) => {
    const link = formatLink(item?.field_link);
    if (!link) {
      return null;
    }
    return {
      title: item?.field_title,
      body: item?.field_body_text_formatted?.value,
      link: link,
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
