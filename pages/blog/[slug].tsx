import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Seo from "../../components/Seo";
export const getStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
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
      <div className="mt-10 prose">
        <h1 className="text-sky-700">{post.title}</h1>
        <MDXComponent />
      </div>
    </div>
  );
};

export default Post;
