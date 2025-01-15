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
import { motion, useInView } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import { useViewport } from 'utils/viewport';

const SwiperCustomControls = ({
  prevRef,
  nextRef,
}: {
  prevRef: any;
  nextRef: any;
}) => {
  return (
    <div
      className={classNames(styles.swiper_controls, 'swiper_controls_global')}
    >
      <button ref={prevRef} className={styles.swiper_button} />
      <button ref={nextRef} className={styles.swiper_button} />
    </div>
  );
};

const Carousel = (props: {
  title: string;
  tagline?: string;
  body?: string;
  link?: I_Link;
  buttonClass?: string;
  withoutBodyVariation?: boolean;
  buttonsBottom?: boolean;
  children?: ReactNode;
}) => {
  const { isMobile } = useViewport();
  const [initialized, setInitialized] = useState(false);
  const [paddingLeft, setPaddingLeft] = useState(0);

  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);
  const ref = useRef<any>();
  const animationRef = useRef<any>();
  const [width, setWidth] = useState(ref?.current?.offsetLeft);

  const isInView = useInView(animationRef, {
    margin: '0px 0px  -10% 0px',
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

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setTimeout(() => {
        setInitialized(true);
      }, 300);
    }
  }, [prevRef, nextRef, isMobile]);

  return (
    <section
      className={styles.carousel}
      style={{ paddingLeft }}
      ref={animationRef}
    >
      <div
        className={classNames(styles.wrapper, {
          [styles.without_body_variation]: props.withoutBodyVariation,
        })}
      >
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
            {props.body && (
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
                <>{parse(props.body)}</>
              </motion.div>
            )}
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
              {props.link && (
                <LinkComponent
                  link={props.link}
                  className={classNames(
                    props.link?.url ? 'btn large yellow' : '',
                    styles.button,
                    props.buttonClass,
                  )}
                >
                  {props.link.title}
                </LinkComponent>
              )}
              {((!props.withoutBodyVariation && !props.buttonsBottom) ||
                (!isMobile &&
                  props.buttonsBottom &&
                  !props.withoutBodyVariation)) && (
                <SwiperCustomControls prevRef={prevRef} nextRef={nextRef} />
              )}
            </motion.div>
          </div>
          {props.withoutBodyVariation && !isMobile && (
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
              style={{ transformOrigin: 'bottom' }}
            >
              <SwiperCustomControls prevRef={prevRef} nextRef={nextRef} />
            </motion.div>
          )}
        </div>
        <div
          className={styles.right_side}
          ref={ref}
          style={{ width: `calc(100vw - ${width}px)` }}
        >
          {initialized && (
            <Swiper
              grabCursor={false}
              centeredSlides={false}
              spaceBetween={20}
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
              onInit={(swiper: any) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.update();
              }}
            >
              {props.children}
            </Swiper>
          )}
        </div>

        {(props.withoutBodyVariation || props.buttonsBottom) && isMobile && (
          <div>
            <SwiperCustomControls prevRef={prevRef} nextRef={nextRef} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Carousel;
