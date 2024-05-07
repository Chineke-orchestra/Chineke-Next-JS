import { motion } from 'framer-motion';
import styles from './ArrowButton.module.scss';
import UseAnimation from 'utils/UseAnimation';
import classNames from 'classnames';

interface ArrowProps {
  isHovering?: boolean;
  className?: string;
}

const ArrowButton = ({ isHovering, className }: ArrowProps) => {
  return (
    <motion.div
      className={classNames(styles.arrow, className)}
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
