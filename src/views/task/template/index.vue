<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleVerifyMultipleApply"> 生成任务 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip:'生成任务',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useDrawer } from '/@/components/Drawer';
import { columns, searchFormSchema } from './performance.data';
import {useModal} from "@/components/Modal";
import { UpdateOvertime } from '@/api/overtime/model';
import {useRouter} from "vue-router";
import {getJobTemplatePages} from "@/api/job/jobTemplates";

export default defineComponent({
  components: {
    BasicTable,
    TableAction },
  setup() {
    const applyIds = ref<String[]>([]);
    const [registerVerifyJobModal, { openModal: verifyJobModal }] = useModal();
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload }] = useTable({
      title: '任务模板',
      api: getJobTemplatePages,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      rowSelection:{
        onSelect(record,selected){
          if(selected){
            applyIds.value.push(record.id)
          }else{
            let index = -1;
            for (let i=0;i<applyIds.value.length;i++){
              if(applyIds.value[i]==record.id){
                index = i;
                break;
              }
            }
            applyIds.value.splice(index, 1);
          }
          console.log(applyIds)
        },
        onSelectAll(selected,records){
          applyIds.value = [];
          if(selected){
            for (let i=0;i<records.length;i++){
              applyIds.value.push(records[i].id)
            }
          }
          console.log(applyIds)
        }
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
    function handleVerifyMultipleApply() {
      verifyJobModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: UpdateOvertime) {
      const router = useRouter();
      router.push('')
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
      handleOvertimeApply,
      handleVerifyMultipleApply
    };
  },
});
</script>
