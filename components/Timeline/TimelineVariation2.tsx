import classNames from 'classnames';
import styles from './TimelineVariation2.module.scss';
import TimelineImage from './TimelineImage';
import { TimelineProps } from './TimelineVariation1';
import TimelineItem from './TimelineItem';

const TimelineVariation2 = ({
  headline,
  timelineItems,
  imageOne,
  imageOneText,
}: TimelineProps) => {
  return (
    <section
      className={classNames(styles.timelineVariation2Container, 'container')}
    >
      {headline && (
        <div className={styles.headlineContainerVariation2}>
          <h2>{headline}</h2>
        </div>
      )}

      {imageOne && <TimelineImage image={imageOne} imageText={imageOneText} />}

      <div className={styles.timelineItemsContainerVariation2}>
        {timelineItems.map((item, index) => (
          <TimelineItem
            key={index}
            title={item.title}
            text={item.text}
            additionalClass="titleVariation2"
          />
        ))}
      </div>
    </section>
  );
};

export default TimelineVariation2;
