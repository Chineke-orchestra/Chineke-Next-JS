import React, { useEffect, useRef } from 'react';
import styles from './ColoredCardWithImage.module.scss';
import { Colors, I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import { LinkComponent } from 'components';
import classNames from 'classnames';
import { backgroundClasses } from 'utils/constants';

const ColoredCardWithImage = (props: {
  tag?: string | string[];
  link: I_Link;
  image: I_Media;
  backgroundColor: Colors;
  fullWidthImage?: boolean;
  date?: string;
  index?: number;
  additionalClass?: string;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h5 = titleRef.current;
    if (h5) {
      const words = h5.innerText.split(' ');
      h5.innerHTML = words
        .map((word: string, index: number) => {
          const space = index < words.length - 1 ? ' ' : '';
          return `<span class="${styles.word}">${word}${space}</span>`;
        })
        .join('');
    }
  }, []);

  const renderTags = () => {
    if (typeof props.tag === 'string') {
      return (
        <div className={styles.tagsContainer}>
          <p className="tag light">{props.tag}</p>
        </div>
      );
    } else if (Array.isArray(props.tag)) {
      return (
        <div className={styles.tagsContainer}>
          {props.tag.map((tag, index) => (
            <p key={index} className="tag light">
              {tag}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <LinkComponent link={props.link} className={styles.link}>
      <div
        className={classNames(
          'colored_card',
          styles.card,
          styles[backgroundClasses[props.backgroundColor]],
          {
            [styles.full_width_image]: props.fullWidthImage,
          },
          props.additionalClass ? styles[props.additionalClass] : '',
        )}
        style={{ backgroundColor: props.backgroundColor }}
      >
        {props.image.url && (
          <div className={styles.image}>
            <Image
              src={props.image.url}
              alt={props.image.alt}
              sizes="100%"
              fill
              loading="lazy"
              priority={false}
            />
          </div>
        )}

        <div className={styles.text}>
          {renderTags()}
          <h5 ref={titleRef}>{props.link.title}</h5>
          {props.date && <p className={styles.date}>{props.date}</p>}
        </div>
      </div>
    </LinkComponent>
  );
};

export default ColoredCardWithImage;
