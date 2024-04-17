import { motion } from 'framer-motion';
import styles from './ColoredCardWithImage.module.scss';
import { I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import { LinkComponent } from '..';

const ColoredCardWithImage = (props: {
  tag?: string;
  link: I_Link;
  image: I_Media;
  backgroundColor: string;
}) => {
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
          {props.tag && <p className="tag">{props.tag}</p>}
          <h5>{props.link.title}</h5>
        </div>
      </div>
    </LinkComponent>
  );
};

export default ColoredCardWithImage;
