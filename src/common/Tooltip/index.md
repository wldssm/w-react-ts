---
title: Tooltip 轻提示
group:
  title: '通用'
---

## Tooltip 轻提示

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { WToast, WButton } from 'w-react-ts';

function showToast() {
  WToast.show('2秒自动关闭');
}

export default () => <WButton onClick={showToast}>显示Toast</WButton>;
```

### API

##### WToast.show

show 方法支持传入一个 props 对象，它包含了以下这些属性： |属性|说明|类型|默认值| |--|--|--|--| |content|Toast 文本内容|React.ReactNode|-| |icon|Toast 图标|'success' \| 'fail' \| 'loading' \| React.ReactNode|-| |duration|提示持续时间，若为 0 则不会自动关闭|number|2000| |position|垂直方向显示位置|'top' \| 'bottom' \| 'center'|'center'| |maskClickable|是否允许背景点击|boolean|true| |className|类名|string|-|

##### WToast.clear

关闭所有显示中的 Toast。
