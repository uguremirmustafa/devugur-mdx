import { useState } from 'react';

import Container from '@components/Container';
import { BlogCard } from '@components/Sections/BlogCard';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('blog');
  const title = t('title');
  const subTitle = t('subTitle');
  const description = t('description');
  const allPosts = t('allPosts');
  const search = t('search');
  const noPostsFind = t('noPostsFind');

  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .filter((frontMatter) => frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <Container
      title="Blog – Uğur Emirmustafaoğlu"
      description="My personal developer blog and portfolio where I share my projects and thoughts on web development"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
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
        {!searchValue && (
          <div className="flex flex-col gap-4 w-full">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
              {subTitle}
            </h3>
            <BlogCard
              title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
              summary="A deep-dive on everything I've learned in the past year building style guides, design systems, component libraries, and their best practices."
              slug="style-guides-component-libraries-design-systems"
            />
            <BlogCard
              title="How Stripe Designs Beautiful Websites"
              summary="Examining the tips and tricks used to make Stripe's website design a notch above the rest."
              slug="how-stripe-designs-beautiful-websites"
            />
            <BlogCard
              title="Creating a Monorepo with Lerna & Yarn Workspaces"
              summary="In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process."
              slug="monorepo-lerna-yarn-workspaces"
            />
          </div>
        )}
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          {allPosts}
        </h3>
        {!filteredBlogPosts.length && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{noPostsFind}</p>
        )}
        <div className="flex flex-col gap-2 w-full">
          {filteredBlogPosts.map((frontMatter) => (
            <BlogCard key={frontMatter.slug} {...frontMatter} />
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
