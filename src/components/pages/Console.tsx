import React, { FC, useState, useEffect } from 'react';
import {
  Layout, Menu, Card, Row, Col, message,
} from 'antd';
import { AppstoreOutlined, DatabaseOutlined, LineChartOutlined } from '@ant-design/icons';
import { sleep } from '../../utils';

const { Sider, Content } = Layout;

type MenuItemKey = 'project' | 'data_source' | 'display_schema';
type Project = {
  _id: {
    $oid: string
  },
  name: string,
  data_source: {
    $oid: string
  },
  display_schema: {
    $oid: string
  },
};

const mockProjects = Array.from(Array(10).keys()).map((id) => ({
  _id: { $oid: `mock_id_${id}` },
  name: `mock_project_${id}`,
  data_source: { $oid: '' },
  display_schema: { $oid: '' },
}));

const Console: FC = () => {
  const [itemSelected, setItemSelected] = useState<MenuItemKey>('project');
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // when `itemSelected` changed
  useEffect(() => {
    const fetchProjects = async () => {
      // TODO: fetch projects from backend api
      setLoading(true);
      // get mock data
      await sleep(500);
      const newProjects = mockProjects;
      setProjects(newProjects);
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
          defaultSelectedKeys={['project']}
          style={{ height: '100%' }}
          onClick={handleMenuItemClick}
        >
          <Menu.Item key="project" icon={<AppstoreOutlined />}>Project</Menu.Item>
          <Menu.Item key="data_source" icon={<DatabaseOutlined />}>Data Source</Menu.Item>
          <Menu.Item key="display_schema" icon={<LineChartOutlined />}>Display Schema</Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px' }}>
        <div>
          <Row gutter={[16, 16]}>
            {
              // TODO: support dataSources and displaySchemas
              projects.map((project) => (
                // eslint-disable-next-line no-underscore-dangle
                <Col key={project._id.$oid} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
                  <Card
                    bordered={false}
                    hoverable
                    loading={loading}
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => console.log(project._id.$oid)}
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
