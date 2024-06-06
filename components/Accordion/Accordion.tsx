import { useRef, useState } from 'react';
import styles from './Accordion.module.scss';
import parse from 'html-react-parser';
import classNames from 'classnames';
import arrow from 'assets/svg/arrow-left.svg';
import { ReactSVG } from 'react-svg';
import { useViewport } from 'utils/viewport';

const Accordion = (props: {
  title: string;
  items: {
    title: string;
    text: string;
  }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMobile } = useViewport();
  const ref = useRef<any>([]);

  const activeIndexHandler = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
      setTimeout(() => {
        window.scroll({
          top: ref.current[index]?.offsetTop - (!isMobile ? 220 : 150),
          behavior: 'auto',
        });
      }, 350);
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
                  ref={(el) => (ref.current[index] = el)}
                >
                  <div
                    aria-hidden="true"
                    className={styles.accordion_title}
                    onClick={() => activeIndexHandler(index)}
                  >
                    <h6>{item.title}</h6>
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
