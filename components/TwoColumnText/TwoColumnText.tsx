import styles from './TwoColumnText.module.scss';
import { useViewport } from 'utils/viewport';
import parse from 'html-react-parser';
import classNames from 'classnames';

export interface TwoColumnTextProps {
  textLeft: string;
  textRight: string;
}

const TwoColumnText = ({ textLeft, textRight }: TwoColumnTextProps) => {
  const { isMobile } = useViewport();

  return (
    <section className={classNames(styles.textContainer, 'container')}>
      {isMobile ? (
        <div className={styles.textColumn}>
          {textLeft && parse(textLeft)}

          {textRight && parse(textRight)}
        </div>
      ) : (
        <>
          {textLeft && (
            <div className={styles.textColumn}>{parse(textLeft)}</div>
          )}
          {textRight && (
            <div className={styles.textColumn}>{parse(textRight)}</div>
          )}
        </>
      )}
    </section>
  );
};

export default TwoColumnText;
