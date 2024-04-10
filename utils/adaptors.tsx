import { translatePath } from '@pantheon-systems/drupal-kit';
import { I_Card, I_Link, I_Media } from 'types/index';

export const formatMedia = (media: {
  uri: { url: string };
  resourceIdObjMeta?: { alt: string };
}): I_Media => {
  return {
    url: `${process.env.BACKEND_URL}${media.uri.url}`,
    alt: media.resourceIdObjMeta?.alt || '',
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
  // const getLinkData = async () => {
  //   try {
  //     const data = await translatePath(
  //       `${process.env.BACKEND_URL}/router/translate-path/`,
  //       link.uri.replace('entity:', ''),
  //       {},
  //     );
  //     console.log('dataaaaa', data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // if (link.uri.includes('entity')) {
  //   getLinkData();
  // }

  let target = '_self' as '_self' | '_blank';
  let rel = '';
  if (link?.options?.attributes?.target) {
    target = link?.options?.attributes?.target;
  } else if (link.uri?.includes('internal')) {
    target = '_self';
  } else {
    target = '_blank';
  }
  if (link?.options?.attributes?.rel) {
    rel = link?.options?.attributes?.rel;
  } else if (link.uri?.includes('internal')) {
    rel = '';
  } else {
    rel = 'nofollow noopenner';
  }
  return {
    url: link.uri.replace('internal:', ''),
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
