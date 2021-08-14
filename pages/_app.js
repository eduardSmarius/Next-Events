import Head from 'next/head';
import { NotificationCtxProvider } from '../context/notification-context';

import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationCtxProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS Events' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationCtxProvider>
  );
}

export default MyApp;
