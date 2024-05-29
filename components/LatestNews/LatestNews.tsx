import { I_Link, I_Media } from 'types/index';
import styles from './LatestNews.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { layers, mobileLayers } from './layers';
import AnimatedCard from './AnimatedCard';
import { useInView, motion } from 'framer-motion';
import { LinkComponent } from '..';
import { useViewport } from 'utils/viewport';
import UseAnimation from 'utils/UseAnimation';

const LatestNews = (props: {
  news: {
    image: I_Media;
    link: I_Link;
    tags: string[];
  }[];
}) => {
  const { isMobile } = useViewport();
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: '0px 0px -80% 0px',
    once: false,
  });
  const [animate, setAnimate] = useState(-1);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const element = ref.current;
      const bounding = element?.getBoundingClientRect();

      if (!isInView || (bounding && bounding?.top < 0)) {
        return false;
      }
      if (
        (scrollRef?.current &&
          scrollRef?.current?.scrollLeft ===
            scrollRef?.current?.scrollWidth - scrollRef?.current?.offsetWidth &&
          event.deltaY > 0) ||
        (scrollRef?.current?.scrollLeft === 0 && event.deltaY < 0)
      ) {
        return;
      }

      if (ref?.current && scrollRef?.current) {
        event.preventDefault();
        scrollRef?.current.scrollTo({
          left: scrollRef?.current?.scrollLeft + event.deltaY,
        });
        return false;
      }
    };

    if (isInView) {
      window.addEventListener('wheel', handleScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', handleScroll);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [ref, scrollRef, isInView]);

  return (
    <motion.section className={styles.latest_news} ref={ref}>
      <div className={styles.container} ref={scrollRef}>
        <div className={styles.articles}>
          {props.news.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  gridArea: `news-${index + 1}`,
                }}
                onMouseOver={() => setAnimate(index)}
                onFocus={() => setAnimate(index)}
                onMouseLeave={() => setAnimate(-1)}
              >
                <LinkComponent link={item.link}>
                  <div
                    style={{
                      background: `url(${item.image.url})`,
                      gridArea: `news-${index + 1}`,
                    }}
                    className={classNames(styles.article, styles.news)}
                  >
                    {item.tags &&
                      item.tags.map((item, index) => {
                        return (
                          <p key={index} className="tag light">
                            {item}
                          </p>
                        );
                      })}
                    <h6>
                      {item.link.title}

                      <motion.span
                        className="underline"
                        initial={{ scaleX: 0 }}
                        animate={animate === index ? 'animate' : 'initial'}
                        variants={UseAnimation('right', {
                          duration: 0.5,
                          distance: 0,
                          startScaleX: 0,
                          endScaleX: 1,
                        })}
                        style={{
                          originX: 0,
                        }}
                      />
                    </h6>
                  </div>
                </LinkComponent>
              </div>
            );
          })}
          {(isMobile ? mobileLayers : layers).map((item: any, index) => {
            return !item.animated ? (
              <div
                key={index}
                style={{
                  background: `url(${item.url})`,
                  gridArea: `animation-${index + 1}`,
                }}
                className={classNames(styles.article)}
              />
            ) : (
              <AnimatedCard item={{ ...item, index }} key={index} />
            );
          })}
        </div>
      </div>
      <div className={styles.text_section}>
        <h2>Latest News</h2>
        <p>Keep scrolling</p>
      </div>
    </motion.section>
  );
};

export default LatestNews;
