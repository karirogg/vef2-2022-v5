import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import ThemeProvider from './_theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
