<template>
  <div class="time" id="showTime">
    {{ timeDisplay }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'Clock',
  setup() {
    let timeDisplay: ref<String> = ref<String>('');

    function AppendZero(obj) {
      return obj < 10 ? '0' + obj : obj;
    }

    function changeTime() {
      let dt = new Date();
      let y = dt.getFullYear();
      let mt = dt.getMonth() + 1;
      let day = dt.getDate();
      let h = dt.getHours();//获取时
      let m = dt.getMinutes();//获取分
      let s = dt.getSeconds();//获取秒
      timeDisplay.value = y + '-' + AppendZero(mt) + '-' + AppendZero(day) + ' ' + AppendZero(h) + ':' + AppendZero(m) + ':' + AppendZero(s) + '';
    }

    const timer = setInterval(changeTime, 1000);

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      timeDisplay
    };
  }
});
</script>

<style scoped>

</style>
