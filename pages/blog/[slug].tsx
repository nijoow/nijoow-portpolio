import { allPosts } from "contentlayer/generated";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { useMDXComponent } from "next-contentlayer/hooks";
import styles from "../../styles/blog/Blog.module.css";
import Link from "next/link";
import Seo from "../../components/_common/Seo";
interface IParams extends ParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const customMeta = {
    title: post.title,
    description: post.description,
    date: new Date(post.date).toISOString(),
  };
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <div>
      <Seo customMeta={customMeta} />
      <section>
        <div className="title">
          <Link href="/blog">
            <a>Blog</a>
          </Link>

          {/* <button className={styles.postCategory}>{post.category}</button> */}
        </div>
        <div className={styles.postContent}>
          <button className={styles.postCategory}>{post.category}</button>
          <div>{post.date}</div>
          <h1>{post.title}</h1>
          <MDXComponent />
        </div>
      </section>
    </div>
  );
};

export default Post;