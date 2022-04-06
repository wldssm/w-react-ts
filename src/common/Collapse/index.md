---
title: Collapse 折叠面板
group:
  title: '通用'
---

## Collapse 折叠面板

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#0E3058"
 */
import React, { useState } from 'react';
import { WCollapse } from 'w-react-ts';

let [fold, setFold] = useState(false),
  [checked, setChecked] = useState(false);

const switchFold = (val) => {
  setFold(val);
};
const switchCheck = (val) => {
  setChecked(val);
};

export default () => (
  <WCollapse title="标题" fold={fold} checked={checked} change={switchFold} check={switchCheck}>
    内容
  </WCollapse>
);
```

### API

| 参数       | 说明               | 类型             | 默认值 |
| ---------- | ------------------ | ---------------- | ------ |
| title      | 标题               | string           | -      |
| fold       | 是否折叠           | boolean          | true   |
| checked    | 是否选中           | boolean          | false  |
| showArrow  | 没有子节点是否占位 | boolean          | false  |
| insertHead | 插入头部的内容     | any              | -      |
| className  | 类名               | string           | -      |
| check      | 选中状态改变时触发 | function(val, e) | -      |
| change     | 折叠状态改变时触发 | function(val, e) | -      |
