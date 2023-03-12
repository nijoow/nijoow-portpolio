import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@components/_common/layout/Layout';
import '@styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
