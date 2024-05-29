import styles from './LatestNews.module.scss';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useAutoScrolling } from 'utils/useAutoScrolling';

export interface I_Animated_Card {
  url: string;
  alt: string;
  animated: boolean;
  variation?: 'top' | 'bottom';
  index: number;
}

const AnimatedCard = ({ item }: { item: I_Animated_Card }) => {
  const x = useAutoScrolling();

  return (
    <motion.div
      className={classNames(styles.article, styles.animated, {
        [styles[item?.variation || '']]: item?.variation,
      })}
      style={{
        gridArea: `animation-${item.index + 1}`,
      }}
    >
      <motion.div className={styles.container} style={{ x }}>
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
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCard;
