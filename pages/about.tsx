import Container from '@components/Container';
import fs from 'fs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import BlurImage from '@components/Utils/BlurImage';
import { getRouteImageMeta } from '@utils/image-api';
interface Props {
  imgMeta: any;
}

const About = ({ imgMeta }: Props) => {
  const { locale } = useRouter();
  const { t } = useTranslation('about');
  const title = t('title');
  const about1 = t('about1');
  const about2 = t('about2');
  const about3 = t('about3');
  const about4 = t('about4');
  const metaTitle = t('meta-title');
  const metaDescription = t('meta-description');

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
            <div className="mb-4">
              {/* <Image
                src="/me.png"
                width={180}
                height={180}
                alt="Uğur Emirmustafaoğlu"
                className="rounded-full w-full"
              /> */}
              <BlurImage alt="ugur emir" {...imgMeta['me.png']} className="rounded-full" />
            </div>
            <p className="col-span-3 md:col-span-2">{about1}</p>
          </div>
          <p>{about2}</p>
          <p>{about3}</p>
          <p>{about4}</p>
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
