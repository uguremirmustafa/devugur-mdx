import { FormattedDate } from '@components/Utils/FormattedDate';
import ViewCounter from '@components/Utils/ViewCounter';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  title: string;
  publishedAt: string;
  slug: string;
  readingTime: number;
}

export const ArticleMeta = ({ title, publishedAt, slug, readingTime }: Props) => {
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const readTime = t('readTime');
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
            src="/me.png"
            className="rounded-full"
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
    </>
  );
};
