import React from 'react';
import parse from 'html-react-parser';
import styles from './RteSingleColumn.module.scss';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

interface RteSingleColumnProps {
  text?: string;
}

const RteSingleColumn = ({ text }: RteSingleColumnProps) => {
  const pathname = usePathname();
  const slug = pathname.split('/')[1];
  const jobListClass = slug === 'jobs' ? 'jobListPage' : '';
  const checkJobListClasses = classNames(styles.textContainer, {
      [styles.jobListPage]: jobListClass,
    });

  if (!text) {
    return null;
  }

  return <section className={checkJobListClasses}>{parse(text)}</section>;
};

export default RteSingleColumn;
