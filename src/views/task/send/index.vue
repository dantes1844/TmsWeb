<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="fetchSuccess">
      <template #toolbar>
<!--        <a-button type="primary" @click="handleFeedback"> 任务反馈 </a-button>-->
        <a-button type="primary" @click="handleCreate"> 发布任务 </a-button>
        <a-button type="primary" @click="handleApply"> 任务申请 </a-button>
        <a-button type="primary" @click="handleVerify"> 任务审核 </a-button>
        <a-button type="primary" @click="handleCreateMilestone"> 设置里程碑 </a-button>
        <a-button type="primary" @click="handleCreateComplexJob"> 专用任务 </a-button>
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
    <JobModal @register="registerModal" @success="handleSuccess" />
    <CreateJobModal @register="registerCreateJobModal" @success="handleSuccess" />
    <ApplyJobModal @register="registerApplyJobModal" @success="handleSuccess" />
    <ApplyJobModal @register="registerApplyJobModal" @success="handleSuccess" />
    <EditJobModal @register="registerVerifyJobModal" @success="handleSuccess" />
    <JobProgressModal @register="registerCommitProgressModal" @success="handleSuccess" />
    <MilestoneModal @register="registerMilestoneModal" @success="handleSuccess" />
    <CreateComplexJobModal @register="registerComplexJobModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import JobModal from './JobModal.vue';
import JobProgressModal from './JobProgressModal.vue';
import JobDrawer from './JobDrawer.vue';
import MilestoneModal from './MilestoneModal.vue';
import CreateJobModal from './CreateJobModal.vue';
import ApplyJobModal from './ApplyJobModal.vue';
import EditJobModal from './EditJobModal.vue';
import CreateComplexJobModal from './CreateComplexJobModal.vue';
import { columns, searchFormSchema } from './job.data';
import { deleteJob, getJobPages } from '/@/api/job/job';
import { CreateJobModel, JobDetail } from '/@/api/job/model/jobModel';
import { useModal } from '@/components/Modal';
import { JobStatus } from '@/api/job/model/jobModel';

export default defineComponent({
  computed: {
    JobStatus() {
      return JobStatus
    }
  },
  components: {
    BasicTable,
    JobDrawer,
    TableAction,
    JobModal,
    JobProgressModal,
    MilestoneModal,
    CreateJobModal,
    ApplyJobModal,
    EditJobModal,
    CreateComplexJobModal
  },
  setup() {
    const [registerModal, { openModal: editTaskModal }] = useModal();
    const [registerCommitProgressModal, { openModal: commitProgressModal }] = useModal();
    const [registerMilestoneModal, { openModal: milestoneModal }] = useModal();
    const [registerCreateJobModal, { openModal: createJobModal }] = useModal();
    const [registerApplyJobModal, { openModal: applyJobModal }] = useModal();
    const [registerVerifyJobModal, { openModal: verifyJobModal }] = useModal();
    const [registerComplexJobModal, { openModal: openComplexJobModal }] = useModal();
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
      createJobModal(true, {
        isUpdate: false,
      });
    }
    function handleApply() {
      applyJobModal(true, {
        isUpdate: false,
      });
    }
    function handleVerify() {
      verifyJobModal(true, {
        isUpdate: false,
      });
    }
    function handleFeedback() {
      commitProgressModal(true, {
        isUpdate: false,
      });
    }
    function handleCreateMilestone() {
      milestoneModal(true, {
        isUpdate: false,
      });
    }
    function handleCreateComplexJob() {
      openComplexJobModal(true, {
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
        verifyJobModal(true, data);
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
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleAddJobChild,
      fetchSuccess,
      registerCommitProgressModal,
      commitProgressModal,
      handleFeedback,
      editTaskModal,
      registerMilestoneModal,
      milestoneModal,
      handleCreateMilestone,
      registerCreateJobModal,
      createJobModal,
      registerApplyJobModal,
      applyJobModal,
      handleApply,
      registerVerifyJobModal,
      verifyJobModal,
      handleVerify,
      registerComplexJobModal,
      openComplexJobModal,
      handleCreateComplexJob,
    };
  },
});
</script>
