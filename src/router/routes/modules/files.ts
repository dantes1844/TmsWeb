import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const taskRoute: AppRouteModule = {
  path: '/files',
  name: 'Files',
  component: LAYOUT,
  redirect: '/files/index',
  meta: {
    orderNo: 10,
    icon: 'ion:albums-outline',
    title: '知识库管理',
  },
  children: [
    {
      path: 'index',
      name: 'FilesIndex',
      component: () => import('/@/views/files/index/index.vue'),
      meta: {
        // affix: true,
        title: '文档列表',
      },
    },
    {
      path: 'audit',
      name: 'FilesAudit',
      component: () => import('/@/views/files/audit/index.vue'),
      meta: {
        // affix: true,
        title: '文档审核',
      },
    },
    {
      path: 'types',
      name: 'FileTypes',
      component: () => import('/@/views/files/type/index.vue'),
      meta: {
        // affix: true,
        title: '文档分类',
      },
    },
  ],
};

export default taskRoute
