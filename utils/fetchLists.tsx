import moment from 'moment';
import {
  formatEventsCardsData,
  formatLatestNewsData,
  formatViewEndpointPath,
} from './adaptors';

const colors = ['#ED5500', '#FCDD00', '#1E1E4C', '#0341F2'];

export const fetchLists = async (components: any[], store: any) => {
  const formattedComponents: any = [];

  for (const component of components) {
    switch (component?.type) {
      case 'paragraph--event_carousel': {
        const viewId =
          component?.field_event_card?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_event_card?.resourceIdObjMeta?.display_id;

        const data = await store.fetchData(
          formatViewEndpointPath(viewId, displayId),
        );
        const events = formatEventsCardsData(data);
        formattedComponents.push({ ...component, events, events2: data });
        break;
      }
      case 'paragraph--event_list': {
        const viewId =
          component?.field_event_list_view?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_event_list_view?.resourceIdObjMeta?.display_id;

        const data = await store.fetchData(
          formatViewEndpointPath(viewId, displayId),
        );

        const events = formatEventsCardsData(data);
        formattedComponents.push({ ...component, events, test: data });

        break;
      }
      case 'paragraph--latest_news': {
        const viewId =
          component?.field_latest_news?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_latest_news?.resourceIdObjMeta?.display_id;

        const data = await store.fetchData(
          formatViewEndpointPath(viewId, displayId, ',field_tags_category'),
        );

        const news = formatLatestNewsData(data);

        formattedComponents.push({ ...component, news, test: data });
        break;
      }
      default:
        formattedComponents.push(component);
    }
  }
  return formattedComponents;
};
