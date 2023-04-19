import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const taskRoute: AppRouteModule = {
  path: '/task',
  name: 'Task',
  component: LAYOUT,
  redirect: '/task/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '任务管理',
  },
  children: [
    {
      path: 'index',
      name: 'TaskIndex',
      component: () => import('/@/views/task/index/index.vue'),
      meta: {
        // affix: true,
        title: '任务模板',
      },
    },
    {
      path: 'search',
      name: 'TaskSearch',
      component: () => import('/@/views/task/search/index.vue'),
      meta: {
        // affix: true,
        title: '任务查询',
      },
    },
    {
      path: 'send',
      name: 'TaskSend',
      component: () => import('/@/views/task/send/index.vue'),
      meta: {
        // affix: true,
        title: '任务下发',
      },
    },
  ],
};

export default taskRoute
