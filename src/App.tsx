import React, { FC } from 'react';
import './App.css';

import { Layout } from 'antd';

import Header from './components/layouts/Header';
import Content from './components/layouts/Content';
import Footer from './components/layouts/Footer';

const App: FC = () => (
  <Layout className="App">
    <Header />
    <Content />
    <Footer />
  </Layout>
);

export default App;
