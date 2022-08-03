import Layout from "../components/layout/Layout";
import Head from "next/head";
import "../styles/_common/globals.css";
import { UserProvider } from "../context/context";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
