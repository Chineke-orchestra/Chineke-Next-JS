import styles from './NewsList.module.scss';
import { useEffect, useState } from 'react';
import { useViewport } from 'utils/viewport';
import { I_Link, I_Media } from 'types/index';
import Image from 'next/image';
import { LinkComponent } from '..';
import moment from 'moment';
import { motion } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import classNames from 'classnames';
import { getCurrentLocaleStore, globalDrupalStateStores } from 'lib/stores';
import { useRouter } from 'next/router';
import { formatNewsCategoriesData, formatNewsListData } from 'utils/adaptors';
import useSWR from 'swr';

export interface I_Tag {
  name: string;
  id: number;
}

const NewsList = (props: {
  news: {
    image: I_Media;
    link: I_Link;
    date: string;
    category: string;
  }[];
}) => {
  const { isMobile } = useViewport();
  const { locale } = useRouter();
  let numberOfTestimonials = isMobile ? 3 : 8;
  const [page, setPage] = useState(0);
  const [tags, setTags] = useState<I_Tag[]>([]);
  const [activeFilter, setActiveFilter] = useState(-1);

  const store = getCurrentLocaleStore(
    locale as string,
    globalDrupalStateStores,
  );

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [news, setNews] = useState(props.news);
  const [totalNews, setTotalNews] = useState(0);

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (page === 0) {
          setNews(formatNewsListData(data));
          setTotalNews(data.meta.count);
        } else {
          setNews((prev) => {
            return [...prev, ...formatNewsListData(data)];
          });
        }
        return data;
      });

  const { data, isLoading } = useSWR(
    !isFirstLoad ? `/api/news?page=${page}&id=${activeFilter}` : undefined,
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
      const data: any = await store.fetchData(`/api/tags`);
      setTags(() => {
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

  return (
    <div className={styles.news_listing}>
      <div className={classNames(styles.buttons, 'container')}>
        {tags?.map((item) => {
          return (
            <button
              className={classNames('btn  medium', {
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
      <div className="container">
        <div className={styles.news_container}>
          {news?.map((item, index) => {
            return (
              <LinkComponent link={item.link} key={index}>
                <div
                  className={styles.card}
                  onMouseOver={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(-1)}
                >
                  <div className={styles.image}>
                    <Image src={item.image.url} alt={item.image.alt} fill />
                    {item.category && (
                      <p className="tag yellow">{item.category}</p>
                    )}
                  </div>
                  <div className={styles.text}>
                    <p>{moment(item.date).format('DD MMM YYYY')}</p>
                    <h5>
                      {item.link.title}
                      <motion.span
                        className="underline"
                        initial={{ scaleX: 0 }}
                        animate={index === activeIndex ? 'animate' : 'initial'}
                        variants={UseAnimation('right', {
                          duration: 0.5,
                          distance: 0,
                          startScaleX: 0,
                          endScaleX: 1,
                        })}
                        style={{
                          originX: 0,
                        }}
                      />
                    </h5>
                  </div>
                </div>
              </LinkComponent>
            );
          })}
        </div>

        {(news.length < totalNews || totalNews === undefined) && (
          <button
            className="btn large yellow load_more"
            onClick={loadMoreHandler}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsList;
