---
title: Switch 开关
group:
  title: '通用'
---

## Switch 开关

Demo:

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React from 'react';
import { WSwitch } from 'w-react-ts';

export default () => <WSwitch />;
```

### API

| 参数      | 说明               | 类型                  | 默认值 |
| --------- | ------------------ | --------------------- | ------ |
| value     | 绑定值             | boolean               | false  |
| name      | 绑定名称           | string                | -      |
| disabled  | 禁用               | boolean               | false  |
| width     | 宽度               | string                | -      |
| className | 类名               | string                | -      |
| change    | 点击状态改变时触发 | function(name, value) | -      |
