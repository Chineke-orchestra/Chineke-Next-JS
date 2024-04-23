import React from 'react';
import {
  Carousel,
  ExploreSection,
  StoriesCarousel,
  Accordion,
} from 'components';
import {
  formatCardData,
  formatCardWithImageData,
  formatLink,
  formatMedia,
  formatTagsData,
} from 'utils/adaptors';
import Pattern, { PatternProps } from 'components/Pattern/Pattern';
import TwoColumnText, {
  TwoColumnTextProps,
} from 'components/TwoColumnText/TwoColumnText';
import Hero, { HeroProps } from 'components/Hero/Hero';
import ThreeColumnLayout, {
  ThreeColumnLayoutProps,
} from 'components/ThreeColumnLayout/ThreeColumnLayout';
import RteSingleColumn from 'components/RteSingleColumn/RteSingleColumn';

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
      case 'paragraph--stories_carousel':
        return (
          <StoriesCarousel
            title={component?.field_title}
            body={component?.field_body?.value}
            tagline={component?.field_tagline}
            link={formatLink(component?.field_cta_button)}
            cards={formatCardWithImageData(component?.field_story_card)}
          />
        );

      case 'paragraph--pattern':
        const patternProps: PatternProps = {
          patternBackground: component?.field_pattern_background_colour,
          patternImage: formatMedia(
            component?.field_pattern_image?.field_media_image_1,
          ),
          patternColor: component?.field_pattern_image_colour,
        };

        return <Pattern {...patternProps} />;
      case 'paragraph--2_column_text':
        const twoColumnTextPropsData: TwoColumnTextProps = {
          textLeft: component?.field_left_column_text?.value,
          textRight: component?.field_right_column_text?.value,
        };

        return <TwoColumnText {...twoColumnTextPropsData} />;
      case 'paragraph--rte_single_column':
        const singleColumnPropsData = {
          text: component?.field_text?.value,
        };

        return <RteSingleColumn {...singleColumnPropsData} />;
      case 'paragraph--3_column_layout':
        const threeColumnLayoutProps: ThreeColumnLayoutProps = {
          image: formatMedia(component?.field_3col_image?.field_media_image),
          title: component?.field_3col_title,
          text: component?.field_3col_body_text?.value,
        };

        return <ThreeColumnLayout {...threeColumnLayoutProps} />;
      case 'paragraph--static_2_column':
        const staticTwoColumnPropsData = {
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
        return <StaticTwoColumns {...staticTwoColumnPropsData} />;
      case 'paragraph--feature':
        const featurePropsData = {
          headline: component?.field_tagline_text,
          title: component?.field_feature_title,
          text: component?.field_feature_text?.value,
          ctaLink: formatLink(component?.field_feature_cta_button),
          image: formatMedia(component?.field_image?.field_media_image_2),
        };

        return <Feature {...featurePropsData} />;
      case 'paragraph--rte_single_column':
        const singleColumnProps = {
          text: component?.field_text?.value,
        };

        return <RteSingleColumn {...singleColumnProps} />;

      case 'paragraph--2_column_text':
        const twoColumnTextProps = {
          textLeft: component?.field_left_column_text?.value,
          textRight: component?.field_right_column_text?.value,
        };

        return <TwoColumnText {...twoColumnTextProps} />;
      case 'paragraph--feature':
        const featureProps: FeatureProps = {
          headline: component?.field_tagline_text,
          title: component?.field_feature_title,
          text: component?.field_feature_text?.value,
          ctaLink: formatLink(component?.field_feature_cta_button),
          image: formatMedia(component?.field_image?.field_media_image_2),
        };

        return <Feature {...featureProps} />;

      case 'paragraph--accordion':
        const accordionItems = component?.field_accordion_item?.map(
          (item: any) => {
            return {
              title: item?.field_accordion_title,
              text: item?.field_accordion_body?.value,
            };
          },
        );
        return (
          <Accordion title={component?.field_title} items={accordionItems} />
        );

      case 'paragraph--stories_carousel':
        return (
          <StoriesCarousel
            title={component?.field_title}
            body={component?.field_body?.value}
            tagline={component?.field_tagline}
            link={formatLink(component?.field_cta_button)}
            cards={formatCardWithImageData(component?.field_story_card)}
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
