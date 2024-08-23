import styles from './PartnersList.module.scss';
import classNames from 'classnames';
import { I_Media } from 'types/index';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useViewport } from 'utils/viewport';
import Link from 'next/link';

export interface PartnersListProps {
  tagline?: string;
  title?: string;
  logos: {
    image: I_Media;
    link: string;
  }[];
}

const PartnersList = ({ tagline, title, logos }: PartnersListProps) => {
  const [splitedLogos, setSplitedLogos] = useState<any>([]);
  const { isMobile } = useViewport();

  useEffect(() => {
    const splitArrays = [];
    for (let i = 0; i < logos.length; i += isMobile ? 3 : 4) {
      splitArrays.push(logos.slice(i, i + (isMobile ? 3 : 4)));
    }
    setSplitedLogos(splitArrays);
  }, [logos, isMobile]);

  return (
    <section className={classNames(styles.partners_list, 'container')}>
      {tagline && <h6>{tagline}</h6>}
      {title && <h2>{title}</h2>}
      <div className={styles.logos}>
        {splitedLogos?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={classNames(styles.logos_row, {
                [styles.centered]: item?.length < (isMobile ? 3 : 4),
              })}
            >
              {item?.map(
                (logo: { image: I_Media; link: string }, index: number) => {
                  return (
                    <div key={index} className={styles.logo}>
                      {logo?.link ? (
                        <Link href={logo.link} target={'_blank'}>
                          <Image
                            src={logo.image.url}
                            alt={logo.image.alt}
                            fill
                            objectFit="contain"
                            objectPosition="center"
                            loading="lazy"
                            priority={false}
                          />
                        </Link>
                      ) : (
                        <Image
                          src={logo.image.url}
                          alt={logo.image.alt}
                          fill
                          objectFit="contain"
                          objectPosition="center"
                          loading="lazy"
                          priority={false}
                        />
                      )}
                    </div>
                  );
                },
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PartnersList;
