---
title: Button 按钮
group:
  title: '通用'
---

## Button 按钮

### Demo

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { WButton } from 'w-react-ts';

export default () => <WButton icon="&#xe62b;">按钮</WButton>;
```

### API

| 参数        | 说明         | 类型              | 默认值 |
| ----------- | ------------ | ----------------- | ------ |
| showLoading | 显示加载中   | boolean           | false  |
| disabled    | 禁用按钮     | boolean           | false  |
| icon        | 按钮 icon    | string【unicode】 | -      |
| width       | 按钮宽度     | string            | -      |
| className   | 类名         | string            | -      |
| onClick     | 按钮单击事件 | function(e)       | -      |
