import { useState } from 'react';
import Container from '@components/Container';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Card } from '@components/Sections/Card';
import { motion } from 'framer-motion';
import { useHotkeys } from 'react-hotkeys-hook';
import SearchModal from '@components/Sections/SearchModal';

const wrapperVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
};

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

  const [showSearch, setShowSearch] = useState(false);

  const handleShortcut = () => {
    setShowSearch((showSearch) => !showSearch);
  };

  useHotkeys('ctrl+y', handleShortcut, {
    filterPreventDefault: false,
    enableOnTags: ['INPUT'],
  });

  return (
    <Container title={metaTitle} description={metaDescription}>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <SearchModal
          open={showSearch}
          setOpen={setShowSearch}
          search={search}
          setSearchValue={setSearchValue}
        />
        {!showSearch && (
          <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 text-black dark:text-white">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
            <h2 className="font-bold text-2xl md:text-4xl tracking-tight my-8 text-black dark:text-white">
              {allPosts}
            </h2>
          </motion.div>
        )}
        {!filteredBlogPosts.length && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 w-full">{noPostsFind}</p>
        )}
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={wrapperVariants}
          id="title"
          className="flex flex-col gap-8 w-full"
        >
          {filteredBlogPosts.map((frontMatter) => (
            <Card key={frontMatter.slug} {...frontMatter} cardType="blog" />
          ))}
        </motion.div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => {
  const posts = await getAllFilesFrontMatter('blog', locale);

  return { props: { posts } };
};
