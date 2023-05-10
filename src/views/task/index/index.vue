<template>
  <div class="flex flex-row">
    <Detail :items="todoList" title="未开始"></Detail>
    <Detail :items="inProgressList" title="进行中"></Detail>
    <Detail :items="finalCheckList" title="待评审"></Detail>
    <Detail :items="doneList" title="已完结"></Detail>
  </div>

</template>
<script lang="ts">

import { getDashboards } from '@/api/job/job';
import { defineComponent, onMounted, ref } from 'vue';
import { JobDetail, JobStatus } from '@/api/job/model/jobModel';
import Detail from '@/views/task/index/components/Detail.vue';

export default defineComponent({
  props: {
    loading: {
      type: Boolean
    }
  },
  components: {
    Detail
  },
  setup(props) {
    const todoList= ref<JobDetail[]>([]);
    const inProgressList= ref<JobDetail[]>([]) ;
    const finalCheckList= ref<JobDetail[]>([]);
    const doneList= ref<JobDetail[]>([]);

    onMounted(() => {
      getDashboards().then(res => {
        todoList.value = res.filter(c => c.jobStatus == JobStatus.Todo)[0]?.jobs as JobDetail[];
        inProgressList.value = res.filter(c => c.jobStatus == JobStatus.InProgress)[0]?.jobs  as JobDetail[];
        finalCheckList.value = res.filter(c => c.jobStatus == JobStatus.FinalCheck)[0]?.jobs  as JobDetail[];
        doneList.value = res.filter(c => c.jobStatus == JobStatus.Done)[0]?.jobs  as JobDetail[];
      });
    });

    return {
      todoList,
      inProgressList,
      finalCheckList,
      doneList,
    };
  }
});

</script>
