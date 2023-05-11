<template>
  <Card title="公告">
    <template #extra>
      <a-button size="small" type="link" @click="more">更多</a-button>
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
                <router-link :to="{path:'/notice/detail',query:{id:item.id}}">
                  {{ item.title }}
                </router-link>
              </a-list-item>
            </template>
          </a-list>
        </TabPane>
      </template>
    </Tabs>
  </Card>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Card, List, Tabs } from 'ant-design-vue';
import { groupItems } from './data';
import { getNoticePages } from '@/api/notice/notice';
import { NoticeDetail, NoticeParams, NoticeTypeTabs } from '@/api/notice/model/noticeModel';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { Card, Tabs, TabPane: Tabs.TabPane, AList: List, AListItem: List.Item },
  setup() {
    let notices = ref<NoticeDetail[]>([]);

    function changeTab(tab: number | null) {
      getNoticePages({ noticeType: tab, pageSize: 5, isPublic: true } as NoticeParams).then(res => {
        notices.value = res.items;
      });
    }

    const router = useRouter();

    function more() {
      router.push({ path: '/notice/index' });
    }

    onMounted(() => {
      changeTab(null);
    });

    return {
      items: groupItems,
      tabs: NoticeTypeTabs,
      changeTab,
      notices,
      more
    };
  },
});
</script>
