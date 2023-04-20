import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '文件名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '文件类型',
    dataIndex: 'extension',
    width: 200,
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    width: 200,
  },
  {
    title: '文档分类',
    dataIndex: 'type',
    width: 200,
  },
  {
    title: '上传人员',
    dataIndex: 'userName',
    width: 200,
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '文件名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'userName',
    label: '上传人员',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'isDefault',
    label: '文档分类',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    colProps: { span: 8 },
  },
];
