import React from 'react';
import styles from './TimelineItem.module.scss';
import classNames from 'classnames';

export interface TimelineItemProps {
  title: string;
  text: string;
  additionalClass?: string;
}

const TimelineItem = ({ title, text, additionalClass }: TimelineItemProps) => {
  return (
    <div
      className={classNames(
        styles.itemContainer,
        additionalClass ? styles[additionalClass] : '',
      )}
    >
      {title && <h4>{title}</h4>}
      {text && <p>{text}</p>}
    </div>
  );
};

export default TimelineItem;
