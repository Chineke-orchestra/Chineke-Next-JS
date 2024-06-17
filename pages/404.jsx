// pages/404.jsx
import Layout from '../components/layout';
import { NextSeo } from 'next-seo';
import { fetchHeaderData } from '../utils/dataFetcher';
import { useHeaderHeight } from '../utils/useHeaderHeight';
import styles from './404.module.scss';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import disk from 'assets/svg/404.svg';
import Link from 'next/link';

export default function Custom404({ headerMenu }) {
  const headerHeight = useHeaderHeight();

  const containerHeight = `calc(100vh - ${headerHeight}px)`;

  return (
    <Layout headerMenu={headerMenu} showFooter={false}>
      <NextSeo title="Page Not Found" />
      <div style={{ height: headerHeight }}></div>
      <section
        className={styles.fourOFourContainer}
        style={{ height: containerHeight }}
      >
        <div className={classNames(styles.contentWrapper, 'container')}>
          <ReactSVG src={disk.src} />
          <h1>Lost in Music</h1>
          <p>
            Looks like the melody of this page is off-key. Let&apos;s harmonize
            our way back to familiar tunes!
          </p>

          <Link href="/" className={classNames('btn large yellow')}>
            back to home
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const locale = context.locale || 'en';
    const headerMenu = await fetchHeaderData({ locale });

    return {
      props: {
        headerMenu,
      },
    };
  } catch (error) {
    console.error('There was an error while fetching data:', error);
    return {
      props: {
        headerMenu,
      },
    };
  }
}
