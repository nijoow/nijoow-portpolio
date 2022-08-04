import Head from "next/head";
import metadata from "data/metadata";
import { prefix } from "../../config/config";
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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="title" />
      <meta name="description" content={meta.description} />
      <meta name="author" content={meta.author} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={headerTitle} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={`${prefix}/images/nijoow.svg`} />
      <meta property="og:url" content="http://www.mysite.com" />
    </Head>
  );
}
