import React from 'react';
import { ExploreSection } from '..';
import {
  formatCardData,
  formatLink,
  formatMedia,
  formatTagsData,
} from 'utils/adaptors';
import Hero, { HeroProps } from 'components/Hero/Hero';
import StaticTwoColumns, {
  StaticTwoColumnsProps,
} from 'components/StaticTwoColumns/StaticTwoColumns';

const ComponentsListing = ({ components }: { components: any }) => {
  const PrintComponent = ({ component }: any) => {
    switch (component?.type) {
      case 'paragraph--hero_banner':
        const heroProps: HeroProps = {
          title: component?.field_title,
          links: component?.field_links.map((item: any) => formatLink(item)),
          video: formatMedia(component?.field_video?.field_media_video_file),
          externalVideo: component?.field_video?.field_media_oembed_video,
          image: formatMedia(component?.field_mobile_image?.field_media_image),
        };

        return <Hero {...heroProps} />;

      case 'paragraph--explore_section_variation_1':
        return (
          <ExploreSection
            variation="variation_one"
            title={component?.field_title}
            cards={formatCardData(component?.field_cards)}
            backgroundImage={formatMedia(
              component?.field_background_image?.field_media_image,
            )}
          />
        );

      case 'paragraph--explore_section_variation_2':
        return (
          <ExploreSection
            variation="variation_two"
            cards={formatCardData(component?.field_cards)}
            featuredCard={{
              title: component?.field_featured_link?.title,
              body: component?.field_featured_link?.body?.value,
              link: formatLink(component?.field_link),
              image: formatMedia(
                component?.field_featured_link.field_feature_image
                  .field_media_image,
              ),
              tags: formatTagsData(
                component?.field_featured_link?.field_tags_category,
              ),
            }}
          />
        );

      case 'paragraph--static_2_column':
        const staticTwoColumnProps: StaticTwoColumnsProps = {
          backgroundColor: component?.field_background_color?.color,
          imagePosition: component?.field_image_position,
          title: component?.field_title,
          headline: component?.field_headline,
          ctaLink: formatLink(component?.field_cta_button),
          ctaIcon: formatMedia(
            component?.field_cta_link_icon?.field_media_image,
          ),
          image: formatMedia(
            component?.field_static_2_column_image?.field_media_image,
          ),
          cards: component?.field_2_columns_text.map((item: any) => {
            return {
              link: formatLink(item?.field_link),
              text: item.field_rich_text,
              icon: formatMedia(item?.field_cta_link_icon?.field_media_image),
            };
          }),
        };
        return <StaticTwoColumns {...staticTwoColumnProps} />;

      default:
        return <p>block {component?.type} was not implemented</p>;
    }
  };

  return (
    <>
      {components &&
        components.length > 0 &&
        components.map((component: any, index: number) => (
          <PrintComponent key={index} component={component} />
        ))}
    </>
  );
};

export default React.memo(ComponentsListing);
