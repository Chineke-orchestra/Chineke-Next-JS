import styles from './PartnersList.module.scss';
import classNames from 'classnames';
import { I_Media } from 'types/index';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useViewport } from 'utils/viewport';

export interface PartnersListProps {
  tagline?: string;
  title?: string;
  logos: I_Media[];
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
      {tagline && <p>{tagline}</p>}
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
              {item?.map((logo: I_Media, index: number) => {
                return (
                  <div key={index} className={styles.logo}>
                    <Image
                      src={logo.url}
                      alt={logo.alt}
                      fill
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PartnersList;
