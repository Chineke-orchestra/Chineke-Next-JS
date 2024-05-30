import classNames from 'classnames';
import styles from './TwoColumnsList.module.scss';
import parse from 'html-react-parser';

export interface TwoColumnsListProps {
  title?: string;
  list?: string[];
  text: string;
  backgroundColor?: '#FFFFFF' | '#1E1E4C';
  listStyle?: 'numbered' | 'standard' | 'none';
}

const TwoColumnsList = ({
  title,
  list,
  text,
  backgroundColor = '#1E1E4C',
  listStyle = 'none',
}: TwoColumnsListProps) => {
  const colorTheme =
    backgroundColor === '#1E1E4C'
      ? 'colorInvert'
      : backgroundColor === '#FFFFFF'
        ? 'colorNormal'
        : '';

  return (
    <section
      className={classNames(
        styles.twoColumnsContainer,
        'container',
        styles[colorTheme],
      )}
    >
      <h3>{title}</h3>

      <div className={styles.textContainer}>
        {list && (
          <ul>
            {list.map((item, index) => (
              <li key={index}>
                {listStyle === 'numbered' ? (
                  <span className={styles.circle}>{index + 1}</span>
                ) : listStyle === 'standard' ? (
                  <span />
                ) : null}
                <p>{item}</p>
              </li>
            ))}
          </ul>
        )}

        {text && <div className={styles.text}> {parse(text)}</div>}
      </div>
    </section>
  );
};

export default TwoColumnsList;
