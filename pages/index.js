import Head from 'next/head'
import Header from '@components/Header'
import Island from '@components/Island'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chris</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Island/>
      </main>

    </div>
  )
}
