import { I_Media, I_Link, I_Card } from 'types/index';
import parse from 'html-react-parser';
import styles from './ExploreSection.module.scss';
import classNames from 'classnames';
import { LinkComponent } from '..';

import { motion } from 'framer-motion';
import ArrowButton from 'components/ArrowButton/ArrowButton';
import UseAnimation from 'utils/UseAnimation';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const ExploreSection = (props: {
  title?: string;
  backgroundImage?: I_Media;
  cards: I_Card[];
  variation: 'variation_one' | 'variation_two';
  featuredCard?: I_Card & {
    image: I_Media;
    tags: string[];
  };
}) => {
  const ref = useRef<any>();
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className={classNames(styles.explore_section, styles[props.variation])}
    >
      {props.variation === 'variation_one' && props.backgroundImage && (
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${props.backgroundImage?.url})` }}
        />
      )}
      <div className="container">
        <div className={styles.inner_container}>
          <div className={styles.cards_wrapper}>
            {props.featuredCard && (
              <div
                className={styles.featured_card}
                style={{
                  backgroundImage: `url(${props.featuredCard?.image.url})`,
                }}
              >
                <div className={styles.tags}>
                  {props.featuredCard?.tags?.map((tag, index) => {
                    return (
                      <p className="tag light" key={index}>
                        {tag}
                      </p>
                    );
                  })}
                </div>

                <LinkComponent link={props.featuredCard.link}>
                  <h3>{props.featuredCard.title}</h3>
                </LinkComponent>
                <>{parse(props.featuredCard.body)}</>
              </div>
            )}
            {props.title && <h2>{props.title}</h2>}
            <div className={styles.cards} ref={ref}>
              {props.cards?.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    className={styles.card}
                    animate={isInView && 'animate'}
                    initial={'initial'}
                    variants={UseAnimation('up', {
                      startScaleY: 0,
                      endScaleY: 1,
                      duration: 1,
                      fromOpacity: 1,
                      damping: 56,
                      delay: 0.5 + index * 0.3,
                    })}
                    style={{
                      transformOrigin: 'bottom',
                    }}
                  >
                    <LinkComponent link={item.link}>
                      <h4>{item.title}</h4>
                    </LinkComponent>

                    <>{parse(item.body)}</>
                    <LinkComponent link={item.link} className={styles.button}>
                      <ArrowButton />
                    </LinkComponent>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
