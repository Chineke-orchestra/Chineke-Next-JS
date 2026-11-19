import styles from './StoriesList.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useViewport } from 'utils/viewport';
import { Colors, I_Link, I_Media } from 'types/index';
import { ColoredCardWithImage } from '..';
import { useRouter } from 'next/router';
import {
  formatNewsCategoriesData,
  formatStoriesListData,
} from 'utils/adaptors';
import useSWR from 'swr';
import { I_Tag } from 'components/NewsList/NewsList';

const StoriesList = (props: {
  stories: {
    backgroundColor: Colors;
    categories: string[];
    image: I_Media;
    link: I_Link;
  }[];
  type: string;
}) => {
  const { isMobile } = useViewport();
  const { locale } = useRouter();

  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState<I_Tag[]>([]);
  const [activeFilter, setActiveFilter] = useState(-1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [stories, setStories] = useState(props.stories);
  const [totalStories, setTotalStories] = useState(0);

  const numberOfStories = isMobile ? 3 : 6;

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (page === 0) {
          setStories(formatStoriesListData(data));
          setTotalStories(data.meta.count);
        } else {
          setStories((prev) => {
            return [...prev, ...formatStoriesListData(data)];
          });
        }
        return data;
      });

  const { data, isLoading } = useSWR(
    !isFirstLoad ? `/api/stories?page=${page}&id=${activeFilter}&type=${props.type}` : undefined,
    fetcher,
  );

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  const loadMoreHandler = () => {
    setPage((prev) => prev + 1);
  };

  const getTags = async () => {
    try {
      const data: any = await fetch(`/api/categories`).then((response) => response.json());
      setCategories(() => {
        return [
          {
            name: 'All',
            id: -1,
          },
          ...formatNewsCategoriesData(data?.data?.data),
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayStories = stories.slice(0, (page + 1) * numberOfStories);

  return (
    <section className={classNames(styles.storiesListContainer, 'container')}>
      {props.type === 'all' && (
        <div className={styles.filtersContainer}>
          {categories?.map((item) => {
            return (
              <button
                className={classNames('btn small', {
                  yellow: item.id === activeFilter,
                })}
                key={item?.id}
                onClick={() => {
                  setActiveFilter(item.id);
                  setPage(0);
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.cardsContainer}>
        {displayStories.map((item, index) => {
          return (
            <ColoredCardWithImage
              {...item}
              index={index}
              fullWidthImage
              key={index}
              tag={item.categories}
              additionalClass="storiesTag"
            />
          );
        })}
      </div>

      {(displayStories.length < totalStories || totalStories === undefined) && (
        <button
          className="btn large yellow load_more"
          onClick={loadMoreHandler}
        >
          Load more
        </button>
      )}
    </section>
  );
};

export default StoriesList;
