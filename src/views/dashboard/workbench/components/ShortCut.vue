<template>
  <div class="grid gap-4 grid-cols-4">
    <Card v-for="(item, index) in menus" :key="index">
      <a class="flex text-gray-600">
        <Icon :icon="item.icon" size="36" />
        <span class="text-lg ml-4 mt-1">{{ item.title }}</span>
      </a>
    </Card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { groupItems } from './data';

  export default defineComponent({
    components: { Card, Icon },
    setup() {
      const menus = ref([]);
      for (let i = 1; i <= 12; i++) {
        menus.value.push({
          id: i,
          color: 'blue',
          icon: 'carbon:logo-github',
          title: '功能菜单',
        });
      }

      return { items: groupItems, menus: menus };
    },
  });
</script>
