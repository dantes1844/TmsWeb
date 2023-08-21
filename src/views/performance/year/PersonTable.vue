<template>
  <div>
    <BasicTable @register="registerTable" @edit-change="handleEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record, column)" />
        </template>
      </template>
    </BasicTable>
    <a-button block class="mt-5" type="dashed" @click="handleAdd"> 新增成员 </a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';
  import {getUserList} from "@/api/user/user";

  const columns: BasicColumn[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
    },
    {
      title: '主站负责人',
      dataIndex: 'supervisorId',
      editRow: true,
      editComponent: 'ApiSelect',
      editComponentProps:{
        api: getUserList,
        labelField: 'name',
        valueField: 'id',
      }
    },
    {
      title: '站端调试人',
      dataIndex: 'executorId',
      editRow: true,
      editComponent: 'ApiSelect',
      editComponentProps:{
        api: getUserList,
        labelField: 'name',
        valueField: 'id',
      }
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      editRow: true,
      editComponent: 'DatePicker'
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      editRow: true,
      editComponent: 'DatePicker'
    },
    {
      title: '备注/遗留问题',
      dataIndex: 'description',
      editRow: true,
    },
  ];

  const data: any[] = [
    {
      name: 'EMS系统图形变更',
    },
    {
      name: '站名颜色设置（新建站）',
    },
    {
      name: 'EMS系统数据库变更',
    },
    {
      name: '厂站端信息点表编制',
    },
    {
      name: '调度数据网设备调试',
    },
    {
      name: '二次安防设备调试',
    },
    {
      name: 'EMS系统远动通道规约调试',
    },
    {
      name: 'EMS系统远动通道前置切换调试',
    },
    {
      name: '站端电量采集系统调试',
    },
    {
      name: 'PAS设备参数设置及建模',
    },
    {
      name: 'AVC策略参数设置及建模',
    },
    {
      name: 'OMS台账录入',
    },
    {
      name: '调控云台账录入',
    },
  ];
  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { getDataSource }] = useTable({
        columns: columns,
        showIndexColumn: false,
        dataSource: data,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
        scroll: { y: '100%' },
        pagination: false,
      });

      function handleEdit(record: EditRecordRow) {
        record.onEdit?.(true);
      }

      function handleCancel(record: EditRecordRow) {
        record.onEdit?.(false);
        if (record.isNew) {
          const data = getDataSource();
          const index = data.findIndex((item) => item.key === record.key);
          data.splice(index, 1);
        }
      }

      function handleSave(record: EditRecordRow) {
        record.onEdit?.(false, true);
      }

      function handleEditChange(data: Recordable) {
        console.log(data);
      }

      function handleAdd() {
        const data = getDataSource();
        const addRow: EditRecordRow = {
          name: '',
          no: '',
          dept: '',
          editable: true,
          isNew: true,
          key: `${Date.now()}`,
        };
        data.push(addRow);
      }

      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
            },
          ];
        }
        return [
          {
            label: '保存',
            onClick: handleSave.bind(null, record),
          },
          {
            label: '取消',
            popConfirm: {
              title: '是否取消编辑',
              confirm: handleCancel.bind(null, record),
            },
          },
        ];
      }

      return {
        registerTable,
        handleEdit,
        createActions,
        handleAdd,
        getDataSource,
        handleEditChange,
      };
    },
  });
</script>
