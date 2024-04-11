import React from 'react';
import { I_Link, I_Media } from 'types/index';
import styles from './Feature.module.scss';
import classNames from 'classnames';
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';

export interface FeatureProps {
  headline: string;
  title: string;
  description: string;
  cta: I_Link;
  image: I_Media;
}

const Feature = ({
  headline,
  title,
  description,
  cta,
  image,
}: FeatureProps) => {
  return (
    <section className={classNames(styles.featureWrapper, 'container')}>
      <div className={styles.featureContainer}>
        <div className={styles.textContainer}>
          {headline && <h6>{headline}</h6>}
          {title && <h1>{title}</h1>}
          {description && <p>{parse(description)}</p>}
          {cta && (
            <Link href={cta.url} className={classNames('btn large orange')}>
              {cta.title}
            </Link>
          )}
        </div>
        <div className={styles.imageContainer}>
          {image && <Image src={image.url} alt={image.alt} sizes="100%" fill />}
        </div>
      </div>
    </section>
  );
};

export default Feature;
