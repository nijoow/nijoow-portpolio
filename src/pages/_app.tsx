import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '@styles/global.css';
import Layout from '@components/_common/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
