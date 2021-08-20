import Container from '@components/Container';
import { ReactNode } from 'react';
import { ArticleMeta } from '@components/Sections/ArticleMeta';
import Link from 'next/link';
import { Tool } from '@components/Svgs/Tool';
import { Github } from '@components/Svgs/Github';
import { Live } from '@components/Svgs/Live';

interface Props {
  frontMatter: any;
  children: ReactNode;
}

export default function PortfolioLayout({ children, frontMatter }: Props) {
  return (
    <Container
      title={`${frontMatter.title} – Uğur Emirmustafaoğlu`}
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
          github={frontMatter.github}
          demo={frontMatter.demo}
        />
        <div className="flex flex-wrap gap-2 items-center text-sm font-semibold mt-2">
          <Tool />

          {frontMatter.techStack.map((tech, i) => (
            <span className="text-sm" key={i}>
              #{tech}
            </span>
          ))}
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
