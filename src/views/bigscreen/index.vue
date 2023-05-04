<template>
  <div>
    <div class="head">
      <!--      基于数据、信息、知识、决策的运维班组智能管理平台-->
      <h1>
        <router-link to="dashboard">
          {{ projectName }}
        </router-link>
      </h1>
      <clock></clock>

    </div>
    <div class="mainbox">
      <ul class="clearfix">
        <li>
          <task-progress></task-progress>
          <task-statistic></task-statistic>
        </li>
        <li>
          <specialty-statistic></specialty-statistic>
          <performance-statistic></performance-statistic>
        </li>
        <li>
          <files-statistic></files-statistic>
          <download-statistic></download-statistic>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@/views/bigscreen/css/comon0.css';
import Clock from '@/views/bigscreen/components/Clock.vue';
import TaskProgress from '@/views/bigscreen/components/TaskProgress.vue';
import TaskStatistic from '@/views/bigscreen/components/TaskStatistic.vue';
import SpecialtyStatistic from '@/views/bigscreen/components/SpecialtyStatistic.vue';
import PerformanceStatistic from '@/views/bigscreen/components/PerformanceStatistic.vue';
import FilesStatistic from '@/views/bigscreen/components/FilesStatistic.vue';
import DownloadStatistic from '@/views/bigscreen/components/DownloadStatistic.vue';

export default {
  name: "BigScreen",
  components: {
    DownloadStatistic,
    FilesStatistic,
    PerformanceStatistic,
    SpecialtyStatistic,
    TaskStatistic,
    TaskProgress,
    Clock
  },
  setup() {
    const projectName = import.meta.env.VITE_GLOB_APP_TITLE;
    return {
      projectName
    };
  }
};
</script>
