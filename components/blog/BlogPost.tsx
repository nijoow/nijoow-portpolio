import Link from "next/link";
import styles from "../../styles/blog/Blog.module.css";

const BlogPost = ({ date, title, description, category, slug }: any) => {
  return (
    <div className={styles.post}>
      <Link href={`/blog/${slug}`} passHref>
        <a>
          <div className={styles.postTitle}>{title}</div>

          <div className={styles.description}>{description}</div>
          <div className={styles.postRow}>
            <div className={styles.date}>{date}</div>

            {category.split(", ").map((item: string, index: number) => (
              <button className={styles.postCategory} key={index}>
                {item}
              </button>
            ))}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BlogPost;
