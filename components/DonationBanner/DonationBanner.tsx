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
  donationAmount?: number[];
}

const DonationBanner = ({
                          headline,
                          title,
                          text,
                          image,
                          secondImage,
                          footNote,
                          donationAmount,
                        }: DonationBannerProps) => {
  const [manualAmount, setManualAmount] = useState<number | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setManualAmount(isNaN(value) ? null : value);
    setSelectedAmount(null);
  };

  const handleButtonClick = (amount: number) => {
    setSelectedAmount(amount);
    setManualAmount(null);
  };

  const handleDonate = () => {
    const amount = manualAmount ?? selectedAmount ?? 0;
    router.push(`/donate?donation=${amount}`);
  };

  return (
    <section className={styles.donationBannerWrapper} ref={ref}>
      <motion.div
        className={classNames(styles.donationBannerContainer, 'container')}
      >
        <motion.div className={styles.leftSide}
             animate={isInView ? 'animate' : 'initial'}
             initial='initial'
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
          <div className={styles.buttonsContainer}>
            <div className={styles.top}>
              {donationAmount &&
                donationAmount.map((amount, index) => (
                  <button
                    className={classNames(
                      styles.button,
                      'btn large transparentBlack ',
                      { active: selectedAmount === amount },
                    )}
                    key={index}
                    onClick={() => handleButtonClick(amount)}
                  >
                    {amount}
                  </button>
                ))}
            </div>
            <div className={styles.bottom}>
              <input
                type="number"
                value={manualAmount !== null ? manualAmount : ''}
                onChange={handleInputChange}
                placeholder="£ Enter amount"
                className={classNames(
                  styles.button,
                  'btn large transparentBlack',
                  styles.amountBtn
                )}
              />
              <button
                onClick={handleDonate}
                className={classNames(styles.button, 'btn large orange')}
              >
                DONATE
              </button>
            </div>
          </div>
          {footNote && <p>{parse(footNote)}</p>}
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
              />
            </div>
          )}
          {secondImage && (
            <motion.div
              className={styles.imageWrapper}
              animate={isInView ? 'animate' : 'initial'}
              initial='initial'
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
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default DonationBanner;
