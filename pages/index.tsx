import { Hero } from '@components/Sections/Hero';
import Container from '@components/Container';
import useTranslation from 'next-translate/useTranslation';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { ListTitle } from '@components/Sections/ListTitle';
import { Card } from '@components/Sections/Card';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Index = ({ posts, projects }) => {
  const { t } = useTranslation('home');

  // gsap
  const t1 = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    t1.from('#cards', {
      scrollTrigger: {
        trigger: '#cards',
        start: 'top 80%',
        scrub: true,
      },
      opacity: 0.4,
      stagger: 0.2,
      duration: 0.7,
    });
  }, []);
  return (
    <Container title={t('title')} description={t('description')}>
      <Hero />
      {projects.length > 0 && <ListTitle title={t('highlightedProjects')} />}
      <div id="cards" className="flex flex-col gap-4 w-full">
        {projects.map((frontMatter) => (
          <Card key={frontMatter.slug} {...frontMatter} cardType="portfolio" />
        ))}
      </div>

      {posts.length > 0 && <ListTitle title={t('highlightedPosts')} />}
      <div id="cards" className="flex flex-col gap-4 w-full mb-8">
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
