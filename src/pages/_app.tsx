import Layout from '@components/_common/layout/Layout';
import '@styles/_common/globals.css';
import '@styles/_common/github-markdown.css';

import type { AppProps } from 'next/app';
import { store } from '@store/config';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
