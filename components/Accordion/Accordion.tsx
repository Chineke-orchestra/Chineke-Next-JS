import { useRef, useState } from 'react';
import styles from './Accordion.module.scss';
import parse from 'html-react-parser';
import classNames from 'classnames';
import arrow from 'assets/svg/arrow-left.svg';
import { ReactSVG } from 'react-svg';
import { useViewport } from 'utils/viewport';
import { usePathname } from 'next/navigation';

const Accordion = (props: {
  title: string;
  defaultMessage: string;
  items: {
    title: string;
    text: string;
  }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMobile } = useViewport();
  const ref = useRef<any>([]);
  const pathname = usePathname();
  const slug = pathname.split('/')[1];
  const sponserListClass = slug === 'support-us' ? 'sponserListPage' : '';
  const checkSponserListClasses = classNames(styles.accordion_text, {
    [styles.sponserListPage]: sponserListClass,
  });

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
          {props.defaultMessage && props.items.length === 0 && (
            <p>{props.defaultMessage}</p>
          )}

          <div className={styles.accordion_items}>
            {props.items?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.accordion_item, {
                    [styles.active]: index === activeIndex,
                  })}
                  ref={(el) => {
 ref.current[index] = el;
 }}
                >
                  <div
                    aria-hidden="true"
                    className={styles.accordion_title}
                    onClick={() => activeIndexHandler(index)}
                  >
                    <h6>{item.title}</h6>
                    <ReactSVG src={arrow.src} />
                  </div>
                  <div className={checkSponserListClasses}>
                  
                    {item.text && <div className={styles.sponserList_20}>{parse(item.text)}</div>}
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
