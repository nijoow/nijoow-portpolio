import Head from "next/head";
import metadata from "data/metadata";

interface SeoProps {
  customMeta: {
    title?: string;
    description?: string;
    author?: string;
  };
}
export default function Seo({ customMeta }: SeoProps) {
  const meta = Object.assign(
    {
      title: metadata.title,
      description: metadata.description,
      author: metadata.author,
    },
    customMeta
  );
  let headerTitle = `${meta.title} | nijoow portfolio`;
  return (
    <Head>
      <title>{headerTitle}</title>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <meta content={meta.description} name="discription" />
      <meta property="og:site_name" content={meta.author} />
    </Head>
  );
}
