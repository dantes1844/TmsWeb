<template>
  <div class="basis-1/4 rounded m-2">
    <div class="bg-white h-24">
      <div class="m-2 flex flex-col">
        <span class="text-2xl m-2">{{ title }}</span>
        <div class="flex flex-row">
          <span class="text-xl ml-2">{{ taskCount }}项任务/</span>
          <span class="text-xl ml-2">{{ taskUserCount }}人/</span>
          <span class="text-xl ml-2">{{ taskDays }}天工时</span>
        </div>
      </div>

    </div>
    <!--    <div class="flex h-12 mt-4 justify-center">-->
    <!--      <Button type="link" size="large" class="">-->
    <!--        <Icon class="justify-center" icon='ant-design:plus-circle-filled'></Icon>-->
    <!--        添加-->
    <!--      </Button>-->
    <!--    </div>-->
    <div class="h-auto">
      <div v-for="(item,index) in items" :key="index" class="bg-white mt-2 h-auto">
        <div class="flex flex-row">
          <div class="mr-2 rounded-full h-8 w-8 flex justify-center items-center bg-green-600">
        <span class="text-2xl">
        {{ item.supervisorUserName.substring(0,1).toUpperCase()}}
        </span>

        </div>
          <div class="mt-4">
            <span class="bold text-xl">
              <router-link to="">
                {{ item.jobName }}
              </router-link>
            </span>
            <div class="my-2 mr-2">
              <span>概述：</span>
              <span>{{ item.description }}</span>
            </div>
            <div class="my-2 mr-2">
              <span>负责人：</span>
              <span>{{ item.supervisorUserName }}</span>
            </div>
            <div class="my-2 mr-2">
              <span>执行人：</span>
              <span>{{ item.executorName}}</span>
            </div>
            <div class="my-2 mr-2">
              <span>时间：</span>
              <span>{{ formatDate(item.startDate) }} 至 {{ formatDate(item.endDate) }}</span>
            </div>
          </div>
        </div>

        <todo-controls v-if="item.jobStatus==JobStatus.Todo" :item="item"></todo-controls>
        <in-progress-controls v-if="item.jobStatus==JobStatus.InProgress"
                              :item="item"></in-progress-controls>
        <final-check-controls v-if="item.jobStatus==JobStatus.FinalCheck"
                              :item="item"></final-check-controls>
        <done-controls v-if="item.jobStatus==JobStatus.Done" :item="item"></done-controls>

      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Icon from '@/components/Icon/Icon.vue';
import { computed, defineComponent } from 'vue';
import TodoControls from '@/views/task/index/components/todoControls.vue';
import InProgressControls from '@/views/task/index/components/inProgressControls.vue';
import FinalCheckControls from '@/views/task/index/components/finalCheckControls.vue';
import DoneControls from '@/views/task/index/components/doneControls.vue';
import { JobDetail, JobStatus } from '@/api/job/model/jobModel';
import { formatToDate } from '@/utils/dateUtil';

export default defineComponent({
  name: "Detail",
  components: { Icon, TodoControls, InProgressControls, FinalCheckControls, DoneControls },
  props: {
    items: {
      type: Array as PropType<JobDetail[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const taskCount = computed(() => {
      return props.items.length;
    });
    const taskUserCount = computed(() => {
      let userCount = 1;
      // for (let i = 0; i < props.items.length; i++) {
      //   userCount += props.items[i]?.members?.length;
      // }
      return userCount;
    });
    const taskDays = computed(() => {
      let dayCount = 0;
      for (let i = 0; i < props.items.length; i++) {
        const item = props.items[i];

        let start = new Date(formatToDate(item.startDate));
        let end = new Date(formatToDate(item.endDate));
        let diff = (end - start) / (24 * 60 * 60 * 1000);
        console.log(diff);
        dayCount += diff;
      }
      return dayCount;
    });

    function formatDate(date){
      return formatToDate(date);
    }

    return {
      taskCount,
      taskUserCount,
      taskDays,
      JobStatus,
      formatDate
    };

  }
});
</script>

<style scoped>

</style>
