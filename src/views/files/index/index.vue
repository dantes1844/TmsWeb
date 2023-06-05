<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 上传文档 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
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
    <KbsFileDrawer @register="registerDrawer" @success="handleSuccess" />
    <UploadFileModal @register="registerVerifyJobModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import KbsFileDrawer from './KbsFileDrawer.vue';
  import UploadFileModal from "@/views/files/index/UploadFileModal.vue";

  import { columns, searchFormSchema } from './files.data';
  import { getKbsFileListByPage, deleteKbsFile } from '/@/api/file/kbsfile/kbsfile';
  import EditJobModal from "@/views/task/send/EditJobModal.vue";
  import ApplyJobModal from "@/views/task/send/ApplyJobModal.vue";
  import {useModal} from "@/components/Modal";

  export default defineComponent({
    name: 'FileManagement',
    components: {ApplyJobModal, EditJobModal, BasicTable, KbsFileDrawer, TableAction,UploadFileModal },
    setup() {
      const [registerVerifyJobModal, { openModal: verifyJobModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '文档列表',
        api: getKbsFileListByPage,
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
        verifyJobModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteKbsFile(record);
        await reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        registerVerifyJobModal,
        verifyJobModal
      };
    },
  });
</script>
