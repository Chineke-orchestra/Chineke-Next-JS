import styles from './LatestNews.module.scss';
import classNames from 'classnames';

export interface I_Animated_Card {
  url: string;
  alt: string;
  animated: boolean;
  variation?: 'top' | 'bottom';
  index: number;
}

const AnimatedCard = ({ item }: { item: I_Animated_Card }) => {
  return (
    <div
      className={classNames(styles.article, styles.animated, {
        [styles[item?.variation || '']]: item?.variation,
      })}
      style={{
        gridArea: `animation-${item.index + 1}`,
      }}
    >
      <div className={styles.container}>
        <div
          style={{
            background: `url(${item.url})`,
          }}
        />
        <div
          style={{
            background: `url(${item.url})`,
          }}
        />
        <div
          style={{
            background: `url(${item.url})`,
          }}
        />
        <div
          style={{
            background: `url(${item.url})`,
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedCard;
