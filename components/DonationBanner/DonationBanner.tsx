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
  footNote?: string;
  donationAmount?: number[];
}

const DonationBanner = ({
  headline,
  title,
  text,
  image,
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
        animate={isInView && 'animate'}
        initial={'initial'}
        variants={UseAnimation('up', {
          delay: 0,
          startY: 300,
          endY: 0,
          duration: 1.5,
          stiffness: 100,
          fromOpacity: 0,
          toOpacity: 1,
        })}
      >
        <div className={styles.leftSide}>
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
        </div>
        <div className={styles.rightSide}>
          {image && (
            <Image
              src={image.url}
              alt={image.alt}
              layout="responsive"
              width={604}
              height={406}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default DonationBanner;
