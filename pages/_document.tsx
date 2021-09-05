/** @format */

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <meta
            name="description"
            content="This is my personal website where I share my knowledge and experience about software development, linux and web development."
          />
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <link rel="apple-touch-icon" sizes="57x57" href="/assets/apple-icon-57x57.png"></link>
          <link rel="apple-touch-icon" sizes="60x60" href="/assets/apple-icon-60x60.png"></link>
          <link rel="apple-touch-icon" sizes="72x72" href="/assets/apple-icon-72x72.png"></link>
          <link rel="apple-touch-icon" sizes="76x76" href="/assets/apple-icon-76x76.png"></link>
          <link rel="apple-touch-icon" sizes="114x114" href="/assets/apple-icon-114x114.png"></link>
          <link rel="apple-touch-icon" sizes="120x120" href="/assets/apple-icon-120x120.png"></link>
          <link rel="apple-touch-icon" sizes="144x144" href="/assets/apple-icon-144x144.png"></link>
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/apple-icon-152x152.png"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-icon-180x180.png"></link>
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/assets/android-icon-192x192.png"
          ></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96x96.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png"></link>
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff"></meta>
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
          <meta name="theme-color" content="#ffffff"></meta>
          <link
            rel="preload"
            href="/fonts/ubuntu-v15-latin-ext-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/ubuntu-v15-latin-ext-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/ubuntu-v15-latin-ext-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/sriracha-v5-latin-ext-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceCodePro/source-code-pro-v14-latin-ext-600.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <canvas id="body" className="fixed top-0 left-0 w-screen h-screen"></canvas>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
