import Container from '@components/Container';
import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import BlurImage from '@components/Utils/BlurImage';
import { getRouteImageMeta } from '@utils/image-api';
import gsap from 'gsap';
interface Props {
  imgMeta: any;
}

const About = ({ imgMeta }: Props) => {
  const { t } = useTranslation('about');
  const title = t('title');
  const about1 = t('about1');
  const about2 = t('about2');
  const about3 = t('about3');
  const about4 = t('about4');
  const metaTitle = t('meta-title');
  const metaDescription = t('meta-description');

  const t1 = gsap.timeline();
  const t2 = gsap.timeline();

  useEffect(() => {
    t1.from('.image', {
      opacity: 0,
      duration: 1,
    });
    t2.from('.about', {
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'easeOut',
    });
  }, []);

  return (
    <Container
      title={metaTitle}
      description={metaDescription}
      image={`https://devugur.com/static/images/me.png`}
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>
        <div className="mb-8 leading-6 text-gray-600 dark:text-gray-400 flex flex-col gap-2">
          <div className="grid grid-cols-3 md:gap-8">
            <div className="mb-4 image">
              <BlurImage alt="Uğur Emirmustafaoğlu" {...imgMeta['me.png']} className="pt-2" />
            </div>
            <p className="col-span-3 md:col-span-2 about">{about1}</p>
          </div>
          <p className="about">{about2}</p>
          <p className="about">{about3}</p>
          <p className="about">{about4}</p>
        </div>
      </div>
    </Container>
  );
};

export default About;

export async function getStaticProps() {
  const imgMeta = await getRouteImageMeta('about', true);

  return { props: { imgMeta } };
}
