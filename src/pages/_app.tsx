import Layout from '@components/_common/layout/Layout';
import '@styles/global.css';

import type { AppProps } from 'next/app';
import { store } from '@store/config';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
