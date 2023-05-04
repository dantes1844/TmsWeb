<template>
  <div class="boxall" style="height: calc(50% - .15rem)">
    <div class="alltitle">
      专业统计
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
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
    onMounted(() => {
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
        },
        'grid': {
          'top': '20%',
          'right': '50',
          'bottom': '20',
          'left': '30',
        },
        legend: {
          data: ['专业1', '专业2', '专业3'],
          right: 'center',
          width: '100%',
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10,
        },
        'xAxis': [{
          'type': 'category',
          data: ['8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.7)',
              fontSize: '14',
            },
          },

        },
        ],
        'yAxis': [{
          'type': 'value',
          'name': '单位个',
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,

          },
          'axisLabel': {
            'show': true,
            fontSize: 14,
            color: 'rgba(255,255,255,.6)'

          },
          axisLine: {
            min: 0,
            max: 10,
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }, //左线色

        },
          {
            'type': 'value',
            'name': '增速',
            'show': true,
            'axisLabel': {
              'show': true,
              fontSize: 14,
              formatter: '{value} %',
              color: 'rgba(255,255,255,.6)'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }, //右线色
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }, //x轴线
          },
        ],
        'series': [
          {
            'name': '专业1',
            'type': 'bar',
            'data': [36.6, 38.80, 41.2, 53.6, 48.7],
            'barWidth': '15%',
            'itemStyle': {
              'normal': {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#8bd46e'
                }, {
                  offset: 1,
                  color: '#09bcb7'
                }]),
              }
            },
            'barGap': '0.2'
          },
          {
            'name': '专业2',
            'type': 'bar',
            'data': [14.8, 14.1, 17.5, 22.3, 25.3],
            'barWidth': '15%',
            'itemStyle': {
              'normal': {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#248ff7'
                }, {
                  offset: 1,
                  color: '#6851f1'
                }]),
              }
            },
            'barGap': '0.2'
          },
          {
            'name': '专业3',
            'type': 'bar',
            'data': [9.2, 9.1, 9.7, 9.8, 9.2],
            'barWidth': '15%',
            'itemStyle': {
              'normal': {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#fccb05'
                }, {
                  offset: 1,
                  color: '#f5804d'
                }]),
              }
            },
            'barGap': '0.2'
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
