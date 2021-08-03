import type { AppProps /*, AppContext */ } from 'next/app';
import '@styles/globals.scss';
import 'react-image-lightbox/style.css';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
