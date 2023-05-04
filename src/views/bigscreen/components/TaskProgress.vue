<template>
  <div class="boxall" style="height: calc(50% - .15rem)">
    <div class="alltitle">
      任务进度
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
      default: '100%'
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(40vh - .5rem)'
    }
  },
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
    onMounted(() => {
      setOptions({
        grid: {
          left: '2%',
          top: '1%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          show: false
        }],
        yAxis: [
          {
            axisTick: 'none',
            axisLine: 'none',
            offset: '7',
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '14'
              }
            },
            data: ['任务1', '任务2', '任务3', '任务4', '任务5', '任务6', '任务7', '任务8', '任务9']

          },
          {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '14'
              }
            },
            data: [1514, 1619, 1623, 1968, 2158, 2456, 3506, 4664, 8390]

          },
          {
            name: '单位：件',
            nameGap: '50',
            nameTextStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: '16'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          }],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [25, 30, 34, 40, 43, 48, 52, 56, 70],
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: function(param) {
                  return param.value + '%';
                },
                textStyle: {
                  color: 'rgba(255,255,255,.8)',
                  fontSize: '12'
                }
              }
            },
            barWidth: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 0,
                  color: '#03c893'
                },
                  {
                    offset: 1,
                    color: '#0091ff'
                  }
                ]),
                barBorderRadius: 15
              }
            },
            z: 2
          },
          {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
            barWidth: 15,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,.2)',
                barBorderRadius: 15
              }
            },
            z: 1
          }]
      } as EChartsOption);
    });
    return { chartRef };
  }
});

</script>

<style scoped>

</style>
