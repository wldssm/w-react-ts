---
title: Slider 滑块
group:
  title: '通用'
---

## Slider 滑块

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React, { useState } from 'react';
import { WSlider } from 'w-react-ts';

let [curValue, setCurValue] = useState(50);

const change = (name, value) => {
  setCurValue(value);
};

export default () => (
  <WSlider value={curValue} label="滑块文本" showInput={true} showRange={true} onChange={change} />
);
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 绑定值 | number | 0 |
| name | 字段名 | string | - |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| step | 步长 | number | 1 |
| label | 文本 label | string | - |
| disabled | 禁用 | boolean | false |
| showTip | 显示 tooltip | boolean | true |
| showRange | 显示最大值最小值 | boolean | false |
| showInput | 显示输入框 | boolean | false |
| className | 类名 | string | - |
| onChange | 值改变时触发（松开鼠标后）、输入框回车时触发、上下左右键触发 | function(value, name) | - |
| onInput | 拖拽时实时触发 | function(value, name) | - |
