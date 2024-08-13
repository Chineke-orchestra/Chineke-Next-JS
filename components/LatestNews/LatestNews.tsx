import { I_Link, I_Media } from 'types/index';
import styles from './LatestNews.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { layers, mobileLayers } from './layers';
import AnimatedCard from './AnimatedCard';
import { motion, useTransform, useScroll, useInView } from 'framer-motion';
import { LinkComponent } from '..';
import { useViewport } from 'utils/viewport';
import UseAnimation from 'utils/UseAnimation';
import Image from 'next/image';

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

  const [animate, setAnimate] = useState(-1);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const isInView = useInView(scrollRef, {
    margin: '0px 0px  -10% 0px',
    once: true,
  });

  const [percent, setPercent] = useState(10);

  useEffect(() => {
    if (scrollRef?.current) {
      setPercent(
        scrollRef?.current?.scrollWidth - scrollRef?.current?.clientWidth,
      );
    }
  }, [scrollRef]);

  useEffect(() => {
    const resizeHandler = () => {
      if (scrollRef?.current) {
        setPercent(
          scrollRef?.current?.scrollWidth - scrollRef?.current?.clientWidth,
        );
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${percent}px`]);

  return (
    <motion.section
      className={styles.latest_news}
      ref={ref}
      style={{ height: percent < 594 ? `594px` : `${percent * 2}px` }}
    >
      <div className={styles.wrapper}>
        <motion.div
          className={styles.container}
          ref={scrollRef}
          style={{ x }}
          animate={isInView && 'animate'}
          initial={'initial'}
          variants={UseAnimation('up', {
            startY: 0,
            endY: 1,
            duration: 1,
            fromOpacity: 0,
          })}
        >
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
                        gridArea: `news-${index + 1}`,
                      }}
                      className={classNames(styles.article, styles.news)}
                    >
                      <motion.div
                        className={styles.image}
                        animate={{ scale: animate === index ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item?.image?.url && (
                          <Image
                            src={item.image.url}
                            alt={item.link.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        )}
                      </motion.div>
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
                        <span className={styles.underline}></span>
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
                  className={classNames(styles.article, {
                    [styles.contained_image]: index % 2 !== 0,
                  })}
                />
              ) : (
                <AnimatedCard item={{ ...item, index }} key={index} />
              );
            })}
          </div>
        </motion.div>
        <div className={styles.text_section}>
          <h2>Latest News</h2>
          <p>Keep scrolling</p>
        </div>
      </div>
    </motion.section>
  );
};

export default LatestNews;
