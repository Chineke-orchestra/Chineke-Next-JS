import { useState } from 'react';
import styles from './Accordion.module.scss';
import parse from 'html-react-parser';
import classNames from 'classnames';
import arrow from 'assets/svg/arrow-left.svg';
import { ReactSVG } from 'react-svg';

const Accordion = (props: {
  title: string;
  items: {
    title: string;
    text: string;
  }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexHandler = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <section className={styles.accordion_component}>
      <div className="container">
        <div className={styles.accordion_inner_component}>
          <h3>{props.title}</h3>
          <div className={styles.accordion_items}>
            {props.items?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.accordion_item, {
                    [styles.active]: index === activeIndex,
                  })}
                >
                  <div
                    aria-hidden="true"
                    className={styles.accordion_title}
                    onClick={() => activeIndexHandler(index)}
                  >
                    <p>{item.title}</p>
                    <ReactSVG src={arrow.src} />
                  </div>
                  <div className={styles.accordion_text}>
                    {item.text && <div>{parse(item.text)}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
