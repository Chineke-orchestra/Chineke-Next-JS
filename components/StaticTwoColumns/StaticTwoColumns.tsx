import classNames from 'classnames';
import styles from './StaticTwoColumns.module.scss';
import React, { useRef, useState } from 'react';
import { I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import parse from 'html-react-parser';

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
                <motion.div
                  className={styles.card}
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? 'animate' : 'initial'}
                  variants={UseAnimation('up', {
                    delay: index * 0.6,
                    initialY: index * 150,
                    endY: 0,
                    duration: 1,
                    stiffness: 70,
                    fromOpacity: 0,
                    toOpacity: 1,
                  })}
                >
                  {item?.link?.url ? (
                    <Link
                      href={item.link.url}
                      onMouseEnter={() => handleHover(index, true)}
                      onMouseLeave={() => handleHover(index, false)}
                    >
                      {item.link.title && (
                        <h4>
                          {item.link.title}
                          <motion.span
                            className={styles.underline}
                            initial={{ scaleX: 0 }}
                            animate={hoverStates[index] ? 'animate' : 'initial'}
                            variants={UseAnimation('right', {
                              duration: 0.5,
                              distance: 0,
                              startScaleX: 0,
                              endScaleX: 1,
                            })}
                            style={{
                              originX: 0,
                            }}
                          />
                        </h4>
                      )}

                      {item.text && <p>{parse(item.text)}</p>}

                      {item.icon && (
                        <motion.div
                          className={styles.iconContainer}
                          animate={hoverStates[index] ? 'animate' : 'initial'}
                          variants={UseAnimation('right', {
                            distance: 0,
                            startX: 0,
                            endX: 10,
                            duration: 0.5,
                            fromOpacity: 1,
                          })}
                        >
                          <Image
                            src={item.icon.url}
                            alt={item.icon.alt}
                            sizes="100%"
                            fill
                          />
                        </motion.div>
                      )}
                    </Link>
                  ) : (
                    <p>{item.text}</p>
                  )}
                </motion.div>
              ))}
          </div>

          {ctaLink && (
            <Link href={ctaLink.url} className={classNames('btn large orange')}>
              {ctaLink.title}
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
