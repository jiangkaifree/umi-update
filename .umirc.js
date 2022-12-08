import { defineConfig } from 'umi';

export default defineConfig({
  // runtimePublicPath: true,
  // treeShaking: true,
  antd: {},
  routes: [
    {
      path: '/',
      component: '@/pages/index'
    },
    // {
    //   path: '/http',
    //   component: '@/pages/https/https'
    // }

  ],
  // plugins: [
  //   // ref: https://umijs.org/plugin/umi-plugin-react.html
  //   [
  //     'umi-plugin-react',
  //     {
  //       antd: true,
  //       dva: true,
  //       dynamicImport: {
  //         webpackChunkName: true,
  //         loadingComponent: './components/PageLoading/index',
  //       },
  //       title: '透明传输加密管理后台',
  //       dll: true,
  //       links: [{ rel: 'icon', href: '/favicon.png' }],
  //       routes: {
  //         exclude: [
  //           /models\//,
  //           /services\//,
  //           /model\.(t|j)sx?$/,
  //           /service\.(t|j)sx?$/,
  //           /components\//,
  //           /constants\//,
  //         ],
  //       },
  //     },
  //   ],
  // ],
  // dva: {},
  // antd: {},
  // uglifyJSOptions: {
  //   parallel: false,
  //   sourceMap: false,
  //   uglifyOptions: {
  //     compress: {
  //       drop_console: true, // 去除console
  //       drop_debugger: true, // 去掉debug
  //     },
  //   },
  // },
});
