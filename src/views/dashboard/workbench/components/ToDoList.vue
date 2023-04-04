<template>
  <Card title="待办事项">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>
    <div class="grid gap-4 grid-cols-3">
      <Card>
        <div class="text-center">待审批</div>
        <div class="text-3xl text-center mt-2">
          <a class="text-sky-500">{{ toDoList.filter((c) => c.status == '待审批').length }}</a>
        </div>
      </Card>
      <Card>
        <div class="text-center">待提交</div>
        <div class="text-3xl text-center mt-2">
          <a class="text-sky-500">{{ toDoList.filter((c) => c.status == '待提交').length }}</a>
        </div>
      </Card>
      <Card>
        <div class="text-center">待阅示</div>
        <div class="text-3xl text-center mt-2">
          <a class="text-sky-500">{{ toDoList.filter((c) => c.status == '待阅示').length }}</a>
        </div>
      </Card>
    </div>

    <div class="">
      <div
        class="rounded mt-2 text-gray-500 bg-slate-100 h-12 flex items-center"
        v-for="(todo, index) in toDoList"
        :key="index"
      >
        【{{ todo.status }}】{{ todo.title }}
        <a class="ml-4">处理</a>
      </div>
    </div>
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';
  import { groupItems, toDoList } from './data';

  export default defineComponent({
    components: { Card },
    setup() {
      return { items: groupItems, toDoList };
    },
  });
</script>
