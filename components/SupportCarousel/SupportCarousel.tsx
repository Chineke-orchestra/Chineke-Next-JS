import styles from './SupportCarousel.module.scss';
import { I_Link } from 'types/index';
import { Carousel, LinkComponent } from '..';
import { SwiperSlide } from 'swiper/react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import UseAnimation from 'utils/UseAnimation';
import ArrowButton from 'components/ArrowButton/ArrowButton';
import parse from 'html-react-parser';

const SupportCarousel = (props: {
  title: string;
  tagline?: string;
  body?: string;
  link?: I_Link;
  cards: {
    title: string;
    text: string;
    link: I_Link;
  }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const animationRef = useRef<any>(undefined);

  const isInView = useInView(animationRef, {
    margin: '0px 0px  -40% 0px',
    once: true,
  });
  return (
    <section className={styles.support_carousel} ref={animationRef}>
      <Carousel
        title={props.title}
        body={props.body ? `<p>${props.body}</p>` : undefined}
        tagline={props.tagline}
        link={props.link}
        buttonClass="orange"
        withoutBodyVariation={!props.body}
        buttonsBottom
      >
        {props.cards?.map((item, index: any) => {
          return (
            <SwiperSlide
              key={index}
              onMouseOver={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              <LinkComponent link={item.link}>
                <motion.div
                  className={styles.support_card}
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
                  <h4>
                    {item.title}
                    <motion.span
                      className="underline"
                      initial={{ scaleX: 0 }}
                      animate={index === activeIndex ? 'animate' : 'initial'}
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
                  </h4>
                  <p>{parse(item.text)}</p>
                  <ArrowButton
                    className={styles.arrow}
                    isHovering={index === activeIndex}
                  />
                </motion.div>
              </LinkComponent>
            </SwiperSlide>
          );
        })}
      </Carousel>
    </section>
  );
};

export default SupportCarousel;
