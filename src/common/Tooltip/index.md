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

const test = (e, asd) => {
  // console.log(2323,e,asd)
  // console.log(2323,e)
};

export default () => (
  <>
    <WTooltip placement="bottomRight" title="7987">
      <span className="test" onMouseEnter={test.bind(this, 'asd')}>
        2 Tooltip
      </span>
      <span>3 Tooltip</span>
    </WTooltip>
  </>
);
```

### API

##### WToast.show

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| content | Toast 文本内容 | React.ReactNode | - |
| icon | Toast 图标 | 'success' \| 'fail' \| 'loading' \| React.ReactNode | - |
| duration | 提示持续时间，若为 0 则不会自动关闭 | number | 2000 |
| position | 垂直方向显示位置 | 'top' \| 'bottom' \| 'center' | 'center' |
| maskClickable | 是否允许背景点击 | boolean | true |  | className | 类名 | string | - |
