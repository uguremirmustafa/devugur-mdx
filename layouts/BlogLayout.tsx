import Image from 'next/image';
import { parseISO, format } from 'date-fns';

import Container from '@components/Container';
import { ReactNode } from 'react';
// import Subscribe from '@/components/Subscribe';
import ViewCounter from '@components/Utils/ViewCounter';
import { FormattedDate } from '@components/Utils/FormattedDate';
import { useRouter } from 'next/router';

// const editUrl = (slug) => `https://github.com/leerob/leerob.io/edit/main/data/blog/${slug}.mdx`;
// const discussUrl = (slug) =>
//   `https://mobile.twitter.com/search?q=${encodeURIComponent(`https://leerob.io/blog/${slug}`)}`;
interface Props {
  frontMatter: any;
  children: ReactNode;
}

export default function BlogLayout({ children, frontMatter }: Props) {
  const { locale } = useRouter();
  console.log(locale);

  return (
    <Container
      title={`${frontMatter.title} – Lee Robinson`}
      description={frontMatter.description}
      image={`https://devugur.com${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center w-full py-4">
          <div className="flex items-center justify-center gap-2">
            <Image
              alt="Uğur Emirmustafaoğlu"
              height={48}
              width={48}
              src="/me.png"
              className="rounded-full"
            />

            <p className="text-sm text-gray-700 dark:text-gray-300 ml-8">
              {frontMatter.by}
              {'Uğur Emirmustafaoğlu / '}
              <FormattedDate dateString={frontMatter.publishedAt} locale={locale} />
            </p>
          </div>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0 flex">
            {frontMatter.readingTime.text}
            {` • `}
            {/* <ViewCounter slug={frontMatter.slug} /> */}
          </p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">{children}</div>
      </article>
    </Container>
  );
}
