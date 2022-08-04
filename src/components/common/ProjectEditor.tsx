import React, { FC } from 'react';
import Split from 'react-split';
import { Button } from 'antd';
import * as echarts from 'echarts';
import './ProjectEditor.scss';

type ProjectEditorProps = {
  id: string
};

const ProjectEditor: FC<ProjectEditorProps> = ({ id }: ProjectEditorProps) => {
  const renderDemo = () => {
    const chartPreviewEl = document.getElementById('chart-preview');
    if (!chartPreviewEl) {
      return;
    }
    const chartPreview = echarts.init(chartPreviewEl);
    if (!chartPreview) {
      return;
    }
    const chartOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
    chartPreview.setOption(chartOption);
  };

  return (
    <div className="project-editor">
      <div className="header-section">
        header
        {' '}
        <Button onClick={renderDemo}>render demo</Button>
      </div>
      <Split className="main-section">
        <div className="left-section">
          {`Project Editor, left section, id: ${id}`}
        </div>
        <div className="center-section">
          <div id="chart-preview" style={{ width: 600, height: 400 }} />
        </div>
        <div className="right-section">
          {`Project Editor, right section, id: ${id}`}
        </div>
      </Split>
    </div>
  );
};

export default ProjectEditor;
