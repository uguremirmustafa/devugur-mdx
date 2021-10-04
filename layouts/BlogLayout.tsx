import Container from '@components/Container';
import { ReactNode } from 'react';
import { ArticleMeta } from '@components/Sections/ArticleMeta';
import Link from 'next/link';
import { TagIcon } from '@components/Svgs/Tag';
import { Tag } from '@components/Sections/Tag';
import { EmojiReactions } from '@components/Sections/Reactions';
import Chart from '@components/Sections/Reactions/Chart';

interface Props {
  frontMatter: any;
  children: ReactNode;
}

export default function BlogLayout({ children, frontMatter }: Props) {
  return (
    <Container
      title={`${frontMatter.title} – Uğur Emirmustafaoğlu`}
      description={frontMatter.summary}
      image={`https://devugur.com${frontMatter.image}`}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      date={frontMatter.publishedAt}
      type="article"
      alternate={frontMatter.alternate}
      contentType={frontMatter.type}
    >
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <ArticleMeta
          title={frontMatter.title}
          publishedAt={frontMatter.publishedAt}
          slug={frontMatter.slug}
          readingTime={frontMatter.readingTime.minutes}
        />
        <div className="flex gap-2 flex-wrap my-2 items-center">
          <TagIcon />
          {frontMatter.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        {frontMatter.alternate !== '' && (
          <div className="mt-8 font-bold">
            <Link href={frontMatter.alternate} locale={frontMatter.locale === 'tr' ? 'en' : 'tr'}>
              {frontMatter.locale === 'tr' ? 'Read in English 🇺🇸' : 'Türkçe olarak oku 🇹🇷'}
            </Link>
          </div>
        )}
        <div className="prose dark:prose-dark w-full">{children}</div>
        <Chart />
      </article>

      <EmojiReactions slug={frontMatter.slug} />
    </Container>
  );
}
