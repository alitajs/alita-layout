import { join } from 'path';

export default {
  appType: 'h5',
  chainWebpack: (config: any) => {
    config.module
      .rule('js')
      .test(/\.(js|mjs|jsx|ts|tsx)$/)
      .include.add(join(__dirname, '..', '..', 'src'))
      .end()
      .exclude.add(/node_modules/)
      .end()
      .use('babel-loader');
  },
};
