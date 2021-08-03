import type { AppProps /*, AppContext */ } from 'next/app';
import '@styles/globals.scss';
import 'react-image-lightbox/style.css';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import Transition from '@components/Transition';
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Transition location={router.locale}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Transition>
  );
}

export default MyApp;
