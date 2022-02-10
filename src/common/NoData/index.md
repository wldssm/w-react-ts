---
title: NoData 暂无数据
group:
  title: '通用'
---

## NoData 暂无数据

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React from 'react';
import { WNoData } from 'w-react-ts';

export default () => <WNoData />;
```

### API

| 参数      | 说明         | 类型             | 默认值   |
| --------- | ------------ | ---------------- | -------- |
| title     | 显示的文本   | string           | 暂无数据 |
| img       | 显示的图片   | url \| ReactNode | default  |
| middle    | 是否垂直居中 | boolean          | false    |
| className | 类名         | string           | -        |
