import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'antd';

import Home from '../pages/Home';
import Console from '../pages/Console';

const Content: FC = () => (
  <Layout.Content className="lvz-content">
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Console />} path="/console" />
    </Routes>
  </Layout.Content>
);

export default Content;
