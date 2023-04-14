import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/task',
  name: 'Task',
  component: LAYOUT,
  redirect: '/task/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '任务',
  },
  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('/@/views/task/index/index.vue'),
      meta: {
        // affix: true,
        title: '看板',
      },
    },
  ],
};

export default dashboard;
