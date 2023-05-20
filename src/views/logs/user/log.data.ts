import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户',
    dataIndex: 'userName',
  },
  {
    title: 'IP',
    dataIndex: 'clientIpAddress',
  },
  {
    title: '请求路径',
    dataIndex: 'url',
    width: 200,
  },
  {
    title: '请求方法',
    dataIndex: 'httpMethod',
  },
  {
    title: '状态码',
    dataIndex: 'httpStatusCode',
  },
  {
    title: '时间',
    dataIndex: 'executionTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'url',
    label: '请求路径',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'clientIpAddress',
    label: 'IP',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'httpMethod',
    label: '请求方法',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'httpStatusCode',
    label: '状态码',
    component: 'Input',
    colProps: { span: 8 },
  },
];
