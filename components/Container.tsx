import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from 'layouts/Navbar';
export default function Container(props: any) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Uğur Emirmustafaoğlu - Frontend Developer, blogger, ex lawyer.',
    description: `Front-end developer, JavaScript enthusiast, and course creator.`,
    image: 'https://devugur.com/static/images/me.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <div className="bg-white dark:bg-gray-900 ">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://devugur.com${router.asPath}`} />
        <link rel="canonical" href={`https://devugur.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Lee Robinson" />
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

      <Navbar />
      <main id="skip" className="flex flex-col justify-center px-8 bg-white dark:bg-gray-900 pt-8">
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  );
}
