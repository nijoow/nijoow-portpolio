import Head from "next/head";
import metadata from "data/metadata";

export default function Seo({ customMeta }) {
  const meta = {
    title: metadata.title,
    discription: metadata.discription,
    author: metadata.author,
    ...customMeta,
  };
  let headerTitle = `${meta.title} | nijoow portfolio`;
  return (
    <Head>
      <title>{headerTitle}</title>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <meta content={meta.discription} names="discription" />
      <meta property="og:site_name" content={meta.author} />
    </Head>
  );
}
