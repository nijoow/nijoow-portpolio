import Link from "next/link";
import styles from "../../styles/about/About.module.css";
import BlogPost from "../blog/BlogPost";
const RecentPosts = ({ posts }: any) => {
  return (
    <div className={styles.recentPosts}>
      {posts.slice(0, 5).map((post: any) => (
        <BlogPost
          date={post.date}
          title={post.title}
          description={post.description}
          category={post.category}
          slug={post._raw.flattenedPath}
          key={post._id}
        />
        // <div>
        //   <Link
        //     key={post._id}
        //     href={`/blog/${post._raw.flattenedPath}`}
        //     passHref
        //   >
        //     <a>
        //       <div className={styles.postTitle}>{post.title}</div>
        //       <div className={styles.description}>{post.description}</div>
        //       <div className={styles.date}>{post.date}</div>
        //     </a>
        //   </Link>
        // </div>
      ))}
    </div>
  );
};

export default RecentPosts;
