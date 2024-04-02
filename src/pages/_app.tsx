import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import "@/css/satoshi.css";
import "@/css/style.css";
import DefaultLayout from '@/components/Layouts/DefaultLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;