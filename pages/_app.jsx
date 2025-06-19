import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ViewportProvider } from 'utils/viewport';
import '../styles/styles.scss';

const GA_MEASUREMENT_ID = 'G-7ZWQYNBWJ6';

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const handleRouteChange = (url) => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // make sure we don't output invalid `hrefLang` values
  if (!process.env.NEXT_PUBLIC_FRONTEND_URL) {
    delete pageProps.hrefLang;
  }

  return (
    <Fragment>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ViewportProvider>
        <Component {...pageProps} />
      </ViewportProvider>
    </Fragment>
  );
}

export default App;
