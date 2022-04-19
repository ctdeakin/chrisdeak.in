import Island from '@components/Island';
import Head from 'next/head';
import Card from '@components/Card'


export default function Home() {


  return (
    <>
      <Head>
        <title>Chris</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card>
      <Island />
      </Card>
      
    </>
  );
}
