import React from 'react';
import Hero from '../Hero/Hero';
import Accordion from '../Accordion/Accordion';
import { formatMedia, formatLink } from 'utils/adaptors';

const ComponentsListing = ({ components }) => {
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
      case 'paragraph--accordion':
        const accordionItems = component?.field_accordion_item?.map((item) => {
          return {
            title: item?.field_accordion_title,
            text: item?.field_accordion_body?.value,
          };
        });
        return (
          <Accordion title={component?.field_title} items={accordionItems} />
        );

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
