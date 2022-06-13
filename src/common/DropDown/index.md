---
title: DropDown 下拉菜单
group:
  title: '通用'
---

## DropDown 下拉菜单

### Demo

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { WDropDown } from 'w-react-ts';

let [codeIndex, setCodeIndex] = useState(0),
  codeList = [
    {
      label: 'option1',
      id: 1,
    },
    {
      label: 'option2',
      id: 2,
    },
  ];

const select = (index, name) => {
  setCodeIndex(index);
};

export default () => (
  <WDropDown width="300px" onSelect={select} curIndex={codeIndex} prop="label" options={codeList} />
);
```

### API

| 参数        | 说明                           | 类型                            | 默认值 |
| ----------- | ------------------------------ | ------------------------------- | ------ |
| options     | 下拉菜单数据                   | array                           | []     |
| name        | 下拉菜单的名称                 | string                          | -      |
| prop        | 显示文本为节点对象的某个属性值 | string                          | -      |
| placeholder | 暂无数据提示                   | string                          | 请选择 |
| expanded    | 默认是否展开                   | boolean                         | false  |
| curIndex    | 选中的 index                   | number                          | 0      |
| disabled    | 禁用                           | boolean                         | false  |
| width       | 宽度                           | string                          | -      |
| canInput    | 能否输入                       | boolean                         | false  |
| value       | 可选可输时输入框绑定的值       | string                          | -      |
| maxLength   | 可选可输时输入框字符的最大长度 | number                          | -      |
| className   | 类名                           | string                          | -      |
| leftNode    | 插入输入框左边内容             | any                             | -      |
| rightNode   | 插入输入框右边内容             | any                             | -      |
| onClick     | 单击下拉菜单                   | function(name, status, options) | -      |
| onSelect    | 选中下拉菜单选项事件           | function(index, name, item)     | -      |
| onChange    | 输入事件                       | function(value, name)           | -      |
| onEnter     | 回车事件                       | function(name)                  | -      |
| onFocus     | 输入框获得焦点时触发           | function(name)                  | -      |
| onBlur      | 输入框失去焦点时触发           | function(name)                  | -      |
| optionRight | 插入选项右边内容               | function(item, index)           | -      |
| optionLeft  | 插入选项左边内容               | function(item, index)           | -      |
