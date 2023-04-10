import { useRouter } from 'next/router';
import { Layout, Menu, Button } from 'antd';
import { useState, useMemo } from 'react';
import AuthModal from '@/components/AuthModal';
import styles from './Header.module.css';

const { Header: AntdHeader } = Layout;

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  const selectedKeys = useMemo(() => {
    const { pathname } = router;
    if (pathname.startsWith('/auth')) {
      return ['auth'];
    } else if (pathname === '/') {
      return ['home'];
    }
    return [];
  }, [router]);

  const items = [
    {
      key: 'home',
      label: 'Home',
    },
    {
      key: 'auth',
      label: 'Auth',
    },
  ];

  function handleMenuClick({ key }: { key: string }) {
    switch (key) {
      case 'home':
        router.push('/');
        break;
      case 'auth':
        router.push('/auth');
        break;
      default:
        break;
    }
  }

  return (
    <AntdHeader className={styles.header}>
      <Menu
        className={styles.menu}
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
      />
      <div className={styles.user}>
        <Button ghost onClick={() => setAuthModalOpen(true)}>
          Log in
        </Button>
        <AuthModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    </AntdHeader>
  );
}
