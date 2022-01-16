---
title: WRadio 单选
group:
  title: '通用'
---

## WRadio 单选

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React from 'react';
import { WRadio } from 'w-react-ts';

export default () => <WRadio value={true} />;
```

### API

| 参数      | 说明               | 类型            | 默认值 |
| --------- | ------------------ | --------------- | ------ |
| value     | 是否选中           | boolean         | false  |
| disabled  | 是否禁用           | boolean         | false  |
| dir       | 文本显示在左还是右 | 'right'\|其他   | 右     |
| className | 类名               | string          | -      |
| onClick   | 单击改变值         | function(value) | -      |
