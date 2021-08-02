import React, { useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '@lib/fetcher';

import useTranslation from 'next-translate/useTranslation';
import { Tool } from '@components/Svgs/Tool';
interface Props {
  files: string[];
  publishedAt: string;
  title: string;
  summary: string;
  image: string;
  techStack?: string[];
  tags?: string[];
  locale: string;
  isPublished: boolean;
  slug: string;
  key: string;
  cardType: string;
}
export const Card = ({ summary, slug, title, cardType, techStack }: Props) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);
  const { t } = useTranslation('common');
  const viewsText = t('views');

  return (
    <div className="card">
      <Link href={`/${cardType}/${slug}`} key={slug}>
        <a className="w-full">
          <div className="w-full md:shadow-sm md:hover:shadow-xl transition duration-300 p-4 rounded-md border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className=" text-gray-900 dark:text-gray-100 p-0 m-0 w-full">{title}</h4>
              <p className="text-gray-500 text-left md:text-right mt-2 md:mt-0 min-w-4 text-sm">
                {!data && <div className="animate-spin"></div>}
                {`${views ? new Number(views).toLocaleString() : '–––'} ${viewsText}`}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{summary}</p>
            {techStack && (
              <p className="flex flex-wrap gap-2 items-center text-sm mt-2">
                <Tool />
                {techStack.map((tech, i) => (
                  <span key={i}>#{tech}</span>
                ))}
              </p>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};
