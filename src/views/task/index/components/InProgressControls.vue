<template>
  <div class="my-2 flex flex-row">
    <div class="w-1/8 m-4"></div>
    <div class="mb-4 flex flex-row">
      <div class="align-middle inline-block align-middle text-xl">
        当前进度
<!--        <span class="text-xl inline-block align-middle"></span>-->
      </div>
      <div class="ml-4">
        <Progress type="circle" :percent="item.percent"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Progress } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InProgressControls',
  components: { Button, Progress },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {

  },
});
</script>

<style scoped>

/deep/.ant-progress-inner{
  width: 60px !important;
  height: 60px !important;
}
</style>
