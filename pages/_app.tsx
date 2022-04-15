import type { AppProps } from 'next/app'
import Head from 'next/head'
import GoogleAnalytics from '@components/googel-analytics';


import '@styles/global.scss';

const isProduction = process.env.NODE_ENV === 'production'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* google analytics */}
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
