import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from 'layouts/Navbar';
import { Footer } from 'layouts/Footer';
import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';

interface Props {
  children: ReactNode;
  title: string;
  description: string;
  image?: string;
  date?: string;
  type?: string;
  alternate?: string;
  contentType?: string;
}

export default function Container(props: Props) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Uğur Emirmustafaoğlu - Frontend Developer, blogger, ex lawyer.',
    description: `Front-end developer, open source enthusiast and Linux fan.`,
    image: 'https://devugur.com/static/images/me.png',
    type: 'website',
    ...customMeta,
  };
  // console.log(customMeta.contentType);
  const t1 = gsap.timeline();
  useEffect(() => {
    t1.from('.card', {
      scrollTrigger: {
        trigger: '.card',
        start: 'top center',
      },
      opacity: 0,
      stagger: 0.25,
      duration: 1,
    });
  }, []);
  return (
    <div className="bg-white dark:bg-gray-900 ">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://devugur.com${router.asPath}`} />
        <link rel="canonical" href={`https://devugur.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Uğur Emirmustafaoğlu" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@uguremirmustafa" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>

      <Navbar
        alternate={customMeta.alternate ? customMeta.alternate : ''}
        contentType={customMeta.contentType}
      />
      <main
        id="skip"
        className="flex flex-col justify-center px-6 bg-white dark:bg-gray-900 py-8 max-w-2xl w-full mx-auto"
      >
        {children}
        <Footer
          alternate={customMeta.alternate ? customMeta.alternate : ''}
          contentType={customMeta.contentType}
        />
      </main>
    </div>
  );
}
