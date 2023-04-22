import {BasicColumn, FormSchema} from '/@/components/Table';
import {formatToDateTime} from '@/utils/dateUtil';
import {JobStatus} from '@/api/job/model/jobModel';
import {getUserList} from '@/api/user/user';

export function getStatusName(status: JobStatus){
  switch (status){
    case JobStatus.UnStart:
      return "未开始";
    case JobStatus.Canceled:
      return '已取消';
    case JobStatus.Agreement:
      return '待审核';
    case JobStatus.Finished:
      return '已完成';
    case JobStatus.Doing:
      return '进行中';
    default:
      return '未开始';
  }
}

export const columns: BasicColumn[] = [
  {
    title: '任务标题',
    dataIndex: 'jobName',
    width: 200,
  },
  {
    title: '任务描述',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: '任务状态',
    dataIndex: 'jobStatus',
    width: 200,
    customRender: ({ record }) => {
      return getStatusName(record.jobStatus);
    },
  },
  {
    title: '负责人',
    dataIndex: 'supervisorUserName',
    width: 200,
  },
  {
    title: '发布时间',
    dataIndex: 'creationTime',
    width: 200,
    customRender:({record})=>{
      return formatToDateTime(record.creationTime);
    }
  },
];

export const options = [
  { label: getStatusName(JobStatus.UnStart), value: JobStatus.UnStart },
  { label: getStatusName(JobStatus.Canceled), value: JobStatus.Canceled },
  { label: getStatusName(JobStatus.Doing), value: JobStatus.Doing },
  { label: getStatusName(JobStatus.Agreement), value: JobStatus.Agreement },
  { label: getStatusName(JobStatus.Finished), value: JobStatus.Finished },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobName',
    label: '任务标题',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'jobStatus',
    label: '任务状态',
    component: 'Select',
    componentProps: {
      options: options
    },
    colProps: { span: 8 },
  },
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
    field: 'jobName',
    label: '任务标题',
    required: true,
    component: 'Input',
  },
  {
    field: 'jobStatus',
    label: '任务状态',
    component: 'Select',
    defaultValue: false,
    componentProps: {
      options: options
    },
  },
  {
    field: 'startDate',
    label: '开始日期',
    component: 'DatePicker',
    required: true,
    defaultValue: new Date(),
  },
  {
    field: 'endDate',
    label: '结束日期',
    component: 'DatePicker',
    required: true,
    defaultValue: new Date(),
  },
  {
    field: 'supervisorId',
    label: '负责人',
    component: 'ApiSelect',
    defaultValue: false,
    required: true,
    componentProps: {
      api: getUserList,
      labelField: 'userName',
      valueField: 'id',
    },
  },
  {
    field: 'description',
    label: '任务简介',
    component: 'InputTextArea',
    componentProps: {
      rows: 20
    },
  },
];
