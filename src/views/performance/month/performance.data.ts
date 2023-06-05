import { BasicColumn, FormSchema } from '/@/components/Table';
import { uploadApi } from '@/api/sys/upload';

import { h } from 'vue';
import { Progress } from 'ant-design-vue';
import {getUserList} from "@/api/user/user";

export const columns: BasicColumn[] = [
  {
    title: '人员',
    dataIndex: 'user',
  },
  {
    title: '总分',
    dataIndex: 'score',
  },
  {
    title: '任务总数',
    dataIndex: 'totalJob',
  },
  {
    title: '完成数量',
    dataIndex: 'finishedJob',
  },
  {
    title: '平均分数',
    dataIndex: 'averageScore',
  },
  {
    title: '完成比例',
    dataIndex: 'percent',
    customRender: ({ record }) => {
      const percent = record.percent;
      return h(Progress, { percent: percent }, () => percent);
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '人员',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'minScore',
    label: '最低分',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'minScore',
    label: '最高分',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
  field: 'range',
    label: '时间段',
    component: 'RangePicker',
    colProps: { span: 8 },
    componentProps:{

    }
  }
];
export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '唯一编号',
    component: 'InputNumber',
    required: false,
    show: false,
  },
  {
    field: 'title',
    label: '通知标题',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '通知状态',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '已发布', value: true },
        { label: '待发布', value: false },
      ],
    },
  },
  {
    field: 'content',
    label: '通知内容',
    component: 'InputTextArea',
    componentProps: {
      rows: 20
    },
  },
  {
    field: 'files',
    component: 'Upload',
    label: '附件',
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
    },
  }
];

export const overtimeSchema: FormSchema[] = [
  {
    field: 'startDate',
    label: '加班日期',
    component: 'DatePicker',
    required: true,
    defaultValue: new Date(),
    componentProps: {
      mode: 'date',
    }
  },
  {
    field: 'totalHours',
    label: '工时(小时)',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'supervisorId',
    label: '负责人',
    component: 'ApiSelect',
    defaultValue: '',
    required: true,
    componentProps: {
      api: getUserList,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'workContent',
    label: '工作内容',
    component: 'InputTextArea',
    componentProps:{
      rows:3
    }
  },
];
