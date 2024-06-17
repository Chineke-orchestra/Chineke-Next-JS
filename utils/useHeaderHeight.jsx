import { useEffect, useState } from 'react';

export const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const headerElement = document.getElementById('headerContainer');
    if (headerElement) {
      const updateHeaderHeight = () => {
        setHeaderHeight(headerElement.offsetHeight);
      };

      const updateHeightWithDelay = () => {
        setTimeout(updateHeaderHeight, 5);
      };

      updateHeightWithDelay();

      window.addEventListener('resize', updateHeightWithDelay);

      return () => {
        window.removeEventListener('resize', updateHeightWithDelay);
      };
    }
  }, []);

  return headerHeight;
};
