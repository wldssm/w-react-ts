---
title: Radio 单选
group:
  title: '通用'
---

## Radio 单选

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React, { useState } from 'react';
import { WRadio, WRadioGroup } from 'w-react-ts';

export default () => {
  let [checked, setChecked] = useState(false),
    [curValue, setCurValue] = useState('2'),
    changeChecked = (val) => {
      setChecked(!val);
    },
    changeValue = (val) => {
      setCurValue(val);
    };
  return (
    <>
      <WRadio checked={checked} onClick={changeChecked}>
        单选项切换
      </WRadio>

      <WRadioGroup curValue={curValue} type="button" onChange={changeValue}>
        <WRadio value="1">选项组-高</WRadio>
        <WRadio value="2">选项组-中</WRadio>
        <WRadio value="3">选项组-低</WRadio>
      </WRadioGroup>
    </>
  );
};
```

### API

##### WRadio

| 参数      | 说明               | 类型                       | 默认值 |
| --------- | ------------------ | -------------------------- | ------ |
| value     | 选项值             | string\|number\| boolean   | -      |
| name      | 绑定名称           | string                     | -      |
| disabled  | 是否禁用           | boolean                    | false  |
| checked   | 是否选中           | boolean                    | false  |
| dir       | 文本显示在左还是右 | 'right'\|其他              | 右     |
| className | 类名               | string                     | -      |
| onClick   | 单击选项           | function(checked, name, e) | -      |

##### WRadioGroup

| 参数      | 说明               | 类型                     | 默认值 |
| --------- | ------------------ | ------------------------ | ------ |
| curValue  | 选中值             | string\|number\| boolean | -      |
| name      | 绑定名称           | string                   | -      |
| disabled  | 是否禁用           | boolean                  | false  |
| type      | 显示方式           | dot 圆点\|'button' 按钮  | dot    |
| dir       | 文本显示在左还是右 | 'right'\|其他            | 右     |
| className | 类名               | string                   | -      |
| onChange  | 选项变化时         | function(value, name, e) | -      |
