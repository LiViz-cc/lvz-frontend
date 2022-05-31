import React, { FC, useState, useEffect } from 'react';
import {
  Typography, Radio, Upload, Button, Space, Tree, Input,
} from 'antd';
import type { DataNode } from 'antd/lib/tree';
import { UploadOutlined, DownOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface SeriesNode extends DataNode {
  data: number[] | undefined;
}

const Parser: FC = () => {
  const [type, setType] = useState('json');
  const [file, setFile] = useState<File | null>(null);

  const [parsingFile, setParsingFile] = useState(false);
  const [seriesTree, setSeriesTree] = useState<SeriesNode[] | undefined>(undefined);
  const [seriesSelected, setSeriesSelected] = useState<SeriesNode | undefined>(undefined);

  useEffect(() => {
    if (!file) {
      setSeriesTree(undefined);
      setSeriesSelected(undefined);
      return;
    }
    setParsingFile(true);
    if (type === 'txt') {
      const fr = new FileReader();
      fr.readAsText(file);
      fr.addEventListener('load', (e) => {
        const result = e.target?.result;
        if (!result) {
          // fail to read file as text, return
          setSeriesTree(undefined);
          setParsingFile(false);
          return;
        }

        // get text lines
        const lines = result?.toString().split('\n'); // TODO: \r\n support
        if (!lines) {
          // empty file, return
          return;
        }
        if (lines[lines.length - 1] === '') {
          // remove empty line at tail
          lines.pop();
        }

        const seriesData = lines.map((line) => Number(line));

        const newSeriesTree = [{
          title: 'unnamed_series_1',
          data: seriesData,
          key: '0',
          children: seriesData.map((data, index) => ({
            title: `${data}`,
            key: `0-${index}`,
            selectable: false,
          })),
        }];

        setSeriesTree(newSeriesTree);
        setParsingFile(false);
      });
    }
  }, [file]);

  const acceptMap: Map<string, string> = new Map();
  acceptMap.set('txt', '.txt');
  acceptMap.set('csv', '.csv');
  acceptMap.set('json', '.json');
  acceptMap.set('xlsx', '.xlsx');

  return (
    <Typography>
      <Title level={1}>Parser</Title>
      <Title level={2}>01 Select Type</Title>
      <Paragraph>
        <Radio.Group onChange={(e) => setType(e.target.value)} value={type}>
          <Radio value="txt">txt</Radio>
          <Radio value="csv">csv</Radio>
          <Radio value="json">json</Radio>
          <Radio value="xlsx">xlsx</Radio>
        </Radio.Group>
      </Paragraph>
      <Title level={2}>02 Select File</Title>
      <Paragraph>
        {
          file
            ? (
              <Space>
                <span>{`File ${file.name} selected.`}</span>
                <Button onClick={() => {
                  setFile(null);
                  setSeriesTree(undefined);
                  setSeriesSelected(undefined);
                }}
                >
                  Remove
                </Button>
              </Space>
            )
            : (
              <Upload
                accept={acceptMap.get(type)}
                beforeUpload={(newFile) => {
                  setFile(newFile);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Select</Button>
              </Upload>
            )
        }
      </Paragraph>
      <Title level={2}>03 Select Series</Title>
      <Paragraph>
        {
          // eslint-disable-next-line no-nested-ternary
          parsingFile
            ? (
              <div>
                Now parsing...
              </div>
            )
            : (
              seriesTree
                ? (
                  <>
                    <Tree
                      showLine
                      switcherIcon={<DownOutlined />}
                      treeData={seriesTree}
                      onSelect={(keys, info) => {
                        if (keys.length === 0) {
                          setSeriesSelected(undefined);
                        } else {
                          setSeriesSelected(info.selectedNodes[0]);
                        }
                      }}
                    />
                    <div>{`Selected series: ${JSON.stringify(seriesSelected?.data)}`}</div>
                  </>
                )
                : (
                  <div>Please select a file first.</div>
                )
            )
        }
      </Paragraph>
    </Typography>
  );
};

export default Parser;
