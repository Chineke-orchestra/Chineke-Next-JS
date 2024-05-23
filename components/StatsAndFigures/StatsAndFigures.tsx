import styles from './StatsAndFigures.module.scss';
import classNames from 'classnames';
import { I_Media } from 'types/index';
import Image from 'next/image';
import { FC } from 'react';

export interface StatsAndFiguresProps {
  title?: string;
  image: I_Media;
  stats: {
    title: string;
    text: string;
  }[];
}

const StatsAndFigures: FC<StatsAndFiguresProps> = ({ title, image, stats }) => {
  return (
    <section className={classNames(styles.stats_and_figures)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <Image src={image.url} alt={image.alt} fill />
          </div>
          <div className={styles.stats_wrapper}>
            <h3>{title}</h3>
            <div className={styles.stats}>
              {stats?.map((item, index) => {
                return (
                  <div className={styles.stat_item} key={index}>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.text}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsAndFigures;
