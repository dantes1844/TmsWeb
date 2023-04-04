<template>
  <Card title="关注的任务">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span> {{ column.name }} </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a class="text-gray-600">
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
      </template>
    </a-table>
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card, Table, Tag } from 'ant-design-vue';
  import { groupItems } from './data';

  export default defineComponent({
    components: { Card, ATable: Table, ATag: Tag },
    setup() {
      const columns = [
        {
          name: '任务名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '责任人',
          dataIndex: 'supervisor',
          key: 'supervisor',
        },
        {
          title: '任务进度',
          key: 'tags',
          dataIndex: 'tags',
        },
      ];
      const data = [
        {
          key: '1',
          name: '新建厂站工作一的名称',
          supervisor: '曾同方',
          tags: ['nice'],
        },
        {
          key: '2',
          name: '新建厂站工作二的名称',
          supervisor: '万刚毅',
          tags: ['loser'],
        },
        {
          key: '3',
          name: '扩建厂站工作一的名称',
          supervisor: '梁建元',
          tags: ['teacher'],
        },
        {
          key: '4',
          name: '电器开关柜巡检任务',
          supervisor: '邓华清',
          tags: ['cool'],
        },
        {
          key: '5',
          name: 'OMS系统数据同步工作',
          supervisor: '孙志明',
          tags: ['cool'],
        },
      ];

      return { items: groupItems, columns: columns, data: data };
    },
  });
</script>
