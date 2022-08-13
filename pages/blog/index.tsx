import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";
import BlogPost from "../../components/blog/BlogPost";
import Seo from "../../components/_common/Seo";
import styles from "../../styles/blog/Blog.module.css";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { setCategory } from "../../store/slices/categorySlice";

const blogCategory = [
  "all",
  "html",
  "css",
  "javascript",
  "react",
  "typescript",
  "library",
];
const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [nowPosts, setNowPosts] = useState(posts);
  const [selected, setSelected] = useState(0);
  const { currentCategory } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNowPosts(
      posts.filter((post) =>
        post.category.split(", ").includes(currentCategory)
      )
    );
    blogCategory.forEach((category, index) => {
      if (category === currentCategory) setSelected(index);
      return;
    });
    if (currentCategory === "all") {
      setNowPosts(posts);
    }
  }, [currentCategory]);

  return (
    <div>
      <Seo customMeta={{ title: "Blog" }} />
      <section>
        <div className="title">Blog</div>
        <div className={styles.categories}>
          <div className={styles.category}>
            {blogCategory.map((category, index) => (
              <button
                onClick={() => {
                  dispatch(setCategory(category));
                  // setSelected(index);
                }}
                className={`${styles.categoryBtn} ${
                  index === selected ? styles.selected : ""
                }`}
                key={index}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {nowPosts.map((post) => (
          <BlogPost
            date={post.date}
            title={post.title}
            description={post.description}
            category={post.category}
            slug={post._raw.flattenedPath}
            key={post._id}
          />
        ))}
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
