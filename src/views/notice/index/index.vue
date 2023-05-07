<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 发布通知 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon:'bi:eye',
                tooltip:'查看附件',
                disabled: record.files.length===0,
                onClick:handlePreview.bind(null,record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip:'修改',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip:'删除',
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
    <NoticeDrawer @register="registerDrawer" @success="handleSuccess" />


    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import NoticeDrawer from './NoticeDrawer.vue';

  import { columns, searchFormSchema } from './notice.data';
  import { getNoticePages, deleteNotice } from '/@/api/notice/notice';
  import {CreateNoticeModel, NoticeDetail} from '/@/api/notice/model/noticeModel';
  import UploadModal from "@/components/Upload/src/UploadModal.vue";
  import UploadPreviewModal from "@/components/Upload/src/UploadPreviewModal.vue";
  import {PreviewFileItem} from "@/components/Upload/src/typing";
  import {UploadApiResult} from "@/api/sys/model/uploadModel";
  import {useModal} from "@/components/Modal";

  export default defineComponent({
    name: 'NoticeManagement',
    components: {UploadPreviewModal, UploadModal, BasicTable, NoticeDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '通知列表',
        api: getNoticePages,
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

      function handleEdit(record: CreateNoticeModel) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      const fileList = ref<UploadApiResult[]>([]);
      function handlePreview(record:NoticeDetail){
        fileList.value = record.files
        openPreviewModal()
      }

      async function handleDelete(record: NoticeDetail) {
        await deleteNotice(record.id);
        await reload();
      }

      function handleSuccess() {
        reload();
      }

      function handlePreviewDelete(){

      }
      //   预览modal
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();

      function handlePreviewChange(){

      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handlePreview,
        fileList,
        registerPreviewModal,
        handlePreviewChange,
        handlePreviewDelete,
      };
    },
  });
</script>
