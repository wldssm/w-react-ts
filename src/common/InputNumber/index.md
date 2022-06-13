---
title: InputNumber 计数器
group:
  title: '通用'
---

## InputNumber 计数器

Demo:

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React, { useState } from 'react';
import { WInputNumber } from 'w-react-ts';

export default () => {
  const [value, setValue] = useState(10);
  const change = (val) => {
    setValue(val);
  };
  const add = () => {
    setValue((Number(value) || 0) + 1);
  };
  const minus = () => {
    setValue((Number(value) || 0) - 1);
  };
  return <WInputNumber value={value} change={change} enlarge={add} narrow={minus} />;
};
```

### API

| 参数      | 说明                 | 类型                   | 默认值 |
| --------- | -------------------- | ---------------------- | ------ |
| value     | 绑定值               | string                 | -      |
| name      | 绑定输入框 name      | string                 | -      |
| suffix    | 携带后缀（例：%）    | string                 | -      |
| className | 头部类名             | string                 | -      |
| change    | 输入框改变时触发     | function(value, name)) | -      |
| onEnter   | 输入框回车时触发     | function(name)         | -      |
| onFocus   | 输入框获得焦点时触发 | function(name)         | -      |
| onBlur    | 输入框失去焦点时触发 | function(name)         | -      |
| enlarge   | 点击放大时触发       | function()             | -      |
| narrow    | 点击缩小时触发       | function()             | -      |
