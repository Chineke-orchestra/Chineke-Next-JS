import styles from './Carousel.module.scss';
import { I_Link } from 'types/index';
import parse from 'html-react-parser';
import { LinkComponent } from 'components';
import classNames from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss/pagination';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import { delay, motion, useInView } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';

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
  const ref = useRef<any>();
  const animationRef = useRef<any>();
  const [width, setWidth] = useState(ref?.current?.offsetLeft);

  const isInView = useInView(animationRef, {
    margin: '0px 0px  -40% 0px',
    once: true,
  });

  const paddingHandler = () => {
    setPaddingLeft(
      (document.getElementsByClassName('container')[0] as any)?.offsetLeft,
    );
  };

  useEffect(() => {
    setWidth(ref?.current?.offsetLeft);
  }, [paddingLeft]);

  useEffect(() => {
    paddingHandler();
    window.addEventListener('resize', paddingHandler);

    return () => {
      window.removeEventListener('resize', paddingHandler);
    };
  }, [ref]);

  return (
    <section
      className={styles.carousel}
      style={{ paddingLeft }}
      ref={animationRef}
    >
      <div className={styles.wrapper}>
        <div className={styles.left_side}>
          <div className={styles.text_wrapper}>
            {props.tagline && (
              <motion.p
                animate={isInView && 'animate'}
                initial={'initial'}
                variants={UseAnimation('up', {
                  startScaleY: 0,
                  endScaleY: 1,
                  duration: 1,
                  fromOpacity: 1,
                })}
                className={styles.tagline}
              >
                {props.tagline}
              </motion.p>
            )}
            <motion.h2
              animate={isInView && 'animate'}
              initial={'initial'}
              variants={UseAnimation('up', {
                startScaleY: 0,
                endScaleY: 1,
                duration: 1,
                fromOpacity: 1,
                delay: 0.2,
              })}
            >
              {props.title}
            </motion.h2>
            <motion.div
              animate={isInView && 'animate'}
              initial={'initial'}
              variants={UseAnimation('up', {
                startScaleY: 0,
                endScaleY: 1,
                duration: 1,
                fromOpacity: 1,
                delay: 0.5,
              })}
            >
              {parse(props.body)}
            </motion.div>
            <motion.div
              animate={isInView && 'animate'}
              initial={'initial'}
              variants={UseAnimation('up', {
                startScaleY: 0,
                endScaleY: 1,
                duration: 1,
                fromOpacity: 1,
                delay: 0.5,
              })}
              className={styles.buttons_container}
              style={{ transformOrigin: 'bottom' }}
            >
              <LinkComponent
                link={props.link}
                className={classNames('btn large yellow', styles.button)}
              >
                {props.link.title}
              </LinkComponent>
              <div className={styles.swiper_controls}>
                <button ref={prevRef} className={styles.swiper_button} />
                <button ref={nextRef} className={styles.swiper_button} />
              </div>
            </motion.div>
          </div>
        </div>
        <div
          className={styles.right_side}
          ref={ref}
          style={{ width: `calc(100vw - ${width}px)` }}
        >
          <Swiper
            grabCursor={false}
            centeredSlides={false}
            spaceBetween={20}
            initialSlide={1}
            slidesPerView="auto"
            modules={[Navigation]}
            className={classNames(styles.swiper)}
            speed={1000}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              768: {
                spaceBetween: 32,
              },
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
