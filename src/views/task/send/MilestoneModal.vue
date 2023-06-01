<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :maskClosable="false">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { milestoneSchema } from './job.data';
  import { createJobFeedback } from '@/api/job/jobFeedback';


  export default defineComponent({
    name: 'JobModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 100,
        rowProps: { gutter: 24 },
        baseColProps: { span: 24 },
        schemas: milestoneSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        // rowId.value = data.record.id;
        // const subJob: CreateJobModel = cloneDeep(data.record)
        // subJob.parentId = data.record.id;
        // subJob['id'] = 0


        // const treeData = await getDeptList();
        // updateSchema([
        //   {
        //     field: 'password',
        //     show: !refIsUpdate,
        //     required: !refIsUpdate,
        //   },
        //   {
        //     field: 'deptId',
        //     componentProps: { treeData },
        //   },
        // ]);
      });

      const getTitle = '设置里程碑';

      async function handleSubmit() {
        try {
          const values = await validate();

          setModalProps({ confirmLoading: true });

          const job = Object.assign({}, values);

          await createJobFeedback(job)

          closeModal();

          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
