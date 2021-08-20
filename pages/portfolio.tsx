import Container from '@components/Container';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Card } from '@components/Sections/Card';

export default function Blog({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('portfolio');
  const title = t('title');
  const subTitle = t('subTitle');
  const description = t('description');
  return (
    <Container title={`${title} - Uğur Emirmustafaoğlu`} description={description}>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-16 mt-8 text-black dark:text-white">
          {subTitle}
        </h3>

        <div className="flex flex-col gap-4 w-full">
          {projects.map((frontMatter) => (
            <Card key={frontMatter.slug} {...frontMatter} cardType="portfolio" />
          ))}
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => {
  const projects = await getAllFilesFrontMatter('projects', locale);

  return { props: { projects } };
};
