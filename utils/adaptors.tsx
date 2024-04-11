import { I_Link, I_Media } from 'types/index';

export const formatMedia = (media: {
  uri: { url: string };
  resourceIdObjMeta?: { alt: string };
}): I_Media | null => {
  if (!media) {
    return null;
  }
  return {
    url: `${process.env.BACKEND_URL}${media?.uri?.url}`,
    alt: media?.resourceIdObjMeta?.alt || '',
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
