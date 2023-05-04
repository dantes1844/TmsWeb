<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { editFormSchema } from './job.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { createJob, updateJob } from '/@/api/job/job';

  export default defineComponent({
    name: 'JobDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup: function (_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: editFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          try {

          } catch (err) {}
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '发布任务' : '编辑任务'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          const job = Object.assign({}, values);
          debugger;
          if (!job.id || job.id === 0) {
            await createJob(job);
          } else {
            await updateJob(job);
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
