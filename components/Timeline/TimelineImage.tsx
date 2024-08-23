import React from 'react';
import classNames from 'classnames';
import { I_Media } from 'types/index';
import styles from './TimelineImage.module.scss';
import Image from 'next/image';

export interface TimelineImageProps {
  image: I_Media;
  imageText?: string;
  additionalClass?: string;
  children?: React.ReactNode;
}

const TimelineImage: React.FC<TimelineImageProps> = ({
  image,
  imageText,
  additionalClass,
  children,
}) => {
  return (
    <div
      className={classNames(
        styles.imageBox,
        additionalClass ? styles[additionalClass] : '',
      )}
    >
      <div className={styles.imageContainer}>
        {image.url && (
          <Image src={image.url} alt={image.alt} sizes="100%" fill  loading="lazy"
          priority={false}/>
        )}
        {imageText && <p>{imageText}</p>}
      </div>
      {children}
    </div>
  );
};

export default TimelineImage;
