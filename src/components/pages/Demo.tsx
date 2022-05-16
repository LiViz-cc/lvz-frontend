/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import {
  Typography, Form, Input, Checkbox, Button, Tabs, Table,
} from 'antd';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Column } = Table;

type User = {
  _id: {
    $oid: string
  },
  email: string,
};

type DataSource = {
  _id: {
    $oid: string
  },
  name: string,
  static_data: string,
};

type DisplaySchema = {
  _id: {
    $oid: string
  },
  name: string,
  echarts_option: string,
};

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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Demo: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [publicDataSourceList, setPublicDataSourceList] = useState<DataSource[]>([]);
  const [privateDataSourceList, setPrivateDataSourceList] = useState<DataSource[]>([]);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);

  const [publicDisplaySchemaList, setPublicDisplaySchemaList] = useState<DisplaySchema[]>([]);
  const [privateDisplaySchemaList, setPrivateDisplaySchemaList] = useState<DisplaySchema[]>([]);
  const [selectedDisplaySchema, setSelectedDisplaySchema] = useState<DisplaySchema | null>(null);

  const [createNewProjectForm] = Form.useForm();
  const [publicProjectList, setPublicProjectList] = useState<Project[]>([]);
  const [privateProjectList, setPrivateProjectList] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [
    selectedProjectDataSource, setSelectedProjectDataSource,
  ] = useState<DataSource | null>(null);
  const [
    selectedProjectDisplaySchema, setSelectedProjectDisplaySchema,
  ] = useState<DisplaySchema | null>(null);

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

  const createDataSource = (values: any) => {
    axios
      .post(`${BACKEND_URL}/data_sources`, { ...values, public: !!values.public }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPublicDataSource = () => {
    axios
      .get(`${BACKEND_URL}/data_sources`, {
        params: {
          public: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPublicDataSourceList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPrivateDataSource = () => {
    axios
      .get(`${BACKEND_URL}/data_sources`, {
        params: {
          created_by: user?._id.$oid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPrivateDataSourceList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDataSourceTabChange = (tab: string) => {
    if (tab === 'public') {
      fetchPublicDataSource();
    } else if (tab === 'private') {
      fetchPrivateDataSource();
    }
  };

  const createDisplaySchema = (values: any) => {
    axios
      .post(`${BACKEND_URL}/display_schemas`, { ...values, public: !!values.public }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPublicDisplaySchema = () => {
    axios
      .get(`${BACKEND_URL}/display_schemas`, {
        params: {
          public: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPublicDisplaySchemaList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPrivateDisplaySchema = () => {
    axios
      .get(`${BACKEND_URL}/display_schemas`, {
        params: {
          created_by: user?._id.$oid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPrivateDisplaySchemaList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDisplaySchemaTabChange = (tab: string) => {
    if (tab === 'public') {
      fetchPublicDisplaySchema();
    } else if (tab === 'private') {
      fetchPrivateDisplaySchema();
    }
  };

  const createProject = (values: any) => {
    axios
      .post(`${BACKEND_URL}/projects`, { ...values, public: !!values.public }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPublicProject = () => {
    axios
      .get(`${BACKEND_URL}/projects`, {
        params: {
          public: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPublicProjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPrivateProject = () => {
    axios
      .get(`${BACKEND_URL}/projects`, {
        params: {
          created_by: user?._id.$oid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPrivateProjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProjectTabChange = (tab: string) => {
    if (tab === 'public') {
      fetchPublicProject();
    } else if (tab === 'private') {
      fetchPrivateProject();
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchPrivateDataSource();
    fetchPrivateDisplaySchema();
    fetchPrivateProject();
  }, [user]);

  useEffect(() => {
    const chartPreviewEl = document.getElementById('chart-preview');
    if (!chartPreviewEl) {
      return;
    }
    let chartPreview = echarts.getInstanceByDom(chartPreviewEl);
    if (!chartPreview) {
      chartPreview = echarts.init(chartPreviewEl);
    }
    if (!selectedDisplaySchema?.echarts_option) {
      return;
    }
    const option = JSON.parse(selectedDisplaySchema?.echarts_option);
    if (!selectedDataSource?.static_data) {
      return;
    }
    const data = JSON.parse(selectedDataSource?.static_data);
    option.series[0].data = data;
    chartPreview.setOption(option, true);
  }, [selectedDataSource, selectedDisplaySchema]);

  useEffect(() => {
    if (!selectedDataSource) {
      return;
    }
    createNewProjectForm.setFieldsValue({ data_source: selectedDataSource._id.$oid });
  }, [selectedDataSource]);

  useEffect(() => {
    if (!selectedDisplaySchema) {
      return;
    }
    createNewProjectForm.setFieldsValue({ display_schema: selectedDisplaySchema._id.$oid });
  }, [selectedDisplaySchema]);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }
    if (selectedProject.data_source) {
      axios
        .get(`${BACKEND_URL}/data_sources/${selectedProject.data_source.$oid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSelectedProjectDataSource(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (selectedProject.display_schema) {
      axios
        .get(`${BACKEND_URL}/display_schemas/${selectedProject.display_schema.$oid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSelectedProjectDisplaySchema(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedProject]);

  useEffect(() => {
    const chartDisplayEl = document.getElementById('chart-display');
    if (!chartDisplayEl) {
      return;
    }
    let chartPreview = echarts.getInstanceByDom(chartDisplayEl);
    if (!chartPreview) {
      chartPreview = echarts.init(chartDisplayEl);
    }
    if (!selectedProjectDisplaySchema?.echarts_option) {
      return;
    }
    const option = JSON.parse(selectedProjectDisplaySchema?.echarts_option);
    if (!selectedProjectDataSource?.static_data) {
      return;
    }
    const data = JSON.parse(selectedProjectDataSource?.static_data);
    option.series[0].data = data;
    chartPreview.setOption(option, true);
  }, [selectedProjectDataSource, selectedProjectDisplaySchema]);

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
      {user && (
        <Tabs defaultActiveKey="create">
          <TabPane tab="Create New Project" key="create">
            <Title level={2}>01 Data Source</Title>
            <Title level={3}>Create New Data Source...</Title>
            <Form
              name="new_data_source"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={createDataSource}
              autoComplete="off"
              style={{ width: '400px' }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input data source name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Static Data"
                name="static_data"
                rules={[{ required: true, message: 'Please input static data!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="public" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Make It Public</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Title level={3}>...or Select Data Source</Title>
            <Tabs defaultActiveKey="private" onChange={handleDataSourceTabChange}>
              <TabPane tab="Created By Myself" key="private">
                <Table dataSource={privateDataSourceList}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column title="Static Data" dataIndex="static_data" key="static_data" />
                  <Column
                    title="Operation"
                    key="_id"
                    render={(dataSource) => (
                      <Button type="link" onClick={() => setSelectedDataSource(dataSource)}>Select</Button>
                    )}
                  />
                </Table>
              </TabPane>
              <TabPane tab="Public" key="public">
                <Table dataSource={publicDataSourceList}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column title="Static Data" dataIndex="static_data" key="static_data" />
                  <Column
                    title="Operation"
                    key="_id"
                    render={(dataSource) => (
                      <Button type="link" onClick={() => setSelectedDataSource(dataSource)}>Select</Button>
                    )}
                  />
                </Table>
              </TabPane>
            </Tabs>
            <div>{`selected data source: ${JSON.stringify(selectedDataSource)}`}</div>
            <Title level={2}>02 Display Schema</Title>
            <Title level={3}>Create New Display Schema...</Title>
            <Form
              name="new_display_schema"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={createDisplaySchema}
              autoComplete="off"
              style={{ width: '400px' }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input display schema name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Echarts Option"
                name="echarts_option"
                rules={[{ required: true, message: 'Please input echarts option!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="public" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Make It Public</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Title level={3}>...or Select Display Schema</Title>
            <Tabs defaultActiveKey="private" onChange={handleDisplaySchemaTabChange}>
              <TabPane tab="Created By Myself" key="private">
                <Table dataSource={privateDisplaySchemaList}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column title="Echarts Option" dataIndex="echarts_option" key="echarts_option" />
                  <Column
                    title="Operation"
                    key="_id"
                    render={(displaySchema) => (
                      <Button type="link" onClick={() => setSelectedDisplaySchema(displaySchema)}>Select</Button>
                    )}
                  />
                </Table>
              </TabPane>
              <TabPane tab="Public" key="public">
                <Table dataSource={publicDisplaySchemaList}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column title="Echarts Option" dataIndex="echarts_option" key="echarts_option" />
                  <Column
                    title="Operation"
                    key="_id"
                    render={(displaySchema) => (
                      <Button type="link" onClick={() => setSelectedDisplaySchema(displaySchema)}>Select</Button>
                    )}
                  />
                </Table>
              </TabPane>
            </Tabs>
            <div>{`selected display shcema: ${JSON.stringify(selectedDisplaySchema)}`}</div>
            <Title level={2}>03 Share Config</Title>
            <Paragraph>NOT IMPLEMENTED YET, SKIP</Paragraph>
            <Title level={2}>04 Preview Chart</Title>
            <div id="chart-preview" style={{ width: 600, height: 400 }} />
            <Title level={2}>05 Create Project</Title>
            <Form
              name="new_project"
              form={createNewProjectForm}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={createProject}
              autoComplete="off"
              style={{ width: '400px' }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input project name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Data Source"
                name="data_source"
                rules={[{ required: true, message: 'Please select data source!' }]}
              >
                <Input value={selectedDataSource?._id.$oid} />
              </Form.Item>
              <Form.Item
                label="Display Schema"
                name="display_schema"
                rules={[{ required: true, message: 'Please select display schema!' }]}
              >
                <Input value={selectedDisplaySchema?._id.$oid} />
              </Form.Item>
              <Form.Item name="public" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Make It Public</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Preview Existed Project" key="preview">
            <Title level={2}>Project</Title>
            <Tabs defaultActiveKey="private" onChange={handleProjectTabChange}>
              <TabPane tab="Created By Myself" key="private">
                <Table dataSource={privateProjectList}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column
                    title="Operation"
                    key="_id"
                    render={(project) => (
                      <Button type="link" onClick={() => setSelectedProject(project)}>Select</Button>
                    )}
                  />
                </Table>
              </TabPane>
              <TabPane tab="Public" key="public">
                <Table dataSource={publicProjectList}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column
                    title="Operation"
                    key="_id"
                    render={(project) => (
                      <Button type="link" onClick={() => setSelectedProject(project)}>Select</Button>
                    )}
                  />
                </Table>
              </TabPane>
            </Tabs>
            <div>{`selected project: ${JSON.stringify(selectedProject)}`}</div>
            <div>{`selected project data source: ${JSON.stringify(selectedProjectDataSource)}`}</div>
            <div>{`selected project display schema: ${JSON.stringify(selectedProjectDisplaySchema)}`}</div>
            <div id="chart-display" style={{ width: 600, height: 400 }} />
          </TabPane>
        </Tabs>
      )}
    </Typography>
  );
};

export default Demo;
