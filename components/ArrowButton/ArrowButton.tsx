import { motion } from 'framer-motion';
import styles from './ArrowButton.module.scss';
import UseAnimation from 'utils/UseAnimation';

interface ArrowProps {
  isHovering?: boolean;
}

const ArrowButton = ({ isHovering }: ArrowProps) => {
  return (
    <motion.div
      className={styles.arrow}
      animate={isHovering ? 'animate' : 'initial'}
      variants={UseAnimation('right', {
        distance: 0,
        duration: 0.5,
        fromOpacity: 1,
        startX: 0,
        endX: 10,
      })}
    />
  );
};

export default ArrowButton;
