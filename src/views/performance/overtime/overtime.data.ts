import { BasicColumn, FormSchema } from '/@/components/Table';
import {getUserList} from "@/api/user/user";
import { formatToDate } from '@/utils/dateUtil';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '人员',
    dataIndex: 'userName',
  },
  {
    title: '日期',
    dataIndex: 'date',
    customRender:({record})=>{
      return formatToDate(record.date);
    }
  },
  {
    title: '加班时长(小时)',
    dataIndex: 'hours',
  },
  {
    title: '工作内容',
    dataIndex: 'content',
    width: 400
  },
  {
    title: '状态',
    dataIndex: 'isVerified',
    customRender:({record})=>{
      const status = record.isVerified;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '已审核' : '待审核';
      return h(Tag, { color: color }, () => text);

    }
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '人员',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'minScore',
    label: '最低分',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'minScore',
    label: '最高分',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
  field: 'range',
    label: '时间段',
    component: 'RangePicker',
    colProps: { span: 8 },
    componentProps:{

    }
  }
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
    }
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
    componentProps:{
      rows:3
    }
  },
];
