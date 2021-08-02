import Image from 'next/image';
import Container from '@components/Container';
import { ReactNode } from 'react';
import ViewCounter from '@components/Utils/ViewCounter';
import { FormattedDate } from '@components/Utils/FormattedDate';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { ArticleMeta } from '@components/Sections/ArticleMeta';
import Link from 'next/link';

// const editUrl = (slug) => `https://github.com/leerob/leerob.io/edit/main/data/blog/${slug}.mdx`;
// const discussUrl = (slug) =>
//   `https://mobile.twitter.com/search?q=${encodeURIComponent(`https://leerob.io/blog/${slug}`)}`;
interface Props {
  frontMatter: any;
  children: ReactNode;
}

export default function PortfolioLayout({ children, frontMatter }: Props) {
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const readTime = t('readTime');
  return (
    <Container
      title={`${frontMatter.title} – Lee Robinson`}
      description={frontMatter.summary}
      image={`https://devugur.com${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
      alternate={frontMatter.alternate}
      contentType={frontMatter.type}
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <ArticleMeta
          title={frontMatter.title}
          publishedAt={frontMatter.publishedAt}
          slug={frontMatter.slug}
          readingTime={frontMatter.readingTime.minutes}
        />
        <div className="flex flex-wrap gap-2 items-center text-sm font-semibold mt-2">
          <div>
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
          </div>

          <div className="flex flex-wrap gap-2">
            {frontMatter.techStack.map((tech, i) => (
              <span className="block" key={i}>
                #{tech}
              </span>
            ))}
          </div>
        </div>
        {frontMatter.alternate !== '' && (
          <div className="mt-8 font-bold">
            <Link href={frontMatter.alternate} locale={frontMatter.locale === 'tr' ? 'en' : 'tr'}>
              {frontMatter.locale === 'tr' ? 'Read in English 🇺🇸' : 'Türkçe olarak oku 🇹🇷'}
            </Link>
          </div>
        )}
        <div className="prose dark:prose-dark max-w-none w-full">{children}</div>
      </article>
    </Container>
  );
}
