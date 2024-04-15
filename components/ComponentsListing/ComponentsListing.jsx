import React from 'react';
import Hero from '../Hero/Hero';
import StaticTwoColumns from '../StaticTwoColumns/StaticTwoColumns';
import Feature from '../Feature/Feature';
import RteSingleColumn from '../RteSingleColumn/RteSingleColumn';
import TwoColumnText from '../TwoColumnText/TwoColumnText';
import ThreeColumnLayout from '../ThreeColumnLayout/ThreeColumnLayout';
import Pattern from '../Pattern/Pattern';
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

      case 'paragraph--2_column_layout':
        const threeColumnLayoutProps = {
          image: {
            url: '/images/feature.png',
            alt: 'image',
          },
          title: 'The Foundation’s flagship ensemble',
          text: 'The Chineke! Orchestra works closely with its sister ensemble, the Chineke! Junior Orchestra, a youth orchestra of Black and ethnically diverse players aged 11-22, with senior players acting as mentors, teachers and role models to the young musicians. With many of our junior musicians already benefiting from several existing youth schemes, junior music colleges and specialist music schools across the UK. The Chineke! Junior Orchestra acts as a bridge between such schemes and higher education, giving its players experience, encouragement and confidence during their formative years, with the hope of increasing the numbers of Black and ethnically diverse candidates currently studying music at third level. This process has already begun, with several of the junior musicians having won national competitions, gained places at top music schools or been admitted to study at elite third level institutions.Chineke! is the brainchild of Chi-chi Nwanoku CBE, who has this to say about the project: ‘My aim is to create a space where Black and ethnically diverse musicians can walk on stage and know that they belong, in every sense of the word. If even one Black and ethnically diverse child feels that their colour is getting in the way of their musical ambitions, then I hope to inspire them, give them a platform, and show them that music, of whatever kind, is for all people. Many cultural organisations such as the BBC, Association of British Orchestras, Royal Philharmonic Society and Arts Council England agree with this sentiment, and have supported Chineke!. After its launch concert at the Queen Elizabeth Hall in September of 2015, the Chineke! Orchestra was appointed as an Associate Orchestra of the Southbank Centre, and has performed there and in other major venues across the UK and Europe.',
        };

        return <ThreeColumnLayout {...threeColumnLayoutProps} />;

      case 'paragraph--pattern':
        const patternProps = {
          patternBackground: component?.field_pattern_background_colour,
          patternImage: formatMedia(
            component?.field_pattern_image?.field_media_image_1,
          ),
          patternColor: component?.field_pattern_image_colour,
        };

        return <Pattern {...patternProps} />;

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
