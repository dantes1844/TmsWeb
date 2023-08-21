<template>
  <PageWrapper
    class="high-form"
    title="变电站（新建、扩建、改建）调度自动化系统联调记录"
    content="请完善以下各项任务信息"
  >
    <a-card title="任务管理" :bordered="false" class="!mt-5">
      <BasicForm @register="registerTask" />
    </a-card>
    <a-card title="子任务管理" :bordered="false" class="!mt-5">
      <PersonTable ref="tableRef" />
    </a-card>

    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
import { BasicForm, useForm } from '/@/components/Form';
import { defineComponent, ref } from 'vue';
import PersonTable from './PersonTable.vue';
import { PageWrapper } from '/@/components/Page';
import { taskSchemas } from './data';
import { Card } from 'ant-design-vue';

export default defineComponent({
  name: 'year',
  components: { BasicForm, PersonTable, PageWrapper, [Card.name]: Card },
  setup() {
    const tableRef = ref<{ getDataSource: () => any } | null>(null);

    const [registerTask, { validate }] = useForm({
      layout: 'vertical',
      baseColProps: {
        span: 6,
      },
      schemas: taskSchemas,
      showActionButtonGroup: false,
    });

    async function submitAll() {
      try {
        if (tableRef.value) {
          console.log('table data:', tableRef.value.getDataSource());
        }

        const [values] = await Promise.all([validate()]);
        console.log('form data:', values);
      } catch (error) {}
    }

    return { registerTask, submitAll, tableRef };
  },
});
</script>
<style lang="less" scoped>
.high-form {
  padding-bottom: 48px;
}
</style>
