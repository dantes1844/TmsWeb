<template>
  <div class="boxall" style="height: calc(50% - .15rem)">
    <div class="alltitle">
      文件下载统计
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
        title: {
          //text:'450',
          //subtext:'全部',
          x: 'center',
          y: '40%',
          textStyle: {
            color: '#fff',
            fontSize: 22,
            lineHeight: 10,
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: 16,
            lineHeight: 10,

          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 500,
          max: 600,
          inRange: {
            //colorLightness: [0, 1]
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          color: ['rgb(131,249,103)', '#FBFE27', '#FE5050', '#1DB7E5'], //'#FBFE27','rgb(11,228,96)','#FE5050'
          data: [{
            'value': 192,
            'name': '党建文件'
          }, {
            'value': 178,
            'name': '施工方案'
          }, {
            'value': 143,
            'name': '法律法规'
          }, {
            'value': 105,
            'name': '验收资料'
          }, {
            'value': 153,
            'name': '技术方案'
          }].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',

          label: {
            normal: {
              formatter: ['{c|{c}}', '{b|{b}}'].join('\n'),
              rich: {
                c: {
                  color: 'rgb(241,246,104)',
                  fontSize: 20,
                  fontWeight: 'bold',
                  lineHeight: 5
                },
                b: {
                  color: 'rgb(98,137,169)',
                  fontSize: 14,
                  height: 44
                },
              },
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgb(98,137,169)',
              },
              smooth: 0.2,
              length: 10,
              length2: 20,

            }
          }
        }]
      } as EChartsOption);
    });
    return { chartRef };
  },
});

</script>

<style scoped>

</style>
