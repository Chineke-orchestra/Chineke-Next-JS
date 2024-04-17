import styles from './StoriesCarousel.module.scss';
import { I_Link, I_Media } from 'types/index';
import { Carousel, ColoredCardWithImage } from '..';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  return (
    <section className={styles.stories_carousel}>
      <Carousel
        title={props.title}
        body={props.body}
        tagline={props.tagline}
        link={props.link}
      >
        {props.cards?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ColoredCardWithImage {...item} />
            </SwiperSlide>
          );
        })}
      </Carousel>
    </section>
  );
};

export default StoriesCarousel;
