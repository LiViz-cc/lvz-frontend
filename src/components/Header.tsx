import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import { useMemo } from 'react';

const { Header: AntdHeader } = Layout;

export default function Header() {
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
    <AntdHeader>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
      />
    </AntdHeader>
  );
}
