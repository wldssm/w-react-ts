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
import React from 'react';
import { WInput } from 'w-react-ts';

export default () => <WInput width="200px" />;
```

### API

| 参数         | 说明                              | 类型                  | 默认值 |
| ------------ | --------------------------------- | --------------------- | ------ |
| type         | 输入框的类型                      | string                | text   |
| value        | 输入框的值                        | string                | -      |
| name         | 输入框的名称                      | string                | -      |
| showPwd      | type 为 password 时，是否显示明文 | boolean               | false  |
| maxLength    | 输入框字符的最大长度              | number                | -      |
| placeholder  | 输入框提示文字                    | string                | 请输入 |
| disabled     | 禁用                              | boolean               | false  |
| autoComplete | 输入框的自动完成功能              | on/off                | off    |
| autoSize     | 输入款宽度自适应                  | boolean               | false  |
| width        | 宽度                              | string                | -      |
| className    | 类名                              | string                | -      |
| leftNode     | 插入输入框左边内容                | any                   | -      |
| rightNode    | 插入输入框右边内容                | any                   | -      |
| onChange     | 图标单击事件                      | function(name, value) | -      |
| onEnter      | 图标单击事件                      | function(name)        | -      |
