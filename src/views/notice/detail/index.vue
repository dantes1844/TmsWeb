<template>
  <PageWrapper contentBackground>
    <a-page-header class="ml-2"
      :title="notice.title"
    />
    <div class="pt-4 m-4 desc-wrap">
      <a-card title="">
        <a-descriptions size="middle" :column="3">
          <a-descriptions-item label="创建人"> {{notice.userName}} </a-descriptions-item>
          <a-descriptions-item label="通知类型"> {{notice.noticeType}} </a-descriptions-item>
          <a-descriptions-item label="创建时间"> {{notice.creationTime}} </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <a-divider />
      <a-card title="通知详情" :bordered="false">
        {{notice.content}}
      </a-card>
      <a-divider />

      <a-card title="通知附件" :bordered="false" class="mt-5" v-if="hasAnyFile">
        <BasicTable @register="registerTimeTable" />
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { BasicTable, useTable } from '/@/components/Table';
import { PageWrapper } from '/@/components/Page';
import { Card, Descriptions, Divider, Empty, Steps, Tabs,PageHeader } from 'ant-design-vue';
import { getNotice } from '@/api/notice/notice';
import { refundTimeTableData, refundTimeTableSchema } from './data';
import { useRouter } from 'vue-router';
import { NoticeDetail } from '@/api/notice/model/noticeModel';

export default defineComponent({
  components: {
    BasicTable,
    PageWrapper,
    [Divider.name]: Divider,
    [Card.name]: Card,
    Empty,
    [Descriptions.name]: Descriptions,
    [Descriptions.Item.name]: Descriptions.Item,
    [Steps.name]: Steps,
    [PageHeader.name]: PageHeader,
    [Steps.Step.name]: Steps.Step,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
  },
  setup() {
    const [registerTimeTable] = useTable({
      title: '退货进度',
      columns: refundTimeTableSchema,
      pagination: false,
      dataSource: refundTimeTableData,
      showIndexColumn: false,
      scroll: { y: 300 },
    });

    let notice= ref<NoticeDetail>({} as NoticeDetail) ;
    const hasAnyFile = computed(() => notice.value.files && notice.value.files?.length>0);

    onMounted(async()=>{
      const { currentRoute } = useRouter();
      const id = currentRoute.value.query?.id;
      if(id){
        notice.value = await getNotice(id as string)
      }
    })

    return {
      registerTimeTable,
      notice,
      hasAnyFile
    };
  },
});
</script>
