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
          <img src="/src/assets/images/header.jpg" class="rounded-full w-1/8 h-1/4 m-4" alt=""/>
          <div class="mt-4">
            <span class="bold text-xl">
              <router-link to="">
                {{ item.title }}
              </router-link>
            </span>
            <div class="my-2 mr-2">
              <span>概述：</span>
              <span>{{ item.description }}</span>
            </div>
            <div class="my-2 mr-2">
              <span>负责人：</span>
              <span>{{ item.supervisor }}</span>
            </div>
            <div class="my-2 mr-2">
              <span>执行人：</span>
              <span>{{ item.members.join("，") }}</span>
            </div>
            <div class="my-2 mr-2">
              <span>时间：</span>
              <span>{{ item.startDate }} 至 {{ item.endDate }}</span>
            </div>
          </div>
        </div>

        <todo-controls v-if="item.status==TaskStatus.Todo" :item="item"></todo-controls>
        <in-progress-controls v-if="item.status==TaskStatus.InProgress"
                              :item="item"></in-progress-controls>
        <final-check-controls v-if="item.status==TaskStatus.FinalCheck"
                              :item="item"></final-check-controls>
        <done-controls v-if="item.status==TaskStatus.Done" :item="item"></done-controls>

      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Icon from "@/components/Icon/Icon.vue";
import { computed, defineComponent, ref } from "vue";
import todoControls from "@/views/task/index/components/todoControls.vue";
import inProgressControls from "@/views/task/index/components/inProgressControls.vue";
import finalCheckControls from "@/views/task/index/components/finalCheckControls.vue";
import doneControls from "@/views/task/index/components/doneControls.vue";

import { TaskDetail, TaskStatus } from "@/views/task/index/data";

export default defineComponent({
  name: "detail",
  components: { Icon, todoControls, inProgressControls, finalCheckControls, doneControls },
  props: {
    items: {
      type: Array as PropType<TaskDetail[]>,
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
      let userCount = 0;
      for (let i = 0; i < props.items.length; i++) {
        userCount += props.items[i]?.members?.length;
      }
      return userCount;
    });
    const taskDays = computed(() => {
      let dayCount = 0;
      for (let i = 0; i < props.items.length; i++) {
        const item = props.items[i];

        let start = new Date(item.startDate);
        let end = new Date(item.endDate);
        let diff = (end - start) / (24 * 60 * 60 * 1000);
        console.log(diff);
        dayCount += diff;
      }
      return dayCount;
    });

    return {
      taskCount,
      taskUserCount,
      taskDays,
      TaskStatus
    };

  }
});
</script>

<style scoped>

</style>
