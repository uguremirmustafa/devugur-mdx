import React, { useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '@lib/fetcher';
import useTranslation from 'next-translate/useTranslation';
import { Tool } from '@components/Svgs/Tool';
import { gsap } from 'gsap';
import { Eye } from '@components/Svgs/Eye';

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
export const Card = ({ summary, slug, title, cardType, techStack, tags }: Props) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);
  const { t } = useTranslation('common');
  const viewsText = t('views');

  //animation
  const t1 = gsap.timeline();
  useEffect(() => {
    t1.fromTo(
      '#border',
      { borderColor: "random(['#F87171','#FBBF24'])" },
      {
        borderColor: "random(['#F87171','#FBBF24'])",
        repeat: -1,
        duration: 1,
        yoyoEase: 'ease',
      }
    );
  }, []);

  return (
    <div className="card">
      <Link href={`/${cardType}/${slug}`} key={slug}>
        <a className="w-full">
          <div
            id="border"
            className={`w-full shadow-lg hover:shadow-xl dark:shadow-none transition duration-300 p-4 rounded-md border border-gray-200 dark:bg-gray-800`}
          >
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className=" text-gray-900 dark:text-gray-100 p-0 m-0 w-full">{title}</h4>{' '}
              {!data && <div className="animate-spin"></div>}
              <p className="flex items-start gap-2 text-gray-500 text-left md:text-right mt-2 md:mt-0 min-w-4 text-sm">
                <p className="flex w-32 items-center gap-2 justify-end text-sm">
                  {views ? `${new Number(views).toLocaleString()} ${viewsText}` : `0 ${viewsText}`}
                  <Eye />
                </p>
              </p>
            </div>
            {techStack && (
              <p className="flex flex-wrap gap-2 items-center text-sm my-4">
                <Tool />
                {techStack.map((tech, i) => (
                  <span key={i}>#{tech}</span>
                ))}
              </p>
            )}
            <p className="text-gray-600 dark:text-gray-300">{summary}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};
