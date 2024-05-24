import React from 'react';
import styles from './TimelineItem.module.scss';

export interface TimelineItemProps {
  title: string;
  text: string;
}

const TimelineItem = ({ title, text }: TimelineItemProps) => {
  return (
    <div className={styles.itemContainer}>
      {title && <h4>{title}</h4>}
      {text && <p>{text}</p>}
    </div>
  );
};

export default TimelineItem;
