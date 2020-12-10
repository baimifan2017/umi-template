import path, { resolve } from 'path';
import webpackPlugin from './plugin.config';
import pageRoutes from './router.config';
import proxy from './proxy.config';
import themeConfig from './theme.config';

const pkg = path.join(__dirname, '../package.json');
const { name } = require(pkg);

export default {
  history: 'hash',
  hash: true,
  treeShaking: true,
  ignoreMomentLocale: true,
  targets: { ie: 11 },
  base: `el-web/`,
  publicPath: `el-web/`,
  mountElementId: name,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        dynamicImport: {
          webpackChunkName: true,
          // loadingComponent: './components/Loader',
        },
        title: '资金管理系统',
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        pwa:
          process.env.NODE_ENV === 'production'
            ? {
              workboxPluginMode: 'InjectManifest',
              workboxOptions: {
                importWorkboxFrom: 'local',
              },
            }
            : false,
        locale: {
          enable: true,
          default: 'zh-CN',
          baseNavigator: false,
          antd: true,
        },
      },
    ],
  ],
  routes: pageRoutes,
  proxy,
  theme: themeConfig(),
  alias: {
    '@': resolve(__dirname, './src'),
    components: resolve(__dirname, './src/components'),
    models: resolve(__dirname, './src/models'),
    utils: resolve(__dirname, './src/utils'),
    themes: resolve(__dirname, './src/themes'),
    services: resolve(__dirname, './src/services'),
  },
  define: {
    'process.env.MOCK': process.env.MOCK,
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
};
