import { Github } from '@components/Svgs/Github';
import { Live } from '@components/Svgs/Live';
import { FormattedDate } from '@components/Utils/FormattedDate';
import ViewCounter from '@components/Utils/ViewCounter';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import me from '../../public/me.png';

interface Props {
  title: string;
  publishedAt: string;
  slug: string;
  readingTime: number;
  github?: string;
  demo?: string;
}

export const ArticleMeta = ({ title, publishedAt, slug, readingTime, github, demo }: Props) => {
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const readTime = t('readTime');
  const githubText = t('github');
  const demoText = t('demo');
  return (
    <>
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
        {title}
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-between items-flex-start sm:items-center w-full py-4">
        <div className="flex items-center justify-items-start gap-2">
          <Image
            alt="Uğur Emirmustafaoğlu"
            height={48}
            width={48}
            src={me}
            className="rounded-full"
            quality={25}
          />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {'Uğur Emirmustafaoğlu / '}
            <FormattedDate dateString={publishedAt} locale={locale} />
          </p>
        </div>
        <p className="text-sm text-gray-500 min-w-60 flex mt-8 sm:m-0">
          {Math.ceil(readingTime)} {readTime}
          {` • `}
          <ViewCounter slug={slug} />
        </p>
      </div>
      {github && (
        <div className="flex gap-4 my-4 flex-col sm:flex-row">
          <a href={github} target="_blank" rel="noreferrer">
            <button className="flex items-center gap-4 btn">
              <Github size="sm" />
              {githubText}
            </button>
          </a>
          <a href={demo} target="_blank" rel="noreferrer">
            <button className="flex items-center gap-4 btn">
              <Live size="sm" />
              {demoText}
            </button>
          </a>
        </div>
      )}
    </>
  );
};
