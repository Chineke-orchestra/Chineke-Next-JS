import { useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { wrap } from '@motionone/utils';

export function useAutoScrolling() {
  const baseVelocity = 100;
  const baseX = useMotionValue(0);

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 180000);

    moveBy += directionFactor.current * moveBy;

    baseX.set(baseX.get() + moveBy * -1);
  });

  return x;
}
