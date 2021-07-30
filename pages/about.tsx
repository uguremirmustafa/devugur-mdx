import Container from '@components/Container';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
interface Props {}

const About = (props: Props) => {
  const { locale } = useRouter();
  const { t } = useTranslation('about');
  const title = t('title');
  const about1 = t('about1');
  const about2 = t('about2');
  const about3 = t('about3');
  const about4 = t('about4');

  return (
    <Container title="About – Lee Robinson">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>
        <div className="mb-8 leading-6 text-gray-600 dark:text-gray-400 flex flex-col gap-2">
          <div className="grid grid-cols-3 md:gap-8">
            <div className="mb-4">
              <Image
                src="/me.png"
                width={180}
                height={180}
                alt="Uğur Emirmustafaoğlu"
                className="rounded-full w-full"
              />
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
