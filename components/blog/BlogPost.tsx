import Link from "next/link";
import styles from "../../styles/blog/Blog.module.css";

const BlogPost = ({ date, title, description, category, slug }: any) => {
  return (
    <div className={styles.post}>
      <Link href={`/blog/${slug}`} passHref>
        <a>
          <div className={styles.postRow}>
            <div className={styles.postTitle}>{title}</div>

            <button className={styles.category}>{category}</button>
          </div>
          <div className={styles.description}>{description}</div>

          <div className={styles.date}>{date}</div>
        </a>
      </Link>
    </div>
  );
};

export default BlogPost;
