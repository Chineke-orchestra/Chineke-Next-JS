import moment from 'moment';
import { formatMedia } from './adaptors';

export const fetchLists = async (components: any[], store: any) => {
  const formattedComponents: any = [];

  for (const component of components) {
    switch (component?.type) {
      case 'paragraph--event_carousel': {
        const colors = ['#ED5500', '#FCDD00', '#1E1E4C', '#0341F2'];
        const viewId =
          component?.field_event_card?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_event_card?.resourceIdObjMeta?.display_id;

        const data = await store.fetchData(
          `${process.env.BACKEND_URL}/jsonapi/views/${viewId}/${displayId}?include=field_feature_image.field_media_image`,
        );
        const events = data?.data?.map((item: any, index: number) => {
          const mediaId = item?.relationships?.field_feature_image?.data?.id;
          const media = data?.included?.find(
            (item: any) => item?.id === mediaId,
          );
          const file = data?.included?.find(
            (item: any) =>
              item.id === media?.relationships?.field_media_image?.data?.id,
          );

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
            date: moment(item?.attributes?.field_date?.value).format(
              'D MMM YYYY - hA',
            ),
          };
        });
        formattedComponents.push({ ...component, events, events2: data });
        break;
      }
      default:
        formattedComponents.push(component);
    }
  }
  return formattedComponents;
};
