<template>
  <div class="my-2 flex flex-row ">
    <div class="w-1/8 m-4"></div>
    <div class="mb-2">
      <Button class="mr-2"
              shape="round"
              size="medium"
              type="primary"
              @click="startJob">立即开始
      </Button>
      <Button class="ml-2"
              shape="round"
              size="medium">取消任务
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';
import { bus, EventBusType } from '/@/utils/event/eventBus';
import { setJobStart } from '@/api/job/job';
import { JobDetail } from '@/api/job/model/jobModel';

export default defineComponent({
  name: 'TodoControls',
  components: { Button },
  props: {
    item: {
      type: Object as PropType<JobDetail>,
      required: true,
    },
  },
  setup(props) {
    const { createConfirm } = useMessage();

    function startJob() {
      createConfirm({
        iconType: 'info',
        title: '启动任务',
        content: '如果包含子任务，将会被全部设置为进行中状态，确定启动该任务吗？',
        onOk(){
          setJobStart(props.item.id).then(()=>{
            bus.emit(EventBusType.ReloadJobDashboard);
          });
        }
      });
    }

    return {
      startJob
    };
  }
});
</script>

<style scoped>

</style>
