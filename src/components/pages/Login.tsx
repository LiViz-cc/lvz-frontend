/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import {
  Typography, Form, Input, Checkbox, Button, Tabs, Table, Tag,
  Select, Slider, Row, Col,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Column } = Table;

type User = {
  _id: {
    $oid: string
  },
  email: string,
};

const Login: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

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

  const signup = (values: any) => {
    axios
      .post(`${BACKEND_URL}/auth/signup`, values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Typography>
      <Title level={2}>Log In</Title>
      <Paragraph>
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
                name="login"
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
      </Paragraph>
      <Title level={2}>Sign Up</Title>
      <Form
        name="signup"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={signup}
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
    </Typography>
  );
};

export default Login;
