import React from 'react';

const ComponentsListing = ({ components }) => {
  const PrintComponent = ({ component }) => {
    switch (component?.type) {
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
