import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const Header: FC = () => {
  // header menu current selected key
  const [current, setCurrent] = useState('');

  // align header menu selected key with url path
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    if (pathname.startsWith('/console')) {
      setCurrent('console');
    } else if (pathname.startsWith('/demo')) {
      setCurrent('demo');
    } else if (pathname.startsWith('/parser')) {
      setCurrent('parser');
    } else if (pathname.startsWith('/')) {
      setCurrent('home');
    }
  }, [location.pathname]);

  return (
    <Layout.Header className="lvz-header">
      <div className="logo">
        LiViz
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
      >
        <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="console"><Link to="/console">Console</Link></Menu.Item>
        <Menu.Item key="demo"><Link to="/demo">Demo</Link></Menu.Item>
        <Menu.Item key="parser"><Link to="/parser">Parser</Link></Menu.Item>
        <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
