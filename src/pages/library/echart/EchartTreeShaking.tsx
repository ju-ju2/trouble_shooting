import {
  BarChart,
  LineChart,
  ParallelChart,
  ScatterChart,
} from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  LegendPlainComponent,
  MarkPointComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsOption } from "echarts";
import EChartsReactCore from "echarts-for-react/lib/core";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";

echarts.use([
  LineChart,
  CanvasRenderer,
  GridComponent,
  MarkPointComponent,
  TooltipComponent,
  LegendComponent,
  ParallelChart,
  BarChart,
  ScatterChart,
  LegendPlainComponent,
]);

const EchartTreeShaking = () => {
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
    <EChartsReactCore
      echarts={echarts}
      option={options}
      theme="space-theme"
      style={{ height: 500 }}
      notMerge={true}
    />
  );
};

export default EchartTreeShaking;
