import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setRoleStatus } from '/@/api/role/role';

export const columns: BasicColumn[] = [
  {
    title: '文件名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '默认文件',
    dataIndex: 'isDefault',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.isDefault,
        checkedChildren: '是',
        unCheckedChildren: '否',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.isDefault = newStatus;
              createMessage.success(`已成功修改文件状态`);
            })
            .catch(() => {
              createMessage.error('修改文件状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
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
    field: 'isDefault',
    label: '默认文件',
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
    field: 'name',
    label: '文件名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'isDefault',
    label: '默认文件',
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
