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
      whileHover={'animate'}
      variants={UseAnimation('right', 0, {
        distance: 0,
        endX: 10,
        duration: 0.5,
        fromOpacity: 1,
      })}
    />
  );
};

export default ArrowButton;
