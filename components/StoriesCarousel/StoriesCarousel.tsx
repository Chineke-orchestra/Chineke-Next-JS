import styles from './StoriesCarousel.module.scss';
import { I_Link, I_Media } from 'types/index';
import { Carousel, ColoredCardWithImage } from '..';
import { SwiperSlide } from 'swiper/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import UseAnimation from 'utils/UseAnimation';

const StoriesCarousel = (props: {
  title: string;
  tagline?: string;
  body: string;
  link: I_Link;
  cards: {
    backgroundColor: string;
    link: I_Link;
    image: I_Media;
    tag: string;
  }[];
}) => {
  const animationRef = useRef<any>();

  const isInView = useInView(animationRef, {
    margin: '0px 0px  -40% 0px',
    once: true,
  });
  return (
    <section className={styles.stories_carousel} ref={animationRef}>
      <Carousel
        title={props.title}
        body={props.body}
        tagline={props.tagline}
        link={props.link}
      >
        {props.cards?.map((item: any, index: any) => {
          return (
            <SwiperSlide key={index}>
              <motion.div
                animate={isInView && 'animate'}
                initial={'initial'}
                variants={UseAnimation('right', {
                  startX: 300,
                  endX: 0,
                  duration: 1,
                  fromOpacity: 0,
                  damping: 56,
                  delay: 1 + index * 0.3,
                })}
              >
                <ColoredCardWithImage {...item} />
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Carousel>
    </section>
  );
};

export default StoriesCarousel;
