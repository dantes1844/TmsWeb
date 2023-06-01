<template>
  <div class="mb-2 flex flex-row pb-2">
    <span class="w-12 ml-4">进度: </span>
    <Progress :percent="item.percent" type="line" :show-info="true"/>
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
