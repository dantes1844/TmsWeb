<template>
  <div class="my-2 flex flex-row ">
    <div class="w-1/8 m-4"></div>
    <div class="mb-2">
      <Button class="mr-2" size="medium" shape="round" type="primary" @click="verifyFinished">确认结束</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'FinalCheckControls',
  components: { Button },
  emits:['verifyFinished'],
  props:{
    item:{
      type: Object,
      required: true,
    },
  },
  setup(props,{ emit }){
    function verifyFinished(){
      emit('verifyFinished', props.item)
    }
    return{
      verifyFinished
    }
  }
});
</script>

<style scoped>

</style>
