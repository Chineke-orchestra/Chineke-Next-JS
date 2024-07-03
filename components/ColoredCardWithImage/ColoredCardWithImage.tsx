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
          <h5>
            {props.link.title}
            <span className={styles.underline}></span>
          </h5>
          {props.date && <p className={styles.date}>{props.date}</p>}
        </div>
      </div>
    </LinkComponent>
  );
};

export default ColoredCardWithImage;
