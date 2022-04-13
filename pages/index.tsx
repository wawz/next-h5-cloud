import type { NextPage } from 'next'
import Head from 'next/head'
import HomePage from '../components/home-page'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>h5-next-template</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomePage />
    </div>
  )
}

export default Home
