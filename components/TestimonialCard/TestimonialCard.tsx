import styles from './TestimonialCard.module.scss';
import moment from 'moment';

export interface I_Testimonial {
  author?: string;
  text: string;
  date: string;
}

const TestimonialCard = (props: I_Testimonial) => {
  return (
    <div className={styles.testimonial_card}>
      <p className={styles.date}>
        {props.date && moment(props.date).format('DD MMMM YYYY')}
      </p>
      <div className={styles.wrapper}>
        <p className={styles.text}>{props.text}</p>
        {props.author && <p className={styles.author}>{props.author}</p>}
      </div>
    </div>
  );
};

export default TestimonialCard;
