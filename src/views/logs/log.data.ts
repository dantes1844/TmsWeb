import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '等级',
    dataIndex: 'level',
    width: 80,
  },
  {
    title: '信息',
    dataIndex: 'message',
    width: 200,
  },
  {
    title: '其他属性',
    dataIndex: 'properties',
  },
  {
    title: '异常信息',
    dataIndex: 'exception',
  },
  {
    title: '时间',
    dataIndex: 'timestamp',
    width: 240,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'level',
    label: '等级',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'message',
    label: '信息',
    component: 'Input',
    colProps: { span: 8 },
  },
];
