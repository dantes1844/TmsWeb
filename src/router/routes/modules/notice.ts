import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const noticesRoute: AppRouteModule = {
  path: '/notices',
  name: 'Notices',
  component: LAYOUT,
  redirect: '/notices/index',
  meta: {
    orderNo: 10,
    icon: 'ion:notifications-outline',
    title: '通知管理',
  },
  children: [
    {
      path: 'index',
      name: 'NoticeIndex',
      component: () => import('/@/views/notice/index/index.vue'),
      meta: {
        // affix: true,
        title: '通知列表',
      },
    },
  ],
};

export default noticesRoute
