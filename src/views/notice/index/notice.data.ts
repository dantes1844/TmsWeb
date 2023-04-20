import { BasicColumn, FormSchema } from '/@/components/Table';
import { NoticeType, NoticeTypeItem } from '@/api/notice/model/noticeModel';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Button } from 'ant-design-vue';


export const columns: BasicColumn[] = [
  {
    title: '通知标题',
    dataIndex: 'title',
    width: 200,
  },
  {
    title: '通知类型',
    dataIndex: 'noticeType',
    width: 200,
    customRender: ({ record }) => {
      const status = record.noticeType;
      const option = NoticeTypeOptions.find(c=>c.value==status);
      const color = 'blue';
      const text = option?.label;
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '通知状态',
    dataIndex: 'status',
    width: 200,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '已发布' : '待发布';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '附件',
    dataIndex: 'file',
    width: 200,
    customRender: ({ record }) => {
      const status = record.file;
      if(status && status!=''){
        return h(Button, { type: 'link' }, () => status);
      }
    },
  },
  {
    title: '发布时间',
    dataIndex: 'time',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '通知标题',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '默认状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已发布', value: true },
        { label: '待发布', value: false },
      ],
    },
    colProps: { span: 8 },
  },
];


export const NoticeTypeOptions: NoticeTypeItem[] = [
  { value: NoticeType.Update ,label: '升级' },
  { value: NoticeType.Task , label: '任务' },
  { value: NoticeType.Files ,label: '知识库' },
  { value: NoticeType.Others ,label: '其他' },
]

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
    field: 'noticeType',
    label: '通知类型',
    component: 'Select',
    defaultValue: false,
    required: true,
    componentProps: {
      options: NoticeTypeOptions,
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
    field: 'file',
    label: '附件',
    component: 'Input',
  },
];
