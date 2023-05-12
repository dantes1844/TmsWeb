<template>
      <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
        <div class="w-full h-full bg-white border-solid rounded m-4">
          <GanttContainer class="center m-4 w-23/24 h-2/3 left-container" :tasks="tasks"></GanttContainer>
        </div>
      </PageWrapper>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import { PageWrapper } from '@/components/Page';
import GanttContainer from '@/views/task/gantt/components/GanttContainer.vue';

export default defineComponent({
  name: 'app',
  components: { GanttContainer, PageWrapper },
  data () {
    return {
      tasks: {
        data: [
          {id: 1, text: 'Task #1', start_date: '2020-01-17', duration: 3, progress: 0.6},
          {id: 2, text: 'Task #2', start_date: '2020-01-31', duration: 3, progress: 0.4}
        ],
        links: [
          {id: 1, source: 1, target: 2, type: '0'}
        ]
      },
    }
  },
  setup(){
    onMounted(()=>{

    })
  }
});
</script>
