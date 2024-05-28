import classNames from 'classnames';
import { I_Media } from 'types/index';
import styles from './ThreeColumnLayout.module.scss';
import Image from 'next/image';
import parse from 'html-react-parser';

export interface ThreeColumnLayoutProps {
  image: I_Media;
  title: string;
  text: string;
}

const ThreeColumnLayout = ({ image, title, text }: ThreeColumnLayoutProps) => {
  console.log(image);

  return (
    <section className={classNames(styles.threeColumnContainer, 'container')}>
      {image.url && (
        <div className={styles.imageContainer}>
          <Image src={image.url} alt={image.alt} sizes="100%" fill />
        </div>
      )}

      <div className={styles.textContainer}>
        {title && <h2>{title}</h2>}
        {text && <div className={styles.textColumns}>{parse(text)}</div>}
      </div>
    </section>
  );
};

export default ThreeColumnLayout;
