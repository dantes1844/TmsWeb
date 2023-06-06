import { defineApplicationConfig } from '@vben/vite-config';

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      proxy: {
        '/connect': {
          target: 'http://localhost:44343',
          changeOrigin: true,
          ws: true,
        },
        '/api': {
          target: 'http://localhost:44343',
          changeOrigin: true,
          ws: true,
        },
        '/upload': {
          target: 'http://139.9.141.130:44343/api/kbs-files/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    },
  },
});
