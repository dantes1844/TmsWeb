<template>
  <div class="flex flex-row">
    <Detail :items="ToDoList" title="未开始"></Detail>
    <Detail :items="InProgressList" title="进行中"></Detail>
    <Detail :items="FinalCheckList" title="待评审"></Detail>
    <Detail :items="DoneList" title="已完结"></Detail>
  </div>

</template>
<script lang="ts" setup>

import Detail from "@/views/task/index/components/detail.vue";
import { ToDoList, InProgressList, FinalCheckList, DoneList } from "@/views/task/index/data";

defineProps({
  loading: {
    type: Boolean
  }
});
</script>
