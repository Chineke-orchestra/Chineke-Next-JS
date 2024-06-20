import styles from './EventsList.module.scss';
import { Colors, I_Link, I_Media } from 'types/index';
import { useViewport } from 'utils/viewport';
import { useEffect, useState } from 'react';
import { ColoredCardWithImage } from '..';
import Select, { components } from 'react-select';
import moment from 'moment';

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 10L12 15L17 10H7Z" fill="black" />
      </svg>
    </components.DropdownIndicator>
  );
};

export interface EventsListProps {
  cards: {
    tag: string;
    link: I_Link;
    image: I_Media;
    backgroundColor: Colors;
    date: string;
  }[];
}

const options = [
  { value: 'a-z', label: 'Location (A-Z)' },
  { value: 'z-a', label: 'Location (Z-A)' },
  { value: 'latest', label: 'Date (latest)' },
  { value: 'furthest', label: 'Date (furthest)' },
];

const EventsList = ({ cards }: EventsListProps) => {
  const { isMobile } = useViewport();
  let numberOfCards = isMobile ? 3 : 8;
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(cards?.length > numberOfCards);
  const [filteredCards, setFilteredCards] = useState(cards);
  const [slicedCards, setSlicedCards] = useState(cards.slice(0, numberOfCards));
  const [filter, setFilter] = useState<{
    value: string;
    label: string;
  } | null>();

  useEffect(() => {
    setSlicedCards(cards.slice(0, numberOfCards));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfCards]);

  const loadMoreHandler = () => {
    setSlicedCards((prev) => [
      ...prev,
      ...filteredCards.slice(page * numberOfCards, (page + 1) * numberOfCards),
    ]);

    setShowButton((page + 1) * numberOfCards < cards?.length);
    setPage((prev) => prev + 1);
  };

  const sortHandler = () => {
    switch (filter?.value) {
      case 'a-z': {
        const newCards = cards?.sort((a, b) => {
          if (a.tag?.toUpperCase() < b.tag?.toUpperCase()) {
            return -1;
          }
          if (a.tag?.toUpperCase() > b.tag?.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        setFilteredCards(newCards);
        setSlicedCards(newCards?.slice(0, page * numberOfCards));
        break;
      }
      case 'z-a': {
        const newCards = cards?.sort((a, b) => {
          if (a?.tag?.toUpperCase() > b?.tag?.toUpperCase()) {
            return -1;
          }
          if (a?.tag?.toUpperCase() < b?.tag?.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        setFilteredCards(newCards);
        setSlicedCards(newCards?.slice(0, page * numberOfCards));

        break;
      }
      case 'latest': {
        const newCards = cards?.sort((a, b) => {
          const date1 = new Date(a?.date);
          const date2 = new Date(b?.date);
          if (date1 < date2) {
            return -1;
          }
          if (date1 > date2) {
            return 1;
          }
          return 0;
        });
        setFilteredCards(newCards);
        setSlicedCards(newCards?.slice(0, page * numberOfCards));
        break;
      }
      case 'furthest': {
        const newCards = cards?.sort((a, b) => {
          const date1 = new Date(a?.date);
          const date2 = new Date(b?.date);
          if (date1 > date2) {
            return -1;
          }
          if (date1 < date2) {
            return 1;
          }
          return 0;
        });
        setFilteredCards(newCards);
        setSlicedCards(newCards?.slice(0, page * numberOfCards));
        break;
      }
    }
  };

  useEffect(() => {
    if (filter?.value) {
      sortHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter?.value]);

  return (
    <section className={styles.our_team}>
      <div className="container">
        <Select
          options={options}
          className="custom_select"
          classNamePrefix="custom_select"
          placeholder="SORT BY"
          isSearchable={false}
          value={filter}
          onChange={(value) => setFilter(value)}
          instanceId="filter"
          components={{ DropdownIndicator }}
        />
        <div className={styles.cards}>
          {slicedCards?.map((item, index) => {
            return (
              <ColoredCardWithImage
                {...item}
                date={moment(item?.date).format('D MMM YYYY - hA')}
                index={index}
                fullWidthImage
                key={index}
              />
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

export default EventsList;
