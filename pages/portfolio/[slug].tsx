import { MDXRemote } from 'next-mdx-remote';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getFiles, getFileBySlug } from '@lib/mdx';
import MDXComponents from '@components/Utils/MDXComponents';
import BlogLayout from 'layouts/BlogLayout';
import PortfolioLayout from 'layouts/PortfolioLayout';

const PostPage = ({ mdxSource, frontMatter }: any) => {
  return (
    <PortfolioLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </PortfolioLayout>
  );
};
export default PostPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = await getFiles('projects', locales);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const project = await getFileBySlug('projects', params.slug as string, locale);

  return { props: { ...project } };
};
