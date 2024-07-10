import React, { useEffect, useRef } from 'react';
import styles from './ColoredCardWithImage.module.scss';
import { Colors, I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import { LinkComponent } from 'components';
import classNames from 'classnames';
import { backgroundClasses } from 'utils/constants';

const ColoredCardWithImage = (props: {
  tag?: string;
  link: I_Link;
  image: I_Media;
  backgroundColor: Colors;
  fullWidthImage?: boolean;
  date?: string;
  index?: number;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h5 = titleRef.current;
    if (h5) {
      const words = h5.innerText.split(' ');
      h5.innerHTML = words.map((word: string, index: number) => {
        const space = index < words.length - 1 ? ' ' : '';
        return `<span class="${styles.word}">${word}${space}</span>`;
      }).join('');
    }
  }, []);

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
        )}
        style={{ backgroundColor: props.backgroundColor }}
      >
        {props.image.url && (
          <div className={styles.image}>
            <Image src={props.image.url} alt={props.image.alt} fill />
          </div>
        )}

        <div className={styles.text}>
          {props.tag && <p className="tag light">{props.tag}</p>}
          <h5 ref={titleRef}>
            {props.link.title}
          </h5>
          {props.date && <p className={styles.date}>{props.date}</p>}
        </div>
      </div>
    </LinkComponent>
  );
};

export default ColoredCardWithImage;
