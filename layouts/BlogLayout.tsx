import Container from '@components/Container';
import { ReactNode } from 'react';
import { ArticleMeta } from '@components/Sections/ArticleMeta';
import Link from 'next/link';

interface Props {
  frontMatter: any;
  children: ReactNode;
}

export default function BlogLayout({ children, frontMatter }: Props) {
  return (
    <Container
      title={`${frontMatter.title} – Uğur Emirmustafaoğlu`}
      description={frontMatter.description}
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
        {frontMatter.alternate !== '' && (
          <div className="mt-8 font-bold">
            <Link href={frontMatter.alternate} locale={frontMatter.locale === 'tr' ? 'en' : 'tr'}>
              {frontMatter.locale === 'tr' ? 'Read in English 🇺🇸' : 'Türkçe olarak oku 🇹🇷'}
            </Link>
          </div>
        )}
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
