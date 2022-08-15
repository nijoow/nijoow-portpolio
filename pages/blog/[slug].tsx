import { useEffect } from "react";
import { allPosts } from "contentlayer/generated";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { useMDXComponent } from "next-contentlayer/hooks";
import styles from "../../styles/blog/Blog.module.css";
import Link from "next/link";
import Seo from "../../components/_common/Seo";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { setCategory } from "../../store/slices/categorySlice";
import { setTheme } from "../../store/slices/themeSlice";
import hljs from "highlight.js/lib/common";
import "../../node_modules/highlight.js/styles/base16/dracula.css";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params?.slug);
  return {
    props: {
      post,
    },
  };
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dispatch = useAppDispatch();
  const { currentTheme } = useAppSelector((state) => state.theme);

  const customMeta = {
    title: post.title,
    description: post.description,
    date: new Date(post.date).toISOString(),
  };
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, [currentTheme]);
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <div>
      <Seo customMeta={customMeta} />
      <section>
        <div className="title">
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </div>
        <div className={`${styles.postContent} markdown-body`}>
          <div className={styles.postInfo}>
            <div className={styles.postDate}>{post.date}</div>
            {post.category.split(", ").map((item: string, index: number) => (
              <Link href="/blog" key={index}>
                <button
                  className={styles.postCategory}
                  onClick={() => {
                    dispatch(setCategory(item));
                  }}
                >
                  {item}
                </button>
              </Link>
            ))}
          </div>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <MDXComponent />
        </div>
      </section>
    </div>
  );
};

export default Post;
