<template>
  <Card title="公告">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>
    <Tabs @change="changeTab">
      <template v-for="item in tabs" :key="item.id">
        <TabPane>
          <template #tab>
            {{ item.name }}
          </template>
          <a-list :data-source="notices">
            <template #renderItem="{ item }">
              <a-list-item>
                <a class="text-gray-600">{{ item }}</a>
              </a-list-item>
            </template>
          </a-list>
        </TabPane>
      </template>
    </Tabs>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Card, Tabs, List } from 'ant-design-vue';
  import { groupItems } from './data';

  export default defineComponent({
    components: { Card, Tabs, TabPane: Tabs.TabPane, AList: List, AListItem: List.Item },
    setup() {
      const tabs = ref([
        { id: 'all', name: '全部' },
        { id: '升级', name: '升级' },
        { id: '任务', name: '任务' },
        { id: '知识库', name: '知识库' },
      ]);

      let notices = ref([]);
      function changeTab(tab) {
        notices.value.splice(0);
        for (let i = 0; i < 6; i++) {
          notices.value.push(`【${tab}】 通知${i + 1}，请各单位注意查收`);
        }
        console.log(notices);
      }

      return { items: groupItems, tabs: tabs, changeTab, notices };
    },
  });
</script>
