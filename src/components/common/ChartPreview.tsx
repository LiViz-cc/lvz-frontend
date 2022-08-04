import React, { useState, useEffect, useLayoutEffect } from 'react';
import type { FC } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';

type ChartPreviewProps = {
  width: number
  height: number
  chartOption: EChartsOption
};

const ChartPreview: FC<ChartPreviewProps> = (props: ChartPreviewProps) => {
  const { width, height, chartOption } = props;

  const [previewId, setPreviewId] = useState('');
  const [chartPreview, setChartPreview] = useState<ECharts | null>(null);

  // when init
  // init `previewId` with a unique id
  useEffect(() => {
    // use the following algorithm to generate an almost unique preview id
    setPreviewId(String(Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))));
  }, []);

  // when dom ready
  // init chart preview
  useLayoutEffect(() => {
    // get chart preview container element
    const chartPreviewEl = document.getElementById(`chart-preview-${previewId}`);
    if (!chartPreviewEl) {
      return;
    }

    // init chart preview instance inside container
    const newChartPreview = echarts.init(chartPreviewEl);
    if (!newChartPreview) {
      return;
    }
    setChartPreview(newChartPreview);
  }, []);

  // when chart preview or chart option change
  // update chart
  useEffect(() => {
    if (!chartPreview) {
      // chart preview instance not ready, return
      return;
    }
    chartPreview.setOption(chartOption, false);
  }, [chartPreview, chartOption]);

  return (
    <div id={`chart-preview-${previewId}`} style={{ width, height }} />
  );
};

export default ChartPreview;
