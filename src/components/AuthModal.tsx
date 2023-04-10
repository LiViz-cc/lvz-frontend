import { useState } from 'react';
import { Typography, Modal } from 'antd';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

type AuthModalMode = 'login' | 'signup';

const AUTH_MODAL_TITLE: Record<AuthModalMode, string> = {
  login: 'Log in',
  signup: 'Sign up',
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthModalMode>('login');

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={360}>
      <Typography.Title level={2}>{AUTH_MODAL_TITLE[mode]}</Typography.Title>
      {mode === 'login' && (
        <>
          <LoginForm onClose={onClose} />
          <Typography.Text>
            Do not have an account?{' '}
            <Typography.Link onClick={() => setMode('signup')}>
              Sign up
            </Typography.Link>
          </Typography.Text>
        </>
      )}
      {mode === 'signup' && (
        <>
          <SignupForm onClose={onClose} />
          <Typography.Text>
            Already have an account?{' '}
            <Typography.Link onClick={() => setMode('login')}>
              Log in
            </Typography.Link>
          </Typography.Text>
        </>
      )}
    </Modal>
  );
}
