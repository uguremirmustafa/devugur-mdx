import { MDXRemote } from 'next-mdx-remote';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { getFiles, getFileBySlug } from '@lib/mdx';
import MDXComponents from '@components/Utils/MDXComponents';
import BlogLayout from 'layouts/BlogLayout';

const PostPage = ({ mdxSource, frontMatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <BlogLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </BlogLayout>
  );
};
export default PostPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = await getFiles('blog', locales);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const post = await getFileBySlug('blog', params.slug as string, locale);

  return { props: { ...post } };
};
