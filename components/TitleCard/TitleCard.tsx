import { HeaderProps } from 'components/Header/Header';
import { findBreadcrumbPaths } from 'utils/findBreadcrumbPaths';
import styles from './TitleCard.module.scss';
import classNames from 'classnames';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface TitleCardProps {
  title?: string;
  text?: string;
  backgroundColor?: '#FFFFFF' | '#1E1E4C';
  path: string;
  headerMenu: {
    headerMenu: HeaderProps[];
  };
}

const TitleCard = ({
  title,
  text,
  backgroundColor,
  path,
  headerMenu,
}: TitleCardProps) => {
  const router = useRouter();
  const breadcrumbs = findBreadcrumbPaths(path, headerMenu.headerMenu);

  const formatBreadcrumb = (url: string) => {
    const name = url.replace(/^\//, '');
    return name.charAt(0) + name.slice(1).replace(/-/g, ' '); //
  };

  const colorTheme =
    backgroundColor === '#1E1E4C'
      ? 'colorInvert'
      : '#FFFFFF'
        ? 'colorNormal'
        : '';

  return (
    <section
      className={classNames(styles.titleCardWrapper, styles[colorTheme])}
    >
      <div className={classNames(styles.titleCard, 'container')}>
        <div className={styles.leftPart}>
          {path && (
            <div className={styles.breadCrumbContainer}>
              {breadcrumbs.map((item, index) => (
                <Link
                  key={index}
                  href={item === '/homepage' ? '/' : item}
                  className={classNames({
                    [styles.active]: router.asPath === item,
                  })}
                >
                  {formatBreadcrumb(item)}
                </Link>
              ))}
            </div>
          )}

          {title && <h1>{title}</h1>}
        </div>
        {text && (
          <div className={styles.rightPart}>
            <div>{parse(text)}</div>

            {router.pathname === '/donate' && (
              <div className={styles.buttonContainer}>
                <button className="btn large transparentRed">
                  Become a friend
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TitleCard;
