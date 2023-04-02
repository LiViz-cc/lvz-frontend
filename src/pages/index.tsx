import Head from 'next/head';
import styles from './index.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>LiViz</title>
        <meta name="description" content="LiViz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>Hello world!</main>
    </>
  );
}
