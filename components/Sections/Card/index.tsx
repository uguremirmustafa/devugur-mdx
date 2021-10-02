import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import fetcher from '@lib/fetcher';
import useTranslation from 'next-translate/useTranslation';
import { Tool } from '@components/Svgs/Tool';
import { Eye } from '@components/Svgs/Eye';
import { Github } from '@components/Svgs/Github';
import { Live } from '@components/Svgs/Live';
import { motion } from 'framer-motion';

interface Props {
  files: string[];
  publishedAt: string;
  title: string;
  summary: string;
  images: string[];
  techStack?: string[];
  tags?: string[];
  locale: string;
  isPublished: boolean;
  slug: string;
  key: string;
  cardType: string;
  github: string;
  demo: string;
}

export const Card = ({
  summary,
  slug,
  title,
  cardType,
  techStack,
  github,
  demo,
  images,
}: Props) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);
  const { t } = useTranslation('common');
  const viewsText = t('views');
  const readMore = t('readMore');
  const githubText = t('github');
  const demoText = t('demo');
  return (
    <div id="card" className="card">
      <div
        className={`w-full shadow-lg dark:shadow-none transition 
          duration-300 p-4 rounded-md border border-gray-200 bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 from-gray-50 to-gray-200`}
      >
        {cardType === 'portfolio' && (
          <div className="flex gap-4 w-full -top-8 -mb-2 relative">
            {images.map((image) => (
              <motion.div
                key={image}
                whileHover={{ scale: 1.2, transformOrigin: 'center center', zIndex: 10 }}
                whileTap={{ scale: 1.2, transformOrigin: 'center center', zIndex: 10 }}
                className="relative overflow-hidden w-40 h-24 md:w-80 md:h-48 rounded-md border border-gray-300 shadow-lg bg-gray-200 cursor-pointer"
              >
                <Image
                  alt={title}
                  src={image}
                  width={320}
                  height={200}
                  quality={100}
                  objectFit="cover"
                  objectPosition="center"
                  layout="intrinsic"
                  className="border border-white"
                />
              </motion.div>
            ))}
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between mb-2">
          <Link href={`/${cardType}/${slug}`} key={slug}>
            <h4 className="card-title bg-clip-text text-transparent dark:text-transparent bg-gradient-to-br from-gray-600 to-gray-900 dark:from-yellow-400  dark:to-yellow-600 p-0 m-0 cursor-pointer">
              {title}
            </h4>
          </Link>
          {!data && <div className="animate-spin"></div>}
          <div className="flex items-start gap-2 text-gray-500 text-left md:text-right mt-2 md:mt-0 min-w-4 text-sm">
            <p className="flex w-32 items-center gap-2 md:justify-end text-sm">
              {views ? `${new Number(views).toLocaleString()} ${viewsText}` : `0 ${viewsText}`}
              <Eye />
            </p>
          </div>
        </div>

        {techStack && (
          <p className="flex flex-wrap gap-2 items-center text-sm my-4">
            <Tool />
            {techStack.map((tech, i) => (
              <span key={i}>#{tech}</span>
            ))}
          </p>
        )}
        <p className="text-gray-700 dark:text-gray-300">{summary}</p>
        <div className="flex justify-between items-center mt-4">
          <button className="font-bold card-button border-none text-base text-left">
            <Link href={`/${cardType}/${slug}`} key={slug}>
              {readMore}
            </Link>
          </button>
          {github && (
            <div className="flex gap-4">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="text-sm flex items-center gap-2"
              >
                <Github size="sm" />
                <span className="hover:text-red-400 dark:hover:text-yellow-400 transition hidden sm:inline-block">
                  {githubText}
                </span>
              </a>
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="text-sm flex items-center gap-2"
              >
                <Live size="sm" />
                <span className="hover:text-red-400 dark:hover:text-yellow-400 transition hidden sm:inline-block">
                  {demoText}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
