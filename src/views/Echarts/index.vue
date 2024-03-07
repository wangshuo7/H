<!-- import { chartRenderAdapter } from 'vditor/dist/ts/markdown/adapterRender'; -->
<template>
  <session>
    <div ref="chart" class="chart"></div>
  </session>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const chart = ref()
onMounted(() => {
  init()
})
function init() {
  let myChart = echarts.init(chart.value, 'macarons') // 可设置内置主题 'dark'
  // window.addEventListener('resize', function () {
  //   myChart.resize()
  // })
  let option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 19, 42, 10, 33, 55]
      }
    ]
  }
  myChart.setOption(option)
}
</script>

<style lang="less" scoped>
.chart {
  width: 1000px;
  height: 600px;
  border: 1px solid #ccc;
}
</style>
