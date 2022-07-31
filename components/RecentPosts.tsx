import Link from "next/link";

const RecentPosts = ({ posts }: any) => {
  return (
    <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {posts.slice(0, 6).map((post: any) => (
        <div>
          <Link
            key={post._id}
            href={`/blog/${post._raw.flattenedPath}`}
            passHref
          >
            <a className="mt-5">
              <div className="font-bold text-3xl">{post.title}</div>
              <div className="font-medium">{post.date.slice(0, 10)}</div>
              <div className="font-light text-">{post.description}</div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
