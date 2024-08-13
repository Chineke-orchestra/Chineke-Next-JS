import styles from './EventsCarousel.module.scss';
import { Colors, I_Link, I_Media } from 'types/index';
import { Carousel, ColoredCardWithImage } from 'components';
import { SwiperSlide } from 'swiper/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import UseAnimation from 'utils/UseAnimation';
import moment from 'moment-timezone';

const EventsCarousel = (props: {
  title: string;
  tagline?: string;
  body: string;
  link: I_Link;
  cards: {
    backgroundColor: Colors;
    link: I_Link;
    image: I_Media;
    tag: string;
    date: string;
  }[];
}) => {
  const animationRef = useRef<any>();

  const isInView = useInView(animationRef, {
    margin: '0px 0px  -10% 0px',
    once: true,
  });
  return (
    <section className={styles.events_carousel} ref={animationRef}>
      <Carousel {...props}>
        {props.cards?.map((item, index) => {
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
                <ColoredCardWithImage
                  {...item}
                  index={index}
                  fullWidthImage
                  date={moment(item?.date)
                    .tz(moment.tz.guess())
                    .format('D MMM YYYY - h:mm A')}
                />
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Carousel>
    </section>
  );
};

export default EventsCarousel;
