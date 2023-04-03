import '@/styles/globals.css';
import { Layout } from 'antd';
import Header from '@/components/Header';
import type { AppProps } from 'next/app';
import styles from './_app.module.css';

const { Content, Footer } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <Component {...pageProps} />
      </Content>
      <Footer className={styles.footer}>
        LiViz 2022 ~ 2023 - All Rights Reserved
      </Footer>
    </Layout>
  );
}
