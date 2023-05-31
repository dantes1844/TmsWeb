<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="fetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleFeedback"> 任务反馈 </a-button>
        <a-button type="primary" @click="handleCreate"> 发布任务 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '修改任务',
                disabled: record.jobStatus !=JobStatus.Todo,
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'carbon:catalog-publish',
                tooltip: '添加子任务',
                ifShow: !record.parentId,
                disabled: record.jobStatus != JobStatus.Todo,
                onClick: handleAddJobChild.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除任务',
                disabled: record.jobStatus !=JobStatus.Todo,
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <JobDrawer @register="registerDrawer" @success="handleSuccess" />

    <JobModal @register="registerModal" @success="handleSuccess" />

    <JobProgressModal @register="registerCommitProgressModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick } from 'vue';

import { BasicTable, useTable, TableAction } from '/@/components/Table';

import { useDrawer } from '/@/components/Drawer';
import JobModal from '@/views/task/send/JobModal.vue';
import JobProgressModal from '@/views/task/send/JobProgressModal.vue';
import JobDrawer from './JobDrawer.vue';

import { columns, searchFormSchema } from './job.data';
import { deleteJob, getJobPages } from '/@/api/job/job';
import { CreateJobModel, JobDetail } from '/@/api/job/model/jobModel';
import { useModal } from '@/components/Modal';
import { JobStatus } from '@/api/job/model/jobModel';

export default defineComponent({
  name: 'JobManagement',
  computed: {
    JobStatus() {
      return JobStatus
    }
  },
  components: { BasicTable, JobDrawer, TableAction, JobModal, JobProgressModal },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerModal, { openModal: editTaskModal }] = useModal();
    const [registerCommitProgressModal, { openModal: commitProgressModal }] = useModal();
    const [registerTable, { reload, expandAll }] = useTable({
      title: '任务列表',
      api: getJobPages,

      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      indentSize: 15,
      isTreeTable: true,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        // slots: { customRender: 'action' },
        fixed: undefined,
      },
    });

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      });
    }
    function handleFeedback() {
      commitProgressModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: CreateJobModel) {
      const data = {
        record,
        isUpdate: true,
      }
      if(record.parentId){
        editTaskModal(true,data)
      }else{
        openDrawer(true, data);
      }
    }

    function handleAddJobChild(record:CreateJobModel){
      editTaskModal(true,{
        record,
        isUpdate: record.parentId>0
      })
    }

    async function handleDelete(record: JobDetail) {
      await deleteJob(record.id);
      await reload();
    }

    function handleSuccess() {
      reload();
    }

    function fetchSuccess(){
      nextTick(expandAll)
    }

    return {
      registerTable,
      registerDrawer,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleAddJobChild,
      fetchSuccess,
      registerCommitProgressModal,
      handleFeedback,
      editTaskModal,
      commitProgressModal
    };
  },
});
</script>
