import {
  formatEventsCardsData,
  formatLatestNewsData,
  formatNewsListData,
  formatViewEndpointPath,
  formatStoriesListData,
} from './adaptors';
import { fetchJson } from '../lib/drupal';

export const fetchLists = async (
  components: any[],
  pageData?: any,
  resourceName?: string,
) => {
  const formattedComponents: any = [];

  switch (true) {
    case resourceName === 'node--events': {
      formattedComponents.push({
        image: pageData?.field_feature_image,
        backgroundColor: pageData?.field_title_card_bg_color?.color || null,
        maskColor: pageData?.field_image_mask_color?.color || null,
        imageMaskPosition: pageData?.field_image_mask_position,
        field_date: pageData?.field_date,
        field_amenities: pageData?.field_amenities,
        location: pageData?.field_location,
        field_book_now: pageData?.field_book_now,
        title: pageData?.title,
        field_display_title_card: pageData?.field_display_title_card,
        field_video: pageData?.field_video,
        field_tags: pageData?.field_tags,
        type: 'event_info',
      });
      break;
    }

    case resourceName === 'node--news' || resourceName === 'node--stories': {
      let headline = '';

      if ( pageData.field_display_title_card  !== true) {
        if (resourceName === 'node--news') {
          headline = pageData?.field_tags_category?.name || '';
        }
        if (resourceName === 'node--stories') {
          headline = pageData?.field_categories?.name || '';
        }
        
          formattedComponents.push({
            field_background_color: pageData?.field_title_card_bg_color,
            field_image_position: 'right',
            field_title: pageData?.title,
            field_headline: headline,
            field_static_2_column_image: pageData?.field_feature_image,
            field_2_columns_text: [
              {
                field_link: null,
                field_rich_text: pageData?.body?.value || null,
                field_cta_link_icon: null,
                withParse: true,
              },
            ],
            type: 'paragraph--static_2_column',
          });
      }
      break;
    }
    default:
      break;
  }

  for (const component of components) {
    switch (component?.type) {
      case 'paragraph--event_carousel': {
        const viewId =
          component?.field_event_card?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_event_card?.resourceIdObjMeta?.display_id;
        if (viewId && displayId) {
          const data = await fetchJson(
            formatViewEndpointPath(viewId, displayId),
          );
          const events = formatEventsCardsData(data);
          formattedComponents.push({ ...component, events });
        }

        break;
      }
      case 'paragraph--event_list': {
        const viewId =
          component?.field_event_list_view?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_event_list_view?.resourceIdObjMeta?.display_id;
        if (viewId && displayId) {
          const data = await fetchJson(
            formatViewEndpointPath(viewId, displayId),
          );

          const events = formatEventsCardsData(data);
          formattedComponents.push({ ...component, events });
        }

        break;
      }
      case 'paragraph--latest_news': {
        const viewId =
          component?.field_latest_news?.resourceIdObjMeta
            ?.drupal_internal__target_id;

        const displayId =
          component?.field_latest_news?.resourceIdObjMeta?.display_id;

        if (viewId && displayId) {
          const data = await fetchJson(
            formatViewEndpointPath(
              viewId,
              displayId,
              ',field_tags_category, field_categories, field_tags, field_video.field_feature_img',
            ),
          );

          const news = formatLatestNewsData(data);

          formattedComponents.push({ ...component, news });
        }

        break;
      }
      case 'paragraph--news_list': {
        const viewId =
          component?.field_news_list?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_news_list?.resourceIdObjMeta?.display_id;

        const data = await fetchJson(
          formatViewEndpointPath(viewId, displayId, ',field_tags_category'),
        );

        const news = formatNewsListData(data);

        formattedComponents.push({ ...component, news, test: data });
        break;
      }

      case 'paragraph--stories_list': {
        const viewId =
          component?.field_stories_list?.resourceIdObjMeta
            ?.drupal_internal__target_id;
        const displayId =
          component?.field_stories_list?.resourceIdObjMeta?.display_id;

        const data = await fetchJson(
          formatViewEndpointPath(viewId, displayId, ',field_categories'),
        );

        const stories = formatStoriesListData(data);

        formattedComponents.push({ ...component, stories });
        break;
      }

      default:
        formattedComponents.push(component);
    }
  }
  return formattedComponents;
};
