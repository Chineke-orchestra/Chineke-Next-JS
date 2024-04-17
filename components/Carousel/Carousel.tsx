import styles from './Carousel.module.scss';
import { I_Link } from 'types/index';
import parse from 'html-react-parser';
import { LinkComponent } from '..';
import classNames from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Carousel = (props: {
  title: string;
  tagline?: string;
  body: string;
  link: I_Link;
  children?: ReactNode;
}) => {
  const [_, setInit] = useState(false);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);

  const paddingHandler = () => {
    setPaddingLeft(
      (document.getElementsByClassName('container')[0] as any)?.offsetLeft,
    );
  };

  useEffect(() => {
    window.addEventListener('resize', paddingHandler);

    return () => {
      window.removeEventListener('resize', paddingHandler);
    };
  }, []);

  return (
    <section className={styles.carousel} style={{ paddingLeft }}>
      <div className={styles.wrapper}>
        <div className={styles.left_side}>
          <div className={styles.text_wrapper}>
            {props.tagline && <p className={styles.tagline}>{props.tagline}</p>}
            <h2>{props.title}</h2>
            <>{parse(props.body)}</>
            <LinkComponent
              link={props.link}
              className={classNames('btn', styles.button)}
            >
              {props.link.title}
            </LinkComponent>
          </div>
          <div className={styles.swiper_controls}>
            <button ref={prevRef} className={styles.swiper_button} />
            <button ref={nextRef} className={styles.swiper_button} />
          </div>
        </div>
        <div className={styles.right_side}>
          <Swiper
            spaceBetween={32}
            slidesPerView={3}
            modules={[Navigation]}
            className={classNames(styles.swipper)}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={() => setInit(true)}
          >
            {props.children}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
