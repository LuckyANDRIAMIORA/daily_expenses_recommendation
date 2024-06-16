import { SessionProvider } from 'next-auth/react';
import './../globals.css';
import  Head  from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <Head>
        <title>
          DER
        </title>
      </Head>
    </SessionProvider>

  );
}
