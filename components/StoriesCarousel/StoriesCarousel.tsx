import styles from './StoriesCarousel.module.scss';
import { I_Link } from 'types/index';
import parse from 'html-react-parser';
import { LinkComponent } from '..';

const StoriesCarousel = (props: {
  title: string;
  tagline?: string;
  body: string;
  link: I_Link;
}) => {
  return (
    <section>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.left_side}>
            {props.tagline && <p>{props.tagline}</p>}
            <h2>{props.title}</h2>
            <>{parse(props.body)}</>
            <LinkComponent link={props.link}>{props.link.title}</LinkComponent>
          </div>
          <div className={styles.right_side}></div>
        </div>
      </div>
    </section>
  );
};

export default StoriesCarousel;
