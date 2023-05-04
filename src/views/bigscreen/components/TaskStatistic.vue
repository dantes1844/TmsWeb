<template>
  <div class="boxall" style="height: calc(50% - .15rem)">
    <div class="alltitle">
      任务统计
    </div>
    <div ref="chartRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts">

import { useECharts } from '/@/hooks/web/useECharts';
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import { EChartsOption } from 'echarts';

export default defineComponent({
  props: {
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(40vh - .5rem)',
    },
  },
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
    onMounted(() => {
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['字段1', '字段2', '字段3'],
          right: 'center',
          top: 0,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10,
          // itemGap: 35
        },
        grid: {
          left: '0',
          right: '20',
          bottom: '0',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['字段1', '字段2', '字段3', '字段3', '字段4', '字段5', '字段6', '字段7', '字段8', '字段9'],
          axisLabel: {
            //rotate:-90,
            formatter: function(value) {
              return value.split('').join('\n');
            },
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 14,
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: 4,
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 14,
            }
          },
          axisLine: {
            show: false
          },
        },
        series: [{
          name: '字段1',
          type: 'bar',
          stack: 'a',
          barWidth: '30',
          barGap: 0,
          itemStyle: {
            normal: {
              color: '#8bd46e',
            }
          },
          data: [331, 497, 440, 81, 163, 366, 57, 188, 172, 2295]
        },
          {
            name: '字段2',
            type: 'bar',
            stack: 'a',
            barWidth: '30',
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#f5804d',
                barBorderRadius: 0,
              }
            },
            data: [48, -97, 56, -59, 90, 98, 64, 61, -8, 253]
          },
          {
            name: '字段3',
            type: 'bar',
            stack: 'a',
            barWidth: '30',
            barGap: 0,
            itemStyle: {
              normal: {
                color: '#248ff7',
                barBorderRadius: 0,
              }
            },
            data: [-13, -21, -112, 5, 0, -5, 72, -3, 8, -69]
          }
        ]
      } as EChartsOption);
    });
    return { chartRef };
  },
});

</script>

<style scoped>

</style>
