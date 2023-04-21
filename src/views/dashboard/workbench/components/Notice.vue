<template>
  <Card title="公告">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>
    <Tabs @change="changeTab">
      <template v-for="item in tabs" :key="item.NoticeType">
        <TabPane>
          <template #tab>
            {{ item.Name }}
          </template>
          <a-list :data-source="notices">
            <template #renderItem="{ item }">
              <a-list-item>
                <a class="text-gray-600">{{ item.title }}</a>
              </a-list-item>
            </template>
          </a-list>
        </TabPane>
      </template>
    </Tabs>
  </Card>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
  import { Card, Tabs, List } from 'ant-design-vue';
  import { groupItems } from './data';
  import { getNoticePages } from "@/api/notice/notice";
  import { NoticeParams, NoticeDetail, NoticeTypeTabs } from "@/api/notice/model/noticeModel";

  export default defineComponent({
    components: { Card, Tabs, TabPane: Tabs.TabPane, AList: List, AListItem: List.Item },
    setup() {
      let notices = ref<NoticeDetail[]>([]);

      function changeTab(tab: number | null) {
        getNoticePages({ noticeType: tab, title: null } as NoticeParams).then(res=>{
          notices.value = res.items;
        })
      }

      onMounted(()=>{
        changeTab(null)
      })

      return { items: groupItems, tabs: NoticeTypeTabs, changeTab, notices };
    },
  });
</script>
