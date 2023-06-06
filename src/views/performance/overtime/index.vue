<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleOvertimeApply"> 加班申请 </a-button>
        <a-button type="primary" @click="handleVerifyMultipleApply"> 批量审核 </a-button>
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
    <OvertimeModal @register="registerApplyOvertime" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import {useModal} from "@/components/Modal";
import { getOvertimePages } from '@/api/overtime';
import OvertimeModal from "./OvertimeModal.vue";
import { columns, searchFormSchema } from './overtime.data';
import { UpdateOvertime } from '@/api/overtime/model/overtimeModel';

export default defineComponent({
  name: 'OvertimeManagement',
  components: {
    BasicTable,
    TableAction,
    OvertimeModal
  },
  setup() {
    const applyIds = ref<String[]>([]);
    const [registerApplyOvertime, { openModal: applyOvertime }] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '加班管理',
      api: getOvertimePages,
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

    function handleOvertimeApply() {
      applyOvertime(true, {
        isUpdate: false,
      });
    }

    function handleVerifyMultipleApply() {
      applyOvertime(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: UpdateOvertime) {
      applyOvertime(true, {
        record,
        isUpdate: true,
      });
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerTable,
      handleEdit,
      handleSuccess,
      registerApplyOvertime,
      applyOvertime,
      handleOvertimeApply,
      handleVerifyMultipleApply
    };
  },
});
</script>
