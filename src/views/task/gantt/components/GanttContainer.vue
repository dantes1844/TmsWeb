<template>
    <div ref="ganttContainer"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {gantt} from 'dhtmlx-gantt';

export default defineComponent({
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },

  mounted: function () {
    gantt.config.date_format = "%Y-%m-%d";
    // gantt.config.scale_unit = "week";
    //自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
    gantt.config.autosize = true;
    gantt.i18n.setLocale("cn");

    gantt.init(this.$refs.ganttContainer);
    gantt.parse(this.$props.tasks);
  }
});
</script>

<style scope>
@import "dhtmlxgantt.css";
</style>
