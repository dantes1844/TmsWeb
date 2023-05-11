<template>
  <Card title="关注的任务">
    <template #extra>
      <a-button type="link" size="small" @click="more">更多</a-button>
    </template>
    <Table :columns="columns" :data-source="jobs">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'jobName'">
          <a class="text-gray-600">
            {{ record.jobName }}
          </a>
        </template>
        <template v-else-if="column.key === 'jobStatus'">
          <span>
            <Tag :color="getStatusNameAndColor(record.jobStatus).color">
              {{ getStatusNameAndColor(record.jobStatus).name  }}
            </Tag>
          </span>
        </template>
      </template>
    </table>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Card, Table, Tag } from 'ant-design-vue';
  import { getJobPages } from '@/api/job/job';
  import { JobDetail, getStatusNameAndColor, JobParams } from '@/api/job/model/jobModel';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { Card, Table, Tag },
    setup() {
      const jobs = ref<JobDetail[]>([]);
      const columns = [
        {
          title: '任务名称',
          dataIndex: 'jobName',
          key: 'jobName',
        },
        {
          title: '责任人',
          dataIndex: 'supervisorUserName',
          key: 'supervisorUserName',
        },
        {
          title: '任务进度',
          key: 'jobStatus',
          dataIndex: 'jobStatus',
        },
      ];

      getJobPages({ pageSize: 5, includeChildren: false }  as JobParams).then(res=>{
        jobs.value = res.items;
      })

      const router = useRouter();
      function more(){
        router.push({path:'/task/send'})
      }

      return {
        columns,
        jobs,
        getStatusNameAndColor,
        more,
      };
    },
  });
</script>
