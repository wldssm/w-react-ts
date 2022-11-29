---
title: Input 输入框
group:
  title: '通用'
---

## Input 输入框

### Demo

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { WInput } from 'w-react-ts';

export default () => {
  const [value, setValue] = useState(),
    change = (value) => {
      setValue(value);
    };
  return <WInput width="200px" value={value} onChange={change} />;
};
```

### API

| 参数         | 说明                              | 类型                     | 默认值 |
| ------------ | --------------------------------- | ------------------------ | ------ |
| type         | 输入框的类型                      | string                   | text   |
| value        | 输入框的值                        | string                   | -      |
| name         | 输入框的名称                      | string                   | -      |
| showPwd      | type 为 password 时，是否显示明文 | boolean                  | false  |
| showDel      | 是否显示删除图标                  | boolean                  | false  |
| maxLength    | 输入框字符的最大长度              | number                   | -      |
| placeholder  | 输入框提示文字                    | string                   | 请输入 |
| disabled     | 禁用                              | boolean                  | false  |
| autoComplete | 输入框的自动完成功能              | on/off                   | off    |
| autoSize     | 输入款宽度自适应                  | boolean                  | false  |
| width        | 宽度                              | string                   | -      |
| className    | 类名                              | string                   | -      |
| leftNode     | 插入输入框左边内容                | any                      | -      |
| rightNode    | 插入输入框右边内容                | any                      | -      |
| onChange     | 输入框改变时触发                  | function(value, name, e) | -      |
| onEnter      | 输入框回车时触发                  | function(value, name, e) | -      |
| onFocus      | 输入框获得焦点时触发              | function(value, name, e) | -      |
| onBlur       | 输入框失去焦点时触发              | function(value, name, e) | -      |

### Ref

| 参数  | 说明           | 类型       |
| ----- | -------------- | ---------- |
| focus | 输入框获取焦点 | () => void |
