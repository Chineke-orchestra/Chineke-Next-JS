import classNames from 'classnames';
import styles from './StaticTwoColumns.module.scss';
import React from 'react';
import { I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import Link from 'next/link';

export interface I_Card {
  link?: I_Link;
  text?: string;
  icon?: I_Media;
}

export interface StaticTwoColumnsProps {
  backgroundColor: '#FFFFFF' | '#1e1e4c';
  imagePosition: 'left' | 'right';
  title: string;
  headline?: string;
  ctaLink?: I_Link;
  ctaIcon?: I_Media;
  image: I_Media;
  cards: I_Card[];
}

const StaticTwoColumns = ({
  backgroundColor = '#FFFFFF',
  imagePosition = 'left',
  title,
  headline,
  ctaLink,
  ctaIcon,
  image,
  cards,
}: StaticTwoColumnsProps) => {
  console.log(ctaLink);

  const flexDirection = imagePosition === 'right' ? 'row-reverse' : 'row';

  return (
    <section
      className={classNames(
        styles.staticTwoColumns,
        'container',
        styles[flexDirection],
      )}
    >
      <div className={styles.imageContainer}>
        {/* {image && <Image src={image.url} alt={image.alt} fill />} */}
      </div>

      <div className={styles.textContainer}>
        {headline && <h6>{headline}</h6>}

        {title && <h2>{title}</h2>}

        <div className={styles.cardsContainer}>
          {cards &&
            cards.map((item, index) => (
              <div className={styles.card} key={index}>
                {item?.link?.url ? (
                  <Link href={item.link.url}>
                    {item.link.title && <h4>{item.link.title}</h4>}

                    {item.text && <p>{item.text}</p>}

                    {/* {item.icon && (
                      <Image src={item.icon.url} alt={item.icon.alt} fill />
                    )} */}
                  </Link>
                ) : (
                  <p>{item.text}</p>
                )}
              </div>
            ))}
        </div>

        {ctaLink && (
          <Link href={ctaLink.url} className={classNames('btn large orange')}>
            {ctaLink.title}
          </Link>
        )}
      </div>
    </section>
  );
};

export default StaticTwoColumns;
