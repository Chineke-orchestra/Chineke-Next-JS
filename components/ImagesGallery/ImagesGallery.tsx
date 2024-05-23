import React, { useEffect, useState } from 'react';
import { I_Media } from 'types/index';
import styles from './ImagesGallery.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import { useViewport } from 'utils/viewport';

export interface ImageGalleryProps {
  images: I_Media[];
}

const ImagesGallery = ({ images }: ImageGalleryProps) => {
  const { isMobile } = useViewport();
  const [initialVisible, setInitialVisible] = useState(9);

  useEffect(() => {
    const initialImagesLoaded = isMobile ? 4 : 9;
    setInitialVisible(initialImagesLoaded);
  }, [isMobile]);

  const handleLoadMore = () => {
    setInitialVisible(images.length);
  };

  const visibleImages = images.slice(0, initialVisible);
  const allImagesLoaded = initialVisible >= images.length;

  return (
    <section className={classNames(styles.imagesGalleryContainer, 'container')}>
      <div className={styles.imagesGridContainer}>
        {visibleImages?.map((item, index) => (
          <div key={index} className={styles.imageContainer}>
            <Image src={item.url} alt={item.alt} sizes="100%" fill />
          </div>
        ))}
      </div>

      <div className={styles.loadMoreButton}>
        <button
          className="btn large yellow"
          onClick={handleLoadMore}
          disabled={allImagesLoaded}
        >
          Load More
        </button>
      </div>
    </section>
  );
};

export default ImagesGallery;
