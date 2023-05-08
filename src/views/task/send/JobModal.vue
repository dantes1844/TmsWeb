<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :maskClosable="false">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { editSubJobFormSchema } from './job.data';
  import { createAccount, updateAccount } from '/@/api/account/account';
  import { cloneDeep } from 'lodash-es';
  import { CreateJobModel } from '@/api/job/model/jobModel';

  export default defineComponent({
    name: 'JobModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: editSubJobFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        rowId.value = data.record.id;
        const subJob: CreateJobModel = cloneDeep(data.record)
        subJob.parentId = data.record.id;

        setFieldsValue({
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增子任务' : '编辑子任务'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          const model = Object.assign({}, values);
          if (model.id) {
            await updateAccount(model);
          } else {
            await createAccount(model);
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
