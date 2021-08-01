import { Hero } from '@components/Sections/Hero';
import Container from '@components/Container';
import useTranslation from 'next-translate/useTranslation';
const Index = () => {
  const { t } = useTranslation('home');
  return (
    <Container title={t('title')} description={t('description')}>
      <Hero />
    </Container>
  );
};
export default Index;
