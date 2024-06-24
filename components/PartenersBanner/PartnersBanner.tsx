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
  return (
    <section className="container">
      <div
        className={styles.bannerContainer}
        style={{ backgroundColor: backgroundColor || 'transparent' }}
      >
        {title && <p>{title}</p>}

        <div className={styles.logosContainer}>
          {logos.map((item, index) => (
            <Image
              key={index}
              src={item.url}
              alt={item.alt}
              width={314}
              height={82}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersBanner;
