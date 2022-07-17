import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'antd';

import Home from '../pages/Home';
import Console from '../pages/Console';
import Demo from '../pages/Demo';
import Parser from '../pages/Parser';

import './Content.scss';

const Content: FC = () => (
  <Layout.Content className="lvz-content">
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Console />} path="/console" />
      <Route element={<Demo />} path="/demo" />
      <Route element={<Parser />} path="/parser" />
    </Routes>
  </Layout.Content>
);

export default Content;
