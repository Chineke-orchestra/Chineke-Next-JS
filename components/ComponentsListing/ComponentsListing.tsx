import React from 'react';
import { ExploreSection } from '..';
import {
  formatCardData,
  formatLink,
  formatMedia,
  formatTagsData,
} from 'utils/adaptors';
import Hero from 'components/Hero/Hero';

const ComponentsListing = ({ components }: { components: any }) => {
  const PrintComponent = ({ component }: any) => {
    switch (component?.type) {
      case 'paragraph--hero_banner':
        const heroProps = {
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
