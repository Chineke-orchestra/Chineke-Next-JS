import styles from './VideoCarousel.module.scss';
import { I_Link, I_Media } from 'types/index';
import { LinkComponent, Modal } from 'components';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import { useViewport } from 'utils/viewport';
import Image from 'next/image';
import infoIcon from 'assets/svg/info.svg';
import ReactPlayer from 'react-player';
import VideoPopup from './VideoPopup';

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

const ButtonsContainer = ({
  prevRef,
  nextRef,
  link,
}: {
  prevRef: any;
  nextRef: any;
  link?: I_Link;
}) => {
  return (
    <div className={styles.buttons_container}>
      {link && (
        <LinkComponent
          link={link}
          className={classNames('btn large yellow', styles.button)}
        >
          {link.title}
        </LinkComponent>
      )}

      <SwiperCustomControls prevRef={prevRef} nextRef={nextRef} />
    </div>
  );
};

const VideoCarousel = (props: {
  title: string;
  link?: I_Link;
  videos: { image: I_Media; videoLink: string; title: string }[];
}) => {
  const { isMobile } = useViewport();
  const [initialized, setInitialized] = useState(false);
  const [paddingLeft, setPaddingLeft] = useState(0);

  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);
  const ref = useRef<any>();
  const animationRef = useRef<any>();
  const [width, setWidth] = useState(ref?.current?.offsetLeft);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeVideo, setActiveVideo] = useState<null | string>(null);

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
    <section className={styles.carousel} ref={animationRef}>
      <div className={classNames(styles.top_side, 'container')}>
        <h2>{props.title}</h2>
        {!isMobile && (
          <ButtonsContainer
            prevRef={prevRef}
            nextRef={nextRef}
            link={props?.link}
          />
        )}
      </div>
      <div
        className={styles.bottom_side}
        ref={ref}
        style={{ width: `calc(100vw - ${width}px)`, paddingLeft }}
      >
        <div className={styles.swiper_wrapper}>
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
              {props.videos?.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    onMouseOver={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(-1)}
                    onClick={() => setActiveVideo(item?.videoLink)}
                  >
                    <div className={styles.video_card}>
                      <Image src={item.image.url} alt={item.image.alt} fill />
                      <div className={styles.text_container}>
                        <div className={styles.image}>
                          <Image src={infoIcon} alt="info-icon" fill />
                        </div>
                        <p>
                          {item.title}
                          <motion.span
                            className="underline"
                            initial={{ scaleX: 0 }}
                            animate={
                              index === activeIndex ? 'animate' : 'initial'
                            }
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
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
      <div>
        {isMobile && (
          <ButtonsContainer
            prevRef={prevRef}
            nextRef={nextRef}
            link={props?.link}
          />
        )}
      </div>
      {activeVideo && (
        <VideoPopup onClose={setActiveVideo} videoLink={activeVideo} />
      )}
    </section>
  );
};

export default VideoCarousel;
