<template>
  <div class="boxall" style="height: calc(50% - .15rem)">
    <div class="alltitle">
      绩效统计
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
          // formatter:'{c}' ,
        },
        grid: {
          left: '0',
          top: '30',
          right: '10',
          bottom: '-20',
          containLabel: true
        },
        legend: {
          data: ['傅存名', '成冰楠'],
          right: 'center',
          top: 0,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10,
          // itemGap: 35
        },

        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            rotate: -90,
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 14,

            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }

          },
          data: ['23年1月', '23年2月', '23年4月', '23年5月', '23年6月', '23年7月', '23年8月', '23年9月', '23年10月', '23年11月', '23年12月']

        }, {
          axisPointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          position: 'bottom',
          offset: 20,
        }],

        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          splitNumber: 6,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 14,
            },
          },

          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }
        }],
        series: [{
          name: '傅存名',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: 'rgba(228, 228, 126, 1)',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(228, 228, 126, .2)'
              }, {
                offset: 1,
                color: 'rgba(228, 228, 126, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(228, 228, 126, 1)',
              borderColor: 'rgba(228, 228, 126, .1)',
              borderWidth: 12
            }
          },
          data: [12.50, 14.4, 16.1, 14.9, 20.1, 17.2, 17.0, 13.42, 20.12, 18.94, 17.27, 16.10]

        }, {
          name: '成冰楠',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {

            normal: {
              color: 'rgba(255, 128, 128, 1)',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 128, 128,.2)'
              }, {
                offset: 1,
                color: 'rgba(255, 128, 128, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(255, 128, 128, 1)',
              borderColor: 'rgba(255, 128, 128, .1)',
              borderWidth: 12
            }
          },
          data: [6.4, 5.1, 6.6, 11.2, 22.1, 26.0, 20.2, 18.31, 21.59, 24.42, 34.03, 32.9]
        },]
      } as EChartsOption);
    });
    return { chartRef };
  },
});

</script>

<style scoped>

</style>
