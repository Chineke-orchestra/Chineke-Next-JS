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
  donationSingle,
  donationCouple,
  ctaHeadline,
  ctaButtons,
}: DonationCardProps) => {
  console.log(ctaButtons);

  return (
    <section className={classNames(styles.donationCardContainer, 'container')}>
      <div className={styles.donationCardWrapper}>
        <div className={styles.titlePart}>
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        {text && <div className={styles.bodyTextPart}>{parse(text)}</div>}

        <div className={styles.buttonsPart}>
          {ctaHeadline && <p>{ctaHeadline}</p>}

          <div className={styles.buttonsContainer}>
            {ctaButtons === 'single' && donationSingle && (
              <Link className="btn large yellow" href={'/becomeafriend'}>
                Become a friend
              </Link>
            )}

            {ctaButtons === 'couple' && (
              <div className={styles.buttons}>
                {donationSingle && (
                  <Link
                    className="btn medium transparentBlack"
                    href={'/donate'}
                  >
                    Single
                  </Link>
                )}
                {donationCouple && (
                  <Link
                    className="btn medium transparentBlack"
                    href={'/donate'}
                  >
                    Couple
                  </Link>
                )}
              </div>
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
