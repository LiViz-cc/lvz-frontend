import Head from 'next/head';
import { useLogin } from '@/services/auth';
import { Typography, Layout, Button, Form, Input, message } from 'antd';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Auth() {
  const {
    login,
    data: loginData,
    error: loginError,
    isMutating: processingLogin,
  } = useLogin();
  const [loginForm] = Form.useForm<LoginFormData>();

  async function handleLoginSubmit(data: LoginFormData) {
    const { email, password } = data;
    try {
      await login(email, password);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
      console.error(error);
    }
  }

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
            <Typography.Title level={2}>Login</Typography.Title>
            <Form
              form={loginForm}
              name="login-form"
              onFinish={handleLoginSubmit}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={processingLogin}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Typography.Text>
              <Typography.Title level={3}>loginData</Typography.Title>
              {JSON.stringify(loginData, null, 2)}
            </Typography.Text>
            <Typography.Text>
              <Typography.Title level={3}>loginError</Typography.Title>
              {JSON.stringify(loginError, null, 2)}
            </Typography.Text>
          </section>
        </main>
      </Layout>
    </>
  );
}
