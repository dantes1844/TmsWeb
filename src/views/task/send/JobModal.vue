<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :maskClosable="false" width="700px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { editSubJobFormSchema } from './job.data';
  import { cloneDeep } from 'lodash-es';
  import { CreateJobModel } from '@/api/job/model/jobModel';
  import { createSubJob, updateJob } from '@/api/job/job';
  import { formatToDate } from '@/utils/dateUtil';

  export default defineComponent({
    name: 'JobModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 12 },
        schemas: editSubJobFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        rowId.value = data.record.id;
        const subJob: CreateJobModel = cloneDeep(data.record)
        subJob.parentId = data.record.id;
        subJob['id'] = 0

        await setFieldsValue({
          ...subJob,
        });

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

      const getTitle = computed(() => (unref(isUpdate) ? '编辑子任务' : '新增子任务'));

      async function handleSubmit() {
        try {
          const values = await validate();

          setModalProps({ confirmLoading: true });

          const job = Object.assign({}, values);
          job.startDate = formatToDate(job.startDate)
          job.endDate = formatToDate(job.endDate)

          if (job.id) {
            await updateJob(job);
          } else {
            await createSubJob(job);
          }

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
