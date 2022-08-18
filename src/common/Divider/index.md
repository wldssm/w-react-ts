---
title: Divider 分割线
group:
  title: '通用'
---

## Divider 分割线

Demo:

```tsx
/**
 * defaultShowCode: true
 * background: "#0E3058"
 */
import React, { Fragment } from 'react';
import { WDivider } from 'w-react-ts';

export default () => (
  <Fragment>
    <WDivider posi="left">水平分割线</WDivider>
    <div style={{ fontSize: '16px', color: '#fff' }}>
      左
      <WDivider dir="vertical" />右
    </div>
  </Fragment>
);
```

### API

| 参数 | 说明                 | 类型                                   | 默认值     |
| ---- | -------------------- | -------------------------------------- | ---------- |
| dir  | 分割线方向           | horizontal【水平】 \| vertical【垂直】 | horizontal |
| posi | 水平分割线文本的位置 | left \| right \| center                | center     |
