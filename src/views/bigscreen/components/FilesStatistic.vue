<template>
  <div class="boxall" style="height: calc(50% - .15rem)">
    <div class="alltitle">
      知识库统计
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
          'top': '15%',
          'right': '10%',
          'bottom': '20',
          'left': '10%',
        },
        legend: {
          data: ['党建文件', '验收资料'],
          right: 'center',
          top: 0,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10,
        },
        'xAxis': [{
          'type': 'category',

          data: ['2020', '2021', '2022', '2023'],
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

        },],
        'yAxis': [{
          'type': 'value',
          'name': '上传文件数量',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          'axisLabel': {
            'show': true,
            color: 'rgba(255,255,255,.6)'

          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }, //左线色

        },
          {
            'type': 'value',
            'name': '下载文件次数',
            'show': true,
            axisTick: {
              show: false
            },
            'axisLabel': {
              'show': true,
              formatter: '{value} %',
              color: 'rgba(255,255,255,.6)'
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
            'name': '党建文件',
            'type': 'bar',
            'data': [
              184, 205, 242, 305
            ],
            'barWidth': '20%',

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
          },
          {
            'name': '验收资料',
            'type': 'bar',
            'yAxisIndex': 1,
            'data': [210, 320, 350, 418],
            'barWidth': '20%',
            'barGap': '0.2',
            'itemStyle': {
              'normal': {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#fccb05'
                }, {
                  offset: 1,
                  color: '#66ff99'
                }]),
              }
            },

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
