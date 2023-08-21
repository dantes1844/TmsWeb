import { BasicColumn, FormSchema } from '/@/components/Table';
import { uploadApi } from '@/api/sys/upload';
import { getUserList } from '@/api/user/user';
import { h } from 'vue';
import { Button } from 'ant-design-vue';
import { downloadByUrlData } from '@/utils/file/download';

export const columns: BasicColumn[] = [
  {
    title: '模板名称',
    dataIndex: 'templateName',
  },
  {
    title: '模板文件',
    dataIndex: 'templateFile',
    customRender: ({ record }) => {
      return h(
        Button,
        {
          type: 'link',
          onClick() {
            downloadByUrlData(record.templateFile, record.templateName, record.mimeType);
          },
        },
        () => '下载',
      );
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'templateName',
    label: '模板名称',
    component: 'Input',
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
      rows: 20,
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
  },
];

export const overtimeSchema: FormSchema[] = [
  {
    field: 'date',
    label: '加班日期',
    component: 'DatePicker',
    required: true,
    defaultValue: new Date(),
    componentProps: {
      mode: 'date',
    },
  },
  {
    field: 'hours',
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
    field: 'content',
    label: '工作内容',
    component: 'InputTextArea',
    componentProps: {
      rows: 3,
    },
  },
];
