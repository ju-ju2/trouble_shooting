import React from "react";
import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

const EchartPage = () => {
  const chartRef = React.useRef(null);

  const options: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  return (
    <ReactECharts
      ref={chartRef}
      option={options}
      opts={{ renderer: "svg" }}
      style={{ height: 500 }}
    />
  );
};

export default EchartPage;
