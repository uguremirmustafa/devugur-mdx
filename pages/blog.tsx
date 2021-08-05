import { useState } from 'react';
import Container from '@components/Container';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Card } from '@components/Sections/Card';
import { getRouteImageMeta } from '@utils/image-api';

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('blog');
  const title = t('title');
  const subTitle = t('subTitle');
  const description = t('description');
  const allPosts = t('allPosts');
  const search = t('search');
  const noPostsFind = t('noPostsFind');
  const metaTitle = t('metaTitle');
  const metaDescription = t('metaDescription');

  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .filter((frontMatter) => frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <Container title={metaTitle} description={metaDescription}>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 text-black dark:text-white">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="relative w-full mb-4">
          <input
            aria-label={search}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={search}
            className="outline-none px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-red-500 focus:border-gray-400 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight my-8 text-black dark:text-white">
          {allPosts}
        </h2>
        {!filteredBlogPosts.length && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{noPostsFind}</p>
        )}
        <div id="title" className="flex flex-col gap-8 w-full">
          {filteredBlogPosts.map((frontMatter) => (
            <Card key={frontMatter.slug} {...frontMatter} cardType="blog" />
          ))}
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => {
  const posts = await getAllFilesFrontMatter('blog', locale);

  return { props: { posts } };
};
