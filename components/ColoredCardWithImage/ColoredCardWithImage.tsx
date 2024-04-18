import { motion } from 'framer-motion';
import styles from './ColoredCardWithImage.module.scss';
import { I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import { LinkComponent } from 'components';
import UseAnimation from 'utils/UseAnimation';
import { useState } from 'react';

const ColoredCardWithImage = (props: {
  tag?: string;
  link: I_Link;
  image: I_Media;
  backgroundColor: string;
}) => {
  const [animate, setAnimate] = useState(false);
  return (
    <LinkComponent link={props.link}>
      <div
        className={styles.card}
        style={{ backgroundColor: props.backgroundColor }}
      >
        <div className={styles.image}>
          <Image
            src={props.image.url}
            alt={props.image.alt}
            fill
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div className={styles.text}>
          {/* TODO -> CHECK THE LAYOUT WHEN THE BRANCH WITH TAGS IS MERGED */}
          {props.tag && <p className="tag">{props.tag}</p>}
          <h5
            onMouseOver={() => setAnimate(true)}
            onMouseLeave={() => setAnimate(false)}
          >
            {props.link.title}
            <motion.span
              className="underline"
              initial={{ scaleX: 0 }}
              animate={animate ? 'animate' : 'initial'}
              variants={UseAnimation('right', 0, {
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
        </div>
      </div>
    </LinkComponent>
  );
};

export default ColoredCardWithImage;
