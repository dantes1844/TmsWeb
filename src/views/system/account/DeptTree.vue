<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      :selectedKeys="checkedKeys"
      :fieldNames="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
      ref="treeRef"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, unref } from 'vue';

import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
  import { getDeptList } from '/@/api/department/dept';
  import { bus, EventBusType } from '/@/utils/event/eventBus';
  import { DepartmentStatus, DeptListItem } from '@/api/department/model/deptModel';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const checkedKeys = ref<string[]>([]);

      const treeRef = ref<Nullable<TreeActionType>>(null);

      async function fetch() {
        const options = { status: DepartmentStatus.Enabled }  as DeptListItem;
        treeData.value = (await getDeptList(options)) as unknown as TreeItem[];
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      onMounted(async () => {
        await fetch();
        bus.on(EventBusType.ResetDeptId, () => {
          checkedKeys.value = [];
        });
        const tree = unref(treeRef);
        tree?.expandAll(true)
      });
      return { treeData, handleSelect, checkedKeys, treeRef };
    },
  });
</script>
