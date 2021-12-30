---
title: Tooltip 文字提示
group:
  title: '通用'
---

## Tooltip 文字提示

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { WTooltip } from 'w-react-ts';

const styles = {
  background: 'rgb(148 148 148)',
  color: '#fff',
};

export default () => (
  <>
    <WTooltip content="提示">
      <span style={styles}>鼠标移上显示</span>
    </WTooltip>
  </>
);
```

### API

| 属性      | 说明         | 类型                                 | 默认值 |
| --------- | ------------ | ------------------------------------ | ------ |
| content   | 提示文本内容 | string \| React.ReactNode            | -      |
| dir       | 提示显示位置 | 'top' \| 'bottom' \| 'left' \| right | 'top'  |
| className | 类名         | string                               | -      |
