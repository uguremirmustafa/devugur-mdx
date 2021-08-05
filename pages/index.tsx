import { Hero } from '@components/Sections/Hero';
import Container from '@components/Container';
import useTranslation from 'next-translate/useTranslation';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { ListTitle } from '@components/Sections/ListTitle';
import { Card } from '@components/Sections/Card';

const Index = ({ posts, projects }) => {
  const { t } = useTranslation('home');

  return (
    <Container title={t('title')} description={t('description')}>
      <Hero />
      {projects.length > 0 && <ListTitle title={t('highlightedProjects')} />}
      <div className="flex flex-col gap-4 w-full">
        {projects.map((frontMatter) => (
          <Card key={frontMatter.slug} {...frontMatter} cardType="portfolio" />
        ))}
      </div>

      {posts.length > 0 && <ListTitle title={t('highlightedPosts')} />}
      <div className="flex flex-col gap-4 w-full mb-8">
        {posts.map((frontMatter) => (
          <Card key={frontMatter.slug} {...frontMatter} cardType="blog" />
        ))}
      </div>
    </Container>
  );
};
export default Index;

export const getStaticProps = async ({ locale }) => {
  const posts = await getAllFilesFrontMatter('blog', locale, true);
  const projects = await getAllFilesFrontMatter('projects', locale, true);
  return { props: { posts, projects } };
};
