import React from 'react';
import classNames from 'classnames';
import { I_Media } from 'types/index';
import styles from './TimelineVariation1.module.scss';
import TimelineImage from './TimelineImage';
import TimelineItem from './TimelineItem';

export interface TimelineItemProps {
  title: string;
  text: string;
}

export interface TimelineProps {
  headline: string;
  timelineItems: TimelineItemProps[];
  imageOne: I_Media;
  imageOneText: string;
  imageTwo?: I_Media;
  imageTwoText?: string;
  imageThree?: I_Media;
  imageThreeText?: string;
}

const TimelineVariation1 = ({
  headline,
  timelineItems,
  imageOne,
  imageOneText,
  imageTwo,
  imageTwoText,
}: TimelineProps) => {
  return (
    <section className={classNames(styles.timelineContainer, 'container')}>
      {headline && (
        <div className={styles.headlineContainer}>
          <h2>{headline}</h2>
        </div>
      )}

      {imageOne && (
        <TimelineImage
          image={imageOne}
          imageText={imageOneText}
          additionalClass="imageOneVariation1"
        />
      )}

      <div className={styles.timelineItemsContainer}>
        {timelineItems.map((item, index) => (
          <TimelineItem key={index} title={item.title} text={item.text} />
        ))}
      </div>

      {imageTwo && (
        <div className={styles.imageContainer}>
          <div className={styles.imageTwo}>
            <TimelineImage
              image={imageTwo}
              imageText={imageTwoText}
              additionalClass="imageTwoVariation1"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TimelineVariation1;
