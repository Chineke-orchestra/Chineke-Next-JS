import { motion } from 'framer-motion';
import styles from './ColoredCardWithImage.module.scss';
import { Colors, I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import { LinkComponent } from 'components';
import UseAnimation from 'utils/UseAnimation';
import { useState } from 'react';
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
  const [animate, setAnimate] = useState(false);
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
        onMouseOver={() => setAnimate(true)}
        onFocus={() => setAnimate(true)}
        onMouseLeave={() => setAnimate(false)}
      >
        <div className={styles.image}>
          <Image src={props.image.url} alt={props.image.alt} fill />
        </div>
        <div className={styles.text}>
          {props.tag && <p className="tag light">{props.tag}</p>}
          <h5>
            {props.link.title}
            <motion.span
              className="underline"
              initial={{ scaleX: 0 }}
              animate={animate ? 'animate' : 'initial'}
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
          </h5>
          {props.date && <p className={styles.date}>{props.date}</p>}
        </div>
      </div>
    </LinkComponent>
  );
};

export default ColoredCardWithImage;
