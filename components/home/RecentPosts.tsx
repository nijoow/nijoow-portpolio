import Link from "next/link";
import styles from "../../styles/home/Home.module.css";
import BlogPost from "../blog/BlogPost";
const RecentPosts = ({ posts }: any) => {
  return (
    <>
      {posts.slice(0, 5).map((post: any) => (
        <BlogPost
          date={post.date}
          title={post.title}
          description={post.description}
          category={post.category}
          slug={post._raw.flattenedPath}
          key={post._id}
        />
      ))}
    </>
  );
};

export default RecentPosts;
