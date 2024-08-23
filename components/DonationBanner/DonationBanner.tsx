import { I_Media } from 'types/index';
import styles from './DonationBanner.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import { useState, ChangeEvent, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

export interface DonationBannerProps {
  headline?: string;
  title: string;
  text?: string;
  image: I_Media;
  secondImage: I_Media;
  footNote?: string;
}

const DonationBanner = ({
  headline,
  title,
  text,
  image,
  secondImage,
}: DonationBannerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, {
    margin: '0px 0px  -10% 0px',
    once: true,
  });
  const router = useRouter();

  const handleDonate = () => {
    router.push(`/donate`);
  };

  return (
    <section className={styles.donationBannerWrapper} ref={scrollRef}>
      <motion.div
        className={classNames(styles.donationBannerContainer, 'container')}
      >
        <motion.div
          className={styles.leftSide}
          animate={isInView ? 'animate' : 'initial'}
          initial="initial"
          variants={UseAnimation('up', {
            delay: 0.5,
            startY: 300,
            endY: 0,
            duration: 1.5,
            stiffness: 100,
            fromOpacity: 0,
            toOpacity: 1,
          })}
        >
          {headline && <h6>{headline}</h6>}
          {title && <h2>{title}</h2>}
          {text && <p>{text}</p>}

          <button
            onClick={handleDonate}
            className={classNames(styles.button, 'btn large orange')}
          >
            DONATE
          </button>
        </motion.div>
        <div className={styles.rightSide}>
          {image && (
            <div className={styles.imageWrapper} style={{ flexBasis: '33%' }}>
              <Image
                src={image.url}
                alt={image.alt}
                layout="responsive"
                width={201}
                height={406}
                loading="lazy"
              />
            </div>
          )}
          {secondImage && (
            <motion.div
              className={styles.imageWrapper}
              animate={isInView ? 'animate' : 'initial'}
              initial="initial"
              variants={UseAnimation('up', {
                delay: 0.5,
                startY: 300,
                endY: 0,
                duration: 1.5,
                stiffness: 100,
                fromOpacity: 0,
                toOpacity: 1,
              })}
              style={{ flexBasis: '67%' }}
            >
              <Image
                src={secondImage.url}
                alt={secondImage.alt}
                layout="responsive"
                width={401}
                height={406}
                loading="lazy"
                priority={false}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default DonationBanner;
