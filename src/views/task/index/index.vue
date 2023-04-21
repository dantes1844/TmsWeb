<template>
  <div class="flex flex-row">
    <detail :items="ToDoList" title="未开始"></detail>
    <detail :items="InProgressList" title="进行中"></detail>
    <detail :items="FinalCheckList" title="待评审"></detail>
    <detail :items="DoneList" title="已完结"></detail>
  </div>

</template>
<script lang="ts" setup>

import detail from "@/views/task/index/components/detail.vue";
import { ToDoList, InProgressList, FinalCheckList, DoneList } from "@/views/task/index/data";

defineProps({
  loading: {
    type: Boolean
  }
});
</script>
