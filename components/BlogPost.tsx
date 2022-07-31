import Link from "next/link";

const BlogPost = ({ date, title, des, slug }: any) => {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <a>
        <div>{date}</div>
        <div>{title}</div>
        <div>{des}</div>
      </a>
    </Link>
  );
};

export default BlogPost;
