import type { AppProps /*, AppContext */ } from 'next/app';
import '@styles/globals.scss';
import 'react-image-lightbox/style.css';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </AnimatePresence>
  );
}

export default MyApp;
