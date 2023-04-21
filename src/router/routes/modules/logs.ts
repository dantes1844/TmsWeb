import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const logsRoute: AppRouteModule = {
  path: '/logs',
  name: 'Logs',
  component: LAYOUT,
  redirect: '/logs/system',
  meta: {
    orderNo: 10,
    icon: 'ion:book-outline',
    title: '日志管理',
  },
  children: [
    {
      path: 'system',
      name: 'SystemLogs',
      component: () => import('/@/views/logs/system/index.vue'),
      meta: {
        // affix: true,
        title: '系统日志',
      },
    },
    {
      path: 'user',
      name: 'UserLogs',
      component: () => import('/@/views/logs/user/index.vue'),
      meta: {
        // affix: true,
        title: '用户日志',
      },
    },
    {
      path: 'error',
      name: 'ExceptionLogs',
      component: () => import('/@/views/logs/exception/index.vue'),
      meta: {
        // affix: true,
        title: '错误日志',
      },
    },
  ],
};

export default logsRoute
