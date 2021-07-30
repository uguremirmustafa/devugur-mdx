import Image from 'next/image';
import Container from '@components/Container';
import { ReactNode } from 'react';
// import Subscribe from '@/components/Subscribe';
import ViewCounter from '@components/Utils/ViewCounter';
import { FormattedDate } from '@components/Utils/FormattedDate';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { ArticleMeta } from '@components/Sections/ArticleMeta';
// const editUrl = (slug) => `https://github.com/leerob/leerob.io/edit/main/data/blog/${slug}.mdx`;
// const discussUrl = (slug) =>
//   `https://mobile.twitter.com/search?q=${encodeURIComponent(`https://leerob.io/blog/${slug}`)}`;
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
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <ArticleMeta
          title={frontMatter.title}
          publishedAt={frontMatter.publishedAt}
          slug={frontMatter.slug}
          readingTime={frontMatter.readingTime.minutes}
        />
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
