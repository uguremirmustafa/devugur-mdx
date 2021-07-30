import React from 'react';
import Container from '@components/Container';
import Head from 'next/head';
import { useRouter } from 'next/router';
interface Props {}

const NotFound = (props: Props) => {
  const { locale } = useRouter();

  return (
    <Container>
      <main className="max-w-2xl mx-auto h-full">
        <h2 className="text-center text-8xl">😿</h2>
        <h2 className="pb-80 pt-8 text-center">
          {locale === 'tr'
            ? 'Bu içerik Türkçe olarak bulunamadı!'
            : 'Sorry, this content is not available in English'}
        </h2>
      </main>
    </Container>
  );
};
export default NotFound;
