import Head from 'next/head';
import { useState } from 'react';
import { Layout, Button } from 'antd';
import AuthModal from '@/components/AuthModal';

export default function Auth() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>LiViz</title>
        <meta name="description" content="LiViz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <section>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <AuthModal open={open} onClose={() => setOpen(false)} />
          </section>
        </main>
      </Layout>
    </>
  );
}
