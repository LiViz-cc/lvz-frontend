/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Layout, Menu, Modal, Form, Button, Typography, Input,
} from 'antd';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const { Title, Paragraph } = Typography;

type User = {
  _id: {
    $oid: string
  },
  email: string,
};

const Header: FC = () => {
  // header menu current selected key
  const [current, setCurrent] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const login = (values: any) => {
    axios
      .post(`${BACKEND_URL}/auth/login`, values)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    } else if (pathname.startsWith('/login')) {
      setCurrent('login');
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
        className="nav"
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
      >
        <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="console"><Link to="/console">Console</Link></Menu.Item>
        <Menu.Item key="demo"><Link to="/demo">Demo</Link></Menu.Item>
        <Menu.Item key="parser"><Link to="/parser">Parser</Link></Menu.Item>
      </Menu>
      <div className="user-zone">
        <Button type="primary" onClick={showModal} style={{ display: 'inline' }}>
          Login
        </Button>
      </div>
      <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Title level={2}>Log In</Title>
        {
            user
              ? (
                <div>
                  <p>
                    {`Welcome ${user.email}!`}
                  </p>
                  <p>
                    {`User id: ${user._id.$oid}`}
                  </p>
                </div>
              )
              : (
                <Form
                  name=""
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={login}
                  autoComplete="off"
                  style={{ width: '400px' }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email address!' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              )
          }
      </Modal>
    </Layout.Header>
  );
};

export default Header;
