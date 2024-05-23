import { I_Media } from 'types/index';
import styles from './PartnersBanner.module.scss';
import Image from 'next/image';

export interface PartnersBannerProps {
  title?: string;
  backgroundColor?: string | null;
  logos: I_Media[];
}

const PartnersBanner = ({
  title,
  backgroundColor,
  logos,
}: PartnersBannerProps) => {
  console.log(backgroundColor);
  return (
    <section className="container">
      <div
        className={styles.bannerContainer}
        style={{ backgroundColor: backgroundColor || 'transparent' }}
      >
        {title && <p>{title}</p>}

        <div className={styles.logosContainer}>
          {logos.map((item, index) => (
            <div key={index} className={styles.logoContainer}>
              <Image
                src={item.url}
                alt={item.alt}
                sizes="100%"
                width={400}
                height={400}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersBanner;
