import React from 'react';
import parse from 'html-react-parser';
import styles from './RteSingleColumn.module.scss';

interface RteSingleColumnProps {
  text: string;
}

const RteSingleColumn = ({ text }: RteSingleColumnProps) => {
  return <section className={styles.textContainer}>{parse(text)}</section>;
};

export default RteSingleColumn;
