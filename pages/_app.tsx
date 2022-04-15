import type { AppProps } from 'next/app'
import Head from 'next/head'
import GoogleAnalytics from '@components/googel-analytics'
import '@styles/global.scss'

const isProduction = process.env.NODE_ENV === 'production'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>clarins</title>
      </Head>
      <Component {...pageProps} />
      {/* google analytics */}
      <GoogleAnalytics />
    </>
  )
}

export default MyApp
