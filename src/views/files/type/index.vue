<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增分类 </a-button>
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
    <FileTypeDrawer @register="registerDrawer" @success="handleSuccess" />
    <FileTypeModal @register="registereditFileTypeModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import FileTypeDrawer from './FileTypeDrawer.vue';
  import FileTypeModal from "@/views/files/type/FileTypeModal.vue";

  import { columns, searchFormSchema } from './types.data';
  import { getFileTypeListByPage, deleteFileType } from '/@/api/file/filetype/filetype';
  import UploadFileModal from "@/views/files/index/UploadFileModal.vue";
  import KbsFileDrawer from "@/views/files/index/KbsFileDrawer.vue";
  import {useModal} from "@/components/Modal";

  export default defineComponent({
    name: 'FileTypeManagement',
    components: {
      KbsFileDrawer,
      UploadFileModal,
      BasicTable,
      FileTypeDrawer,
      TableAction,
      FileTypeModal
    },
    setup() {
      const [registereditFileTypeModal, { openModal: editFileTypeModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '分类列表',
        api: getFileTypeListByPage,
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
        editFileTypeModal(true, {
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
        await deleteFileType(record);
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
        registereditFileTypeModal,
        editFileTypeModal
      };
    },
  });
</script>
