import styles from './OurTeam.module.scss';
import { Colors, I_Media } from 'types/index';
import Image from 'next/image';
import classNames from 'classnames';
import { backgroundClasses } from 'utils/constants';
import { useViewport } from 'utils/viewport';
import { useEffect, useState } from 'react';

export interface OurTeamProps {
  title?: string;
  cards: {
    title: string;
    tagline?: string;
    image: I_Media;
    backgroundColor: Colors;
  }[];
}

const OurTeam = ({ title, cards }: OurTeamProps) => {
  const { isMobile } = useViewport();
  let numberOfCards = isMobile ? 3 : 8;
  const [showButton, setShowButton] = useState(cards.length > numberOfCards);
  const [slicedCards, setSlicedCards] = useState(cards.slice(0, numberOfCards));

  useEffect(() => {
    setSlicedCards(cards.slice(0, numberOfCards));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfCards]);

  const loadMoreHandler = () => {
    setSlicedCards((prev) => [
      ...prev,
      ...cards.slice(numberOfCards - 1, cards?.length - 1),
    ]);
    setShowButton(false);
  };
  useEffect(() => {
    setShowButton(cards.length > numberOfCards);
  }, [cards.length, numberOfCards]);

  return (
    <section className={styles.our_team}>
      <div className="container">
        {title && <h2>{title}</h2>}
        <div className={styles.cards}>
          {slicedCards?.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  styles.card,
                  styles[backgroundClasses[item.backgroundColor]],
                )}
                style={{ backgroundColor: item?.backgroundColor }}
              >
                <div className={styles.image}>
                  <Image src={item.image.url} alt={item.image.alt} fill loading="lazy"
              priority={false} />
                </div>
                <div className={styles.text}>
                  {item.tagline && (
                    <p className={styles.tagline}>{item.tagline}</p>
                  )}
                  <h5 className={styles.title}>{item.title}</h5>
                </div>
              </div>
            );
          })}
        </div>
        {showButton && (
          <button className="btn large yellow" onClick={loadMoreHandler}>
            Load more
          </button>
        )}
      </div>
    </section>
  );
};

export default OurTeam;
