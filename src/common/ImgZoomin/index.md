---
title: ImgZoomin 图片缩放拖拽
group:
  title: '通用'
---

## ImgZoomin 图片缩放拖拽

### Demo

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { WImgZoomin } from 'w-react-ts';
import logo from '../../assets/img/logo.png';

export default () => (
  <div style={{ height: '300px', background: '#081D36' }}>
    <WImgZoomin src={logo} key={Math.random()} />
  </div>
);
```

**注：组件调用时需添加 key 属性。**

### API

| 参数      | 说明              | 类型             | 默认值             |
| --------- | ----------------- | ---------------- | ------------------ |
| src       | 图片 src 地址     | string           | -                  |
| scale     | 初始缩放比例%     | string \| number | 最大不超过容器宽高 |
| minScale  | 最小缩放比例%     | string \| number | 2，即（2%）        |
| maxScale  | 最大缩放比例%     | string \| number | 400，即（400%）    |
| className | 类名              | string           | -                  |
| onZoomin  | 获取当前缩放比例% | function(scale)  | -                  |

### Event

| 事件名    | 说明         | 参数                  | 默认值                |
| --------- | ------------ | --------------------- | --------------------- |
| zoominImg | 图片缩放事件 | 'narrow' \| 'enlarge' | 无参可设置 scale 属性 |
