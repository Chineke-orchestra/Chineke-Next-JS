import classNames from 'classnames';
import styles from './StaticTwoColumns.module.scss';
import React, { useRef, useState } from 'react';
import { I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import TabCard from 'components/TabCard/TabCard';

export interface I_Card {
  link?: I_Link;
  text?: string;
  icon?: I_Media;
}

export interface StaticTwoColumnsProps {
  backgroundColor: '#FFFFFF' | '#1E1E4C';
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
  const [hoverStates, setHoverStates] = useState(
    new Array(cards.length).fill(false),
  );

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const flexDirection = imagePosition === 'right' ? 'rowReverse' : '';
  const colorTheme =
    backgroundColor === '#1E1E4C' ? 'colorInvert' : 'colorNormal';

  const handleHover = (index: number, isHovering: boolean) => {
    setHoverStates((currentHoverStates) =>
      currentHoverStates.map((state, i) => (i === index ? isHovering : state)),
    );
  };
  return (
    <section
      className={classNames(styles.staticTwoColumnsWrapper, styles[colorTheme])}
    >
      <div
        className={classNames(
          styles.staticTwoColumns,
          'container',
          styles[flexDirection],
        )}
      >
        <motion.div
          className={styles.imageContainer}
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? 'animate' : 'initial'}
          variants={UseAnimation('up', {
            delay: 0.5,
            distance: 0,
            duration: 1,

            fromOpacity: 0,
            toOpacity: 1,
            transitionType: 'linear',
          })}
        >
          {image && <Image src={image.url} alt={image.alt} sizes="100%" fill />}
        </motion.div>

        <div className={styles.textContainer}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? 'animate' : 'initial'}
            variants={UseAnimation('up', {
              delay: 0,
              initialY: 150,
              endY: 0,
              duration: 1,
              stiffness: 100,
              fromOpacity: 0,
              toOpacity: 1,
            })}
          >
            {headline && <h6>{headline}</h6>}

            {title && <h2>{title}</h2>}
          </motion.div>

          <div className={styles.cardsContainer}>
            {cards &&
              cards.map((item, index) => (
                <TabCard
                  key={index}
                  link={item.link}
                  text={item.text}
                  icon={item.icon}
                  hoverState={hoverStates[index]}
                  handleHover={handleHover}
                  index={index}
                  isInView={isInView}
                />
              ))}
          </div>

          {ctaLink?.url && (
            <Link href={ctaLink.url} className={classNames('btn large orange')}>
              {ctaLink?.title && ctaLink.title}
              {ctaIcon && (
                <div className={styles.iconContainer}>
                  <Image
                    src={ctaIcon.url}
                    alt={ctaIcon.alt}
                    sizes="100%"
                    fill
                  />
                </div>
              )}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default StaticTwoColumns;
