import React, { FC, useState, useEffect } from 'react';
import {
  Layout, Menu, Card, Row, Col, message,
} from 'antd';
import { AppstoreOutlined, DatabaseOutlined, LineChartOutlined } from '@ant-design/icons';
import type { Project } from '../../models';
import { getProjects } from '../../api/projects';

const { Sider, Content } = Layout;

type MenuItemKey = 'project' | 'data_source' | 'display_schema';

const Console: FC = () => {
  const [itemSelected, setItemSelected] = useState<MenuItemKey>('project');
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // when `itemSelected` changed
  useEffect(() => {
    const fetchProjects = () => {
      setLoading(true);
      getProjects()
        .then((response) => {
          const newProjects = response.data;
          setProjects(newProjects);
        })
        .catch((error) => {
          const errorData = error?.response?.data;
          message.error(errorData);
          console.log(errorData);
        });
      setLoading(false);
    };
    const fetchDataSources = () => {
      // TODO: fetch data sources from backend api
      message.warning('NOT IMPLEMENTED');
    };
    const fetchDisplaySchemas = () => {
      // TODO: fetch display schemas from backend api
      message.warning('NOT IMPLEMENTED');
    };

    switch (itemSelected) {
      case 'project':
        fetchProjects();
        break;
      case 'data_source':
        fetchDataSources();
        break;
      case 'display_schema':
        fetchDisplaySchemas();
        break;
      default:
        break;
    }
  }, [itemSelected]);

  const menuItems = [
    { label: 'Project', key: 'project', icon: <AppstoreOutlined /> },
    { label: 'Data Source', key: 'data_source', icon: <DatabaseOutlined /> },
    { label: 'Display Schema', key: 'display_schema', icon: <LineChartOutlined /> },
  ];

  const handleMenuItemClick = ({ key }: { key: string }) => {
    if (['project', 'data_source', 'display_schema'].includes(key)) {
      setItemSelected(key as MenuItemKey);
    }
  };

  return (
    <Layout>
      <Sider>
        <Menu
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={['project']}
          style={{ height: '100%' }}
          onClick={handleMenuItemClick}
        />
      </Sider>
      <Content style={{ padding: '0 24px' }}>
        <div>
          <Row gutter={[16, 16]}>
            {
              // TODO: support dataSources and displaySchemas
              projects.map((project) => (
                <Col key={project.id} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
                  <Card
                    bordered={false}
                    hoverable
                    loading={loading}
                    onClick={() => console.log(project.id)}
                  >
                    <Card.Meta
                      title={project.name}
                      description={project.name}
                    />
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Console;
