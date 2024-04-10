const UseAnimation = (direction = 'up', delay = 0.2, options = {}) => {
  const {
    distance = 50,
    duration = 0.3,
    transitionType = 'spring',
    stiffness = 170,
    damping = 26,
    mass = 1,
    fromOpacity = 1,
    toOpacity = 1,
    startX = 0,
    startY = 0,
    endX = 0,
    endY = 0,
    startScaleX = 1,
    endScaleX = 1,
    startScaleY = 1,
    endScaleY = 1,
  } = options;

  let initialX = startX;
  let initialY = startY;
  let finalX = endX;
  let finalY = endY;

  if (startX === 0 && startY === 0) {
    switch (direction) {
      case 'up':
        initialY = distance;
        break;
      case 'down':
        initialY = -distance;
        break;
      case 'left':
        initialX = -distance;
        break;
      case 'right':
        initialX = distance;
        break;
      default:
        break;
    }
  }

  let transition =
    transitionType === 'spring'
      ? {
          type: 'spring',
          stiffness,
          damping,
          mass,
          delay,
        }
      : {
          duration,
          delay,
        };

  return {
    initial: {
      x: initialX,
      y: initialY,
      opacity: fromOpacity,
      scaleX: startScaleX,
      scaleY: startScaleY,
      transition,
    },
    animate: {
      x: finalX,
      y: finalY,
      opacity: toOpacity,
      scaleX: endScaleX,
      scaleY: endScaleY,
      transition,
    },
  };
};

export default UseAnimation;
