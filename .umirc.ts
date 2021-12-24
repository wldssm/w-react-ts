import { defineConfig } from 'dumi';

export default defineConfig({
  hash: true,
  title: 'w-react-ts',
  favicon: './logo.png',
  logo: './logo.png',
  outputPath: 'dist',
  publicPath: './',
  history: {
    type: 'hash',
  },
  // more config: https://d.umijs.org/config
});
