// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import '@styles/globals.scss';
import 'react-image-lightbox/style.css';
import { ThemeProvider } from 'next-themes';
// import { MDXProvider } from '@mdx-js/react';
// import MDXComponents from '@components/Utils/MDXComponents';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      {/* <MDXProvider components={MDXComponents}> */}
      <Component {...pageProps} />
      {/* </MDXProvider> */}
    </ThemeProvider>
  );
}

export default MyApp;
