import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Button, Tag } from "ant-design-vue";
import { getAllFileTypeList } from "@/api/file/filetype/filetype";

export const columns: BasicColumn[] = [
  {
    title: '文件名称',
    dataIndex: 'fileName',
    width: 200,
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    width: 80,
  },
  {
    title: '文件类型',
    dataIndex: 'fileTypeName',
    width: 80,
  },
  {
    title: '文件后缀',
    dataIndex: 'extension',
    width: 80,
  },
  {
    title: '上传者',
    dataIndex: 'creatorName',
    width: 80,
  },
  {
    title: '是否审核',
    dataIndex: 'isPublic',
    width: 80,
    customRender: ({ record }) => {
      const status = record.isPublic;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '已审核' : '未审核';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '下载查看',
    dataIndex: 'filePath',
    width: 200,
    customRender: ({ record }) => {
      return h(Button, { type: 'link' }, () => record.filePath);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fileName',
    label: '文件名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'extension',
    label: '文件后缀',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'isPublic',
    label: '是否发布',
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
    field: 'fileTypeId',
    label: '文件分类',
    required: true,
    component: 'ApiSelect',
    componentProps:{
      api: getAllFileTypeList,
      // use name as label
      labelField: 'typeName',
      // use id as value
      valueField: 'id',
    }
  },
  {
    field: 'fileName',
    label: '文件名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'size',
    label: '文件大小',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'extension',
    label: '文件后缀',
    required: true,
    component: 'Input',
  },
];
