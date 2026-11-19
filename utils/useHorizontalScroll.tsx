import { useRef, useEffect, RefObject } from 'react';

export function useHorizontalScroll(): RefObject<HTMLDivElement | null> {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        if (el.scrollLeft + e.deltaY > 0) {
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: 'auto',
          });
        }
      };

      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return elRef;
}
