import { Fragment } from 'react';
import { ViewportProvider } from 'utils/viewport';
import '../styles/styles.scss';

function App({ Component, pageProps }) {
  // make sure we don't output invalid `hrefLang` values
  if (!process.env.NEXT_PUBLIC_FRONTEND_URL) {
    delete pageProps.hrefLang;
  }

  return (
    <Fragment>
      <ViewportProvider>
        <Component {...pageProps} />
      </ViewportProvider>
    </Fragment>
  );
}

export default App;
