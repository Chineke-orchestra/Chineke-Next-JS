import { HeaderProps } from 'components/Header/Header';
import { findBreadcrumbPaths } from 'utils/findBreadcrumbPaths';
import styles from './TitleCard.module.scss';
import classNames from 'classnames';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment-timezone';

export interface TitleCardProps {
  title?: string;
  text?: string;
  backgroundColor?: '#FFFFFF' | '#1E1E4C';
  path: { url: string; title: string };
  headerMenu: {
    headerMenu: HeaderProps[];
  };
  type?: string;
  date?: string;
}

const sanitizeTitle = (title: string) => {
  return title.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

const TitleCard = ({
  title,
  text,
  backgroundColor,
  path,
  headerMenu,
  type,
  date,
}: TitleCardProps) => {
  const router = useRouter();
  const breadcrumbs = findBreadcrumbPaths(path, headerMenu.headerMenu);

  const determineEventStatus = (type?: string, date?: string) => {
    const currentDate = moment().tz(moment.tz.guess());
    if (type === 'node--events' && date) {
      const eventDate = moment(date).tz(moment.tz.guess());
      return eventDate.isBefore(currentDate) ? 'previous' : 'upcoming';
    }
    return null;
  };

  const getHardcodedBreadcrumbs = (
    eventStatus: string | null,
    type?: string,
    title?: string,
  ) => {
    switch (eventStatus) {
      case 'previous':
        return [
          { url: '/', title: 'Home' },
          { url: '/previous-concerts', title: 'Previous Concerts' },
          { url: '', title: title || 'Event' },
        ];
      case 'upcoming':
        return [
          { url: '/', title: 'Home' },
          { url: '', title: "What's On" },
          { url: '/upcoming-concerts', title: 'Upcoming Concerts' },
          { url: '', title: title || 'Event' },
        ];
      default:
        switch (type) {
          case 'node--news':
            return [
              { url: '/', title: 'Home' },
              { url: '/news', title: 'News' },
              { url: '', title: title || 'News' },
            ];
          case 'node--stories':
            return [
              { url: '/', title: 'Home' },
              { url: '/stories', title: title || 'Stories' },
              { url: '', title: title || 'Story' },
            ];
          default:
            return breadcrumbs;
        }
    }
  };

  const eventStatus = determineEventStatus(type, date);
  const hardcodedBreadcrumbs = getHardcodedBreadcrumbs(
    eventStatus,
    type,
    title,
  );

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
              {hardcodedBreadcrumbs.map((item, index) =>
                item.url ? (
                  <Link
                    key={index}
                    href={item.url === '/homepage' ? '/' : item.url}
                    className={classNames({
                      [styles.active]:
                        router.asPath === item.url || item.title === title,
                    })}
                  >
                    {sanitizeTitle(item.title)}
                  </Link>
                ) : (
                  <h6 key={index}>{sanitizeTitle(item.title)}</h6>
                ),
              )}
            </div>
          )}

          {title && <h1>{title}</h1>}
        </div>
        {text && (
          <div className={styles.rightPart}>
            <div>{parse(text)}</div>

            {/* {router.pathname === '/donate' && (
              <Link href="/becomeafriend" className={styles.buttonContainer}>
                <button className="btn large yellow">Become a friend</button>
              </Link>
            )} */}
          </div>
        )}
      </div>
    </section>
  );
};

export default TitleCard;
