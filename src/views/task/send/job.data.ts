import {BasicColumn, FormSchema} from '/@/components/Table';
import {formatToDateTime} from '@/utils/dateUtil';
import {JobStatus} from '@/api/job/model/jobModel';
import {getUserList} from '@/api/user/user';
import {h} from "vue";
import {Tag} from "ant-design-vue";

export function getStatusName(status: JobStatus) {
  switch (status) {
    case JobStatus.Canceled:
      return h(Tag, {color: 'red'}, () => '已取消');
    case JobStatus.FinalCheck:
      return h(Tag, {color: 'purple'}, () => '待审核');
    case JobStatus.Done:
      return h(Tag, {color: 'green'}, () => '已完成');
    case JobStatus.InProgress:
      return h(Tag, {color: 'blue'}, () => '进行中');
    case JobStatus.Todo:
    default:
      return h(Tag, {color: ''}, () => '未开始');
  }
}

export const columns: BasicColumn[] = [
  {
    title: '任务标题',
    dataIndex: 'jobsName',
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
    customRender: ({record}) => {
      return getStatusName(record.jobStatus);
    },
  },
  {
    title: '负责人',
    dataIndex: 'supervisorUserName',
    width: 200,
  },
  {
    title: '执行人',
    dataIndex: 'jobUsers',
    width: 200,
  },
  {
    title: '发布时间',
    dataIndex: 'creationTime',
    width: 200,
    customRender: ({record}) => {
      return formatToDateTime(record.creationTime);
    }
  },
];

export const options = [
  {label: getStatusName(JobStatus.Todo), value: JobStatus.Todo},
  {label: getStatusName(JobStatus.InProgress), value: JobStatus.InProgress},
  {label: getStatusName(JobStatus.FinalCheck), value: JobStatus.FinalCheck},
  {label: getStatusName(JobStatus.Done), value: JobStatus.Done},
  {label: getStatusName(JobStatus.Canceled), value: JobStatus.Canceled},
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobsName',
    label: '任务标题',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    field: 'jobStatus',
    label: '任务状态',
    component: 'Select',
    componentProps: {
      options: options
    },
    colProps: {span: 8},
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
    field: 'jobsName',
    label: '任务标题',
    required: true,
    component: 'Input',
  },
  {
    field: 'jobStatus',
    label: '任务状态',
    component: 'Select',
    defaultValue: JobStatus.Todo,
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
    componentProps:{
      mode: 'date'
    }
  },
  {
    field: 'endDate',
    label: '结束日期',
    component: 'DatePicker',
    required: true,
    defaultValue: new Date(),
    componentProps:{
      mode: 'date'
    }
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
    field: 'executorId',
    label: '执行人',
    component: 'ApiSelect',
    defaultValue: null,
    required: true,
    componentProps: {
      api: getUserList,
      labelField: 'name',
      valueField: 'id',
    },
   },
  // {
  //   field: 'jobUsers',
  //   label: '执行人',
  //   component: 'ApiSelect',
  //   defaultValue: [],
  //   required: true,
  //   componentProps: {
  //     api: getUserList,
  //     mode:'multiple',
  //     labelField: 'name',
  //     valueField: 'id',
  //   },
  // },
  {
    field: 'description',
    label: '任务简介',
    component: 'InputTextArea',
    componentProps: {
      rows: 20
    },
  },
];
