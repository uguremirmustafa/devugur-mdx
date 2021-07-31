import React from 'react';
import Container from '@components/Container';
import Head from 'next/head';
import { useRouter } from 'next/router';
interface Props {}

const NotFound = (props: Props) => {
  const { locale, back } = useRouter();

  return (
    <Container>
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
