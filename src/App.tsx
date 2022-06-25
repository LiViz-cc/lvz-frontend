import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import { Layout } from 'antd';

import Header from './components/layouts/Header';
import Content from './components/layouts/Content';
import Footer from './components/layouts/Footer';
import ProjectEdit from './components/pages/ProjectEdit';

const App: FC = () => (
  <Layout className="App">
    <Routes>
      <Route
        element={(
          <>
            <Header />
            <Content />
            <Footer />
          </>
        )}
        path="*"
      />
      <Route
        element={<ProjectEdit />}
        path="/projects/:id/edit"
      />
    </Routes>
  </Layout>
);

export default App;
