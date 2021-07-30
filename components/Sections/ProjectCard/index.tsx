import React from 'react';
import Link from 'next/link';
import fetcher from '@lib/fetcher';
import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';
interface Props {
  title: string;
  summary: string;
  slug: string;
  techStack?: string[];
}

export const ProjectCard = ({ summary, slug, title, techStack }: Props) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);
  const { t } = useTranslation('common');
  const viewsText = t('views');
  return (
    <Link href={`/portfolio/${slug}`} key={slug}>
      <a className="w-full">
        <div className="w-full md:shadow-sm md:hover:shadow-xl transition duration-300 md:p-4 md:rounded-md md:border md:border-gray-200">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-xl font-medium mb-1 md:mb-2 w-full text-gray-900 dark:text-gray-100">
              {title}
            </h4>
            <p className="text-gray-500 text-left md:text-right min-w-32 mb-4 md:mb-0">
              {`${views ? new Number(views).toLocaleString() : '–––'} ${viewsText}`}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
          <p className="flex gap-2 items-center text-sm mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5.33 3.271a3.5 3.5 0 0 1 4.472 4.474L20.647 18.59l-2.122 2.121L7.68 9.867a3.5 3.5 0 0 1-4.472-4.474L5.444 7.63a1.5 1.5 0 1 0 2.121-2.121L5.329 3.27zm10.367 1.884l3.182-1.768 1.414 1.414-1.768 3.182-1.768.354-2.12 2.121-1.415-1.414 2.121-2.121.354-1.768zm-7.071 7.778l2.121 2.122-4.95 4.95A1.5 1.5 0 0 1 3.58 17.99l.097-.107 4.95-4.95z" />
            </svg>
            {techStack.map((tech, i) => (
              <span key={i}>#{tech}</span>
            ))}
          </p>
        </div>
      </a>
    </Link>
  );
};
