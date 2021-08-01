import React from 'react';
import Container from '@components/Container';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
interface Props {}

const NotFound = ({}: Props) => {
  const { locale, back } = useRouter();
  const { t } = useTranslation('404');
  return (
    <Container
      title={t('title')}
      description={t('description')}
      image={`https://devugur.com/static/images/me.png`}
      date={new Date().toISOString()}
      type="404"
      alternate=""
      contentType="404"
    >
      <main className="max-w-2xl mx-auto h-full flex flex-col items-center">
        <h2 className="text-center text-8xl">😿</h2>
        <h2 className="pb-20 pt-8 text-center">
          {locale === 'tr'
            ? 'Bu içerik Türkçe olarak bulunamadı!'
            : 'Sorry, this content is not available in English'}
        </h2>
        <button onClick={() => back()} className="mb-40 text-2xl font-bold">
          {locale === 'tr' ? '👈🏻 İngilizce metne geri dön' : '👈🏻 Turn back to Turkish version'}
        </button>
      </main>
    </Container>
  );
};
export default NotFound;
