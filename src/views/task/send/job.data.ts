import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDate, formatToDateTime } from '@/utils/dateUtil';
import { getStatusName, JobStatus } from '@/api/job/model/jobModel';
import { getUserList } from '@/api/user/user';
import { getJobList } from '@/api/job/job';

export const columns: BasicColumn[] = [
  {
    title: '任务标题',
    dataIndex: 'jobName',
    width: 200,
    align: 'left',
  },
  {
    title: '任务描述',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: '任务状态',
    dataIndex: 'jobStatus',
    width: 100,
    customRender: ({ record }) => {
      return getStatusName(record.jobStatus);
    },
  },
  {
    title: '负责人',
    dataIndex: 'supervisorUserName',
    width: 100,
  },
  {
    title: '执行人',
    dataIndex: 'executorName',
    width: 100,
  },
  {
    title: '计划开始时间',
    dataIndex: 'startDate',
    width: 120,
    customRender: ({ record }) => {
      return formatToDate(record.startDate);
    }
  },
  {
    title: '计划结束时间',
    dataIndex: 'endDate',
    width: 120,
    customRender: ({ record }) => {
      return formatToDate(record.endDate);
    }
  },
  {
    title: '发布时间',
    dataIndex: 'creationTime',
    width: 160,
    customRender: ({ record }) => {
      return formatToDateTime(record.creationTime);
    }
  },
];

export const options = [
  { label: getStatusName(JobStatus.Todo), value: JobStatus.Todo },
  { label: getStatusName(JobStatus.InProgress), value: JobStatus.InProgress },
  { label: getStatusName(JobStatus.FinalCheck), value: JobStatus.FinalCheck },
  { label: getStatusName(JobStatus.Done), value: JobStatus.Done },
  { label: getStatusName(JobStatus.Canceled), value: JobStatus.Canceled },
];

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
    componentProps: {
      mode: 'date'
    }
  },
  {
    field: 'endDate',
    label: '结束日期',
    component: 'DatePicker',
    required: true,
    defaultValue: new Date(),
    componentProps: {
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
export const editSubJobFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '唯一编号',
    component: 'InputNumber',
    required: false,
    show: false,
  },
  {
    field: 'parentId',
    label: '父级任务',
    component: 'ApiSelect',
    componentProps: {
      api: getJobList,
      disabled: true,
      labelField: 'jobName',
      valueField: 'id',
      params: {
        jobStatus: JobStatus.Todo
      }
    },
  },
  {
    field: 'supervisorUserName',
    label: '负责人',
    component: 'Input',
    defaultValue: '',
    required: true,
    componentProps: {
      disabled: true
    }
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
    componentProps: {
      mode: 'date'
    }
  },
  {
    field: 'endDate',
    label: '结束日期',
    component: 'DatePicker',
    required: true,
    defaultValue: new Date(),
    componentProps: {
      mode: 'date'
    }
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
  {
    field: 'description',
    label: '任务简介',
    component: 'InputTextArea',
    colProps:{ span: 24 },
    componentProps: {
      rows: 10,
    },
  },
];

export const commitWorkProgressSchema: FormSchema[] = [
  {
    field: 'jobId',
    label: '任务',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getJobList,
      labelField: 'jobName',
      valueField: 'id',
      params: {
        jobStatus: JobStatus.InProgress
      }
    },
  },
  {
    field: 'percent',
    label:'进度',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'feedback',
    label: '说明',
    component: 'InputTextArea',
    componentProps: {
      rows: 5
    }
  }
];

export const milestoneSchema: FormSchema[] = [
  {
    field: 'jobId',
    label: '任务',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getJobList,
      labelField: 'jobName',
      valueField: 'id',
      params: {
        jobStatus: JobStatus.InProgress
      }
    },
  },
  {
    field: 'percent',
    label:'里程碑名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'percent',
    label:'截止时间',
    required: true,
    component: 'DatePicker',
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
    field: 'percent',
    label:'目标',
    required: true,
    component: 'InputTextArea',
    componentProps:{
      rows: 3
    }
  },
  {
    field: 'feedback',
    label: '完成标准',
    required: true,
    component: 'InputTextArea',
    componentProps: {
      rows: 3
    }
  },
  {
    field: 'feedback',
    label: '验收标准',
    required: true,
    component: 'InputTextArea',
    componentProps: {
      rows: 3
    }
  }
];
