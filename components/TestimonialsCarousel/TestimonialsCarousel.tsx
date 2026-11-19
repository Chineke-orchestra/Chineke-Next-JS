import styles from './TestimonialsCarousel.module.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Navigation, Pagination } from 'swiper/modules';
import { useInView } from 'framer-motion';
import Pattern, { PatternProps } from 'components/Pattern/Pattern';

export interface I_Testimonial {
  author?: string;
  text: string;
}

const TestimonialsCarousel = (props: {
  testimonials: I_Testimonial[];
  pattern: PatternProps;
}) => {
  const sectionRef = useRef<any>(undefined);
  const isInView = useInView(sectionRef, { once: false });
  const [swiper, setSwiper] = useState<SwiperClass>();

  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);
  const nagigationRef = useRef<any>(null);

  const handleKeyDown = (event: any) => {
    if (isInView) {
      if (event.key === 'ArrowRight' || event.key === 'Tab') {
        swiper?.slideNext();
      }
      if (event.key === 'ArrowLeft') {
        swiper?.slidePrev();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper, isInView]);

  return (
    <section className={styles.testimonials_carousel} ref={sectionRef}>
      <div className="container">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          className={classNames(styles.swiper)}
          onSwiper={(swiper) => setSwiper(swiper)}
          onInit={(swiper) => setSwiper(swiper)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: nagigationRef.current,
            type: 'bullets',
            clickable: true,
          }}
          keyboard={true}
          speed={1000}
        >
          {props.testimonials?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={styles.testimonial_card}>
                  <blockquote className={styles.text}>{item.text}</blockquote>
                  <p className={styles.author}>{item.author}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={styles.swiper_controls}>
          <button ref={prevRef} className={styles.swiper_button} />
          <div ref={nagigationRef} />
          <button ref={nextRef} className={styles.swiper_button} />
        </div>
      </div>
      <div className={styles.pattern}>
        <Pattern {...props.pattern} />
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
