import { useSignup } from '@/services/auth';
import { Button, Form, Input, Checkbox, message } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

type SignupFormData = {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

type SignupFormProps = {
  onClose: () => void;
};

export default function SignupForm({ onClose }: SignupFormProps) {
  const signup = useSignup();
  const [signupForm] = Form.useForm<SignupFormData>();

  async function handleSignupSubmit(data: SignupFormData) {
    const { email, username, password } = data;
    try {
      await signup.trigger({ email, username, password });
      message.success('Signup successful');
      signupForm.resetFields();
      onClose();
    } catch (error) {
      message.error('Signup failed');
      console.error(error);
    }
  }

  return (
    <Form
      form={signupForm}
      name="signup-form"
      validateTrigger={['onSubmit', 'onBlur']}
      onFinish={handleSignupSubmit}
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
        name="username"
        rules={[{ required: true, message: 'Please input your username.' }]}
      >
        <Input
          placeholder="Username"
          prefix={<UserOutlined />}
          autoComplete="username"
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
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item
        name="passwordConfirmation"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please input your password again.',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match.')
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm Password"
          prefix={<LockOutlined />}
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      'Please read and accept the agreement before signup.'
                    )
                  ),
          },
        ]}
      >
        <Checkbox>
          I have read and accepted the <a href="">agreement</a>.
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={signup.isMutating}
          style={{ width: '100%' }}
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
}
