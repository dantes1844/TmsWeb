import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '分类名称',
    dataIndex: 'typeName',
    width: 200,
  },
  {
    title: '创建者',
    dataIndex: 'userName',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'sequence',
    width: 200,
  },
  {
    title: '内置分类',
    dataIndex: 'isStatic',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.isStatic,
        checkedChildren: '是',
        unCheckedChildren: '否',
        loading: record.pendingStatus,
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'typeName',
    label: '分类名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'isStatic',
    label: '内置分类',
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

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '唯一编号',
    component: 'InputNumber',
    required: false,
    show: false,
  },
  {
    field: 'typeName',
    label: '分类名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'sequence',
    label: '排序',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'isStatic',
    label: '内置分类',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
];
