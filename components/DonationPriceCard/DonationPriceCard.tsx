import classNames from 'classnames';
import styles from './DonationPriceCard.module.scss';
import parse from 'html-react-parser';
import Link from 'next/link';

export interface DonationCardProps {
  title: string;
  subtitle: string;
  text?: string;
  donationSingle?: number;
  donationCouple?: number;
  ctaHeadline?: string;
  ctaButtons: 'single' | 'couple' | 'contact_us';
}

const DonationPriceCard = ({
  title,
  subtitle,
  text,
  ctaHeadline,
  ctaButtons,
}: DonationCardProps) => {
  return (
    <section className={classNames(styles.donationCardContainer, 'container')}>
      <div className={styles.donationCardWrapper}>
        <div className={styles.titlePart}>
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        {text && <div className={styles.bodyTextPart}>{parse(text)}</div>}

        <div className={styles.buttonsPart}>
          <div className={styles.buttonsContainer}>
            {(ctaButtons === 'single' || ctaButtons === 'couple') && (
              <Link className="btn large yellow" href={'/becomeafriend'}>
                Become a friend
              </Link>
            )}

            {ctaButtons === 'contact_us' && (
              <Link href="/contact" className="btn medium transparentBlack">
                Contact Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationPriceCard;
