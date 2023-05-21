<template>
  <div class="grid gap-4 grid-cols-4">
    <Card v-for="(item, index) in shortCuts" :key="index">
      <router-link class="flex text-gray-600" :to="item.url">
        <Icon :icon="item.icon" size="36" :color="item.color" />
        <span class="text-lg ml-4 mt-1">{{ item.displayName }}</span>
      </router-link>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { getShortCuts } from '@/api/menu/menu';
  import { onMounted, ref } from 'vue';
  import { ShortCutModel } from '@/api/menu/model/menuModel';

  const shortCuts = ref<ShortCutModel[]>([]);

  onMounted(async ()=>{
    shortCuts.value =await getShortCuts();
  })
</script>
