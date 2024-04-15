import React from 'react';
import Hero from '../Hero/Hero';
import StaticTwoColumns from '../StaticTwoColumns/StaticTwoColumns';
import Feature from '../Feature/Feature';
import RteSingleColumn from '../RteSingleColumn/RteSingleColumn';
import TwoColumnText from '../TwoColumnText/TwoColumnText';
import { formatMedia, formatLink } from 'utils/adaptors';

const ComponentsListing = ({ components }) => {
  console.log(components);
  const PrintComponent = ({ component }) => {
    switch (component?.type) {
      case 'paragraph--hero_banner':
        const heroProps = {
          title: component?.field_title,
          links: component?.field_links.map((item) => formatLink(item)),
          video: formatMedia(component?.field_video?.field_media_video_file),
          externalVideo: component?.field_video?.field_media_oembed_video,
          image: formatMedia(component?.field_mobile_image?.field_media_image),
        };
        return <Hero {...heroProps} />;

      case 'paragraph--static_2_column':
        const staticTwoColumnProps = {
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
          cards: component?.field_2_columns_text.map((item) => {
            return {
              link: formatLink(item?.field_link),
              text: item.field_rich_text,
              icon: formatMedia(item?.field_cta_link_icon?.field_media_image),
            };
          }),
        };
        return <StaticTwoColumns {...staticTwoColumnProps} />;

      case 'paragraph--feature':
        const featureProps = {
          headline: component?.field_tagline_text,
          title: component?.field_feature_title,
          text: component?.field_feature_text?.value,
          ctaLink: formatLink(component?.field_feature_cta_button),
          image: formatMedia(component?.field_image?.field_media_image_2),
        };

        return <Feature {...featureProps} />;

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

      default:
        return <p>block {component?.type} was not implemented</p>;
    }
  };

  return (
    <>
      {components &&
        components.length > 0 &&
        components.map((component, index) => (
          <PrintComponent key={index} component={component} />
        ))}
    </>
  );
};

export default React.memo(ComponentsListing);
