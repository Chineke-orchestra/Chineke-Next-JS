import React from 'react';
import { ExploreSection } from '..';
import {
  formatCardData,
  formatLink,
  formatMedia,
  formatTagsData,
} from 'utils/adaptors';
import Hero, { HeroProps } from 'components/Hero/Hero';
import ThreeColumnLayout, {
  ThreeColumnLayoutProps,
} from 'components/ThreeColumnLayout/ThreeColumnLayout';
import StaticTwoColumns, {
  StaticTwoColumnsProps,
} from 'components/StaticTwoColumns/StaticTwoColumns';
import Feature, { FeatureProps } from 'components/Feature/Feature';

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

      case 'paragraph--3_column_layout':
        const threeColumnLayoutProps: ThreeColumnLayoutProps = {
          image: formatMedia(component?.field_3col_image?.field_media_image),
          title: component?.field_3col_title,
          text: component?.field_3col_body_text?.value,
        };

        return <ThreeColumnLayout {...threeColumnLayoutProps} />;

      case 'paragraph--feature':
        const featureProps: FeatureProps = {
          headline: component?.field_tagline_text,
          title: component?.field_feature_title,
          text: component?.field_feature_text?.value,
          ctaLink: formatLink(component?.field_feature_cta_button),
          image: formatMedia(component?.field_image?.field_media_image_2),
        };

        return <Feature {...featureProps} />;

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
