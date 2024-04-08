import React from 'react';
import Hero from '../Hero/Hero';
import { formatMedia, formatLink } from 'utils/adaptors';

const ComponentsListing = ({ components }) => {
  const PrintComponent = ({ component }) => {
    switch (component?.type) {
      case 'paragraph--hero_banner':
        const heroProps = {
          title: component?.field_title,
          links: component?.field_links.map((item) => formatLink(item)),
          video: formatMedia(component?.field_video?.field_media_video_file),
        };
        console.log(component);
        return <Hero {...heroProps} />;
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
