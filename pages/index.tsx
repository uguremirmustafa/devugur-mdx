import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';
import Layout from '@components/Layout/Layout';
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';
import { FC } from 'react';

interface Props {
  posts: any;
}

const Index: FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <ul>
        {posts.map((post: any) => (
          <li key={post.filePath}>
            <Link as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/posts/[slug]`}>
              <a>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default Index;

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    console.log(source);

    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
