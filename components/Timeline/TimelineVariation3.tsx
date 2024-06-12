import React from 'react';
import classNames from 'classnames';
import styles from './TimelineVariation3.module.scss';
import { TimelineProps } from './TimelineVariation1';
import TimelineImage from './TimelineImage';
import TimelineItem from './TimelineItem';

const TimelineVariation3 = ({
  headline,
  timelineItems,
  imageOne,
  imageOneText,
  imageTwo,
  imageTwoText,
  imageThree,
  imageThreeText,
}: TimelineProps) => {
  return (
    <section className={classNames(styles.timelineContainer, 'container')}>
      {headline && (
        <div className={styles.headlineContainer}>
          <h1>{headline}</h1>
        </div>
      )}

      {imageOne && (
        <TimelineImage
          image={imageOne}
          imageText={imageOneText}
          additionalClass="imageOne"
        >
          <div className={styles.timelineItemsContainerVariation3}>
            <TimelineItem
              title={timelineItems[0].title}
              text={timelineItems[0].text}
            />
          </div>
        </TimelineImage>
      )}

      {imageTwo && (
        <TimelineImage
          image={imageTwo}
          imageText={imageTwoText}
          additionalClass="imageTwo"
        >
          <div className={styles.timelineItemsContainerVariation3}>
            <TimelineItem
              title={timelineItems[1].title}
              text={timelineItems[1].text}
            />
          </div>
        </TimelineImage>
      )}

      {imageThree && (
        <TimelineImage
          image={imageThree}
          imageText={imageThreeText}
          additionalClass="imageThree"
        >
          <div className={styles.timelineItemsContainerVariation3}>
            <TimelineItem
              title={timelineItems[2]?.title}
              text={timelineItems[2]?.text}
            />
          </div>
        </TimelineImage>
      )}
    </section>
  );
};

export default TimelineVariation3;
