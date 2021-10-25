import type { AppProps } from 'next/app';
import '@styles/globals.scss';
import 'react-image-lightbox/style.css';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from '@context/AppContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default MyApp;
