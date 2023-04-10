import { useLogin } from '@/services/auth';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onClose: () => void;
};

export default function LoginForm({ onClose }: LoginFormProps) {
  const login = useLogin();
  const [loginForm] = Form.useForm<LoginFormData>();

  async function handleLoginSubmit(data: LoginFormData) {
    const { email, password } = data;
    try {
      await login.trigger({ email, password });
      message.success('Login successful');
      loginForm.resetFields();
      onClose();
    } catch (error) {
      message.error('Login failed');
      console.error(error);
    }
  }

  return (
    <Form
      form={loginForm}
      name="login-form"
      validateTrigger={['onSubmit', 'onBlur']}
      onFinish={handleLoginSubmit}
      layout="vertical"
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email.' },
          { type: 'email', message: 'Please input a valid email.' },
        ]}
      >
        <Input
          placeholder="Email"
          prefix={<MailOutlined />}
          type="email"
          autoComplete="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password.' },
          { min: 6, message: 'Password must be at least 6 characters.' },
          { max: 32, message: 'Password must be at most 32 characters.' },
        ]}
      >
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={login.isMutating}
          style={{ width: '100%' }}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}
