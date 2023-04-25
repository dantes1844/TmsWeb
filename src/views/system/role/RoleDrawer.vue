<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :checkedKeys="checkedKeys"
          :fieldNames="{ title: 'label', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree } from '/@/components/Tree';

  import { createRole, RolePermissionModel, updateRole } from "/@/api/role/role";
  import { getAllPermissions } from '/@/api/role/role';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup: function (_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<RolePermissionModel[]>([]);
      const checkedKeys = ref<String[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          try {
            const roleName = data?.record?.name as string;
            const { tree } = await getAllPermissions({ roleName: roleName });
            treeData.value = tree;
          } catch (err) {}
        }
        isUpdate.value = !!data?.isUpdate;
        checkedKeys.value = data?.record?.permissions;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          const role = Object.assign({}, values);
          if (!role.id || role.id == '') {
            await createRole(role);
          } else {
            await updateRole(role);
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        checkedKeys,
      };
    },
  });
</script>
