<template>
      <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
        <div class="w-full h-full bg-white border-solid rounded m-4">
          <div class="center m-4 w-23/24 h-2/3 left-container"  ref="ganttRef"></div>
        </div>
      </PageWrapper>
</template>

<script lang="ts">

import { defineComponent,  onMounted, ref } from 'vue';
import { PageWrapper } from '@/components/Page';
import { getJobGantt } from '@/api/job/job';
import { gantt } from 'dhtmlx-gantt';

export default defineComponent({
  name: 'app',
  components: { PageWrapper },
  setup(){
    const ganttRef = ref<HTMLElement | null>(null);

    onMounted(()=>{
      getJobGantt().then(res=>{
        gantt.config.date_format = "%Y-%m-%d";
        // gantt.config.scale_unit = "week";
        //自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
        gantt.config.autosize = true;
        gantt.i18n.setLocale("cn");

        gantt.init(ganttRef.value);
        gantt.parse(res);

        gantt.plugins({
          marker: true
        });
        gantt.addMarker({
          start_date: new Date(),
          text: '今日'
        });
      })
    })
    return {
      ganttRef
    }
  }

});
</script>

<style scope>
@import "dhtmlxgantt.css";
</style>
