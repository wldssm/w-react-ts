import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'w-react-ts',
  favicon: './img/logo.png',
  logo: './img/logo.png',
  outputPath: 'dist',
  publicPath: "./",
  history: {
    type: 'hash'
  }
  // more config: https://d.umijs.org/config
});
