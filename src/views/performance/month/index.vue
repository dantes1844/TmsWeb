<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 下载报告 </a-button>
        <a-button type="primary" @click="handleOvertimeApply"> 加班申请 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip:'修改',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <PerformanceDrawer @register="registerDrawer" @success="handleSuccess" />
    <OvertimeModal @register="registerVerifyJobModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';

  import { getPages } from '@/api/performance/performance';

  import PerformanceDrawer from './PerformanceDrawer.vue';
  import OvertimeModal from "@/views/performance/month/OvertimeModal.vue";
  import { columns, searchFormSchema } from './performance.data';
  import { CreateNoticeModel } from '/@/api/notice/model/noticeModel';
  import UploadModal from "@/components/Upload/src/UploadModal.vue";
  import UploadPreviewModal from "@/components/Upload/src/UploadPreviewModal.vue";
  import {useModal} from "@/components/Modal";
  import UploadFileModal from "@/views/files/index/UploadFileModal.vue";
  import KbsFileDrawer from "@/views/files/index/KbsFileDrawer.vue";

  export default defineComponent({
    name: 'NoticeManagement',
    components: {
      KbsFileDrawer,
      UploadFileModal,
      UploadPreviewModal, UploadModal, BasicTable, PerformanceDrawer, TableAction, OvertimeModal },
    setup() {
      const [registerVerifyJobModal, { openModal: verifyJobModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '绩效考核',
        api: getPages,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
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
      function handleOvertimeApply() {
        verifyJobModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: CreateNoticeModel) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleSuccess,
        registerVerifyJobModal,
        verifyJobModal,
        handleOvertimeApply
      };
    },
  });
</script>
