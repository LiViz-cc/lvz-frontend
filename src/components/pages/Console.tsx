import React, { FC, useState, useEffect } from 'react';
import { Layout, Menu, message } from 'antd';
import { AppstoreOutlined, DatabaseOutlined, LineChartOutlined } from '@ant-design/icons';
import type { Project } from '../../models';
import { getProjects } from '../../api/projects';
import ProjectsGrid from '../common/ProjectsGrid';

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
        })
        .finally(() => {
          setLoading(false);
        });
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
        {
          // TODO: support dataSources and displaySchemas
          itemSelected === 'project' && <ProjectsGrid projects={projects} loading={loading} />
        }
      </Content>
    </Layout>
  );
};

export default Console;
