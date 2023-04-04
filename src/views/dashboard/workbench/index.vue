<template>
  <PageWrapper>
    <div class="flex">
      <div class="w-1/3 mr-4 h-72">
        <Card :loading="loading">
          <img class="xl:h-60 mx-auto h-fit" src="../../../assets/svg/illustration.svg" />
        </Card>
      </div>
      <div class="w-2/3 mr-4 h-60">
        <short-cut />
      </div>
    </div>

    <div class="flex h-2/5 h-128 mt-8">
      <div class="grid gap-4 grid-cols-3 w-full !md:mt-0">
        <to-do-list />
        <jobs />
        <notice />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { groupItems } from './components/data';
  import ToDoList from './components/ToDoList.vue';
  import Notice from './components/Notice.vue';
  import Jobs from './components/Jobs.vue';
  import ShortCut from './components/ShortCut.vue';

  export default defineComponent({
    components: {
      ToDoList,
      PageWrapper,
      Card,
      ShortCut,
      Notice,
      Jobs,
    },
    setup() {
      const loading = ref(true);

      setTimeout(() => {
        loading.value = false;
      }, 500);

      return { items: groupItems, loading: loading };
    },
  });
</script>
