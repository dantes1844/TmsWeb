<template>
  <div class="my-2 flex flex-row ">
    <div class="w-1/8 m-4"></div>
    <div class="mb-4">
      <Button class="mr-2" size="medium" shape="round" type="primary">查看统计</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'doneControls',
  components: { Button },
  props:{
    item:{
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>

</style>
