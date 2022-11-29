---
title: Tree 树结构
group:
  title: '通用'
---

## Tree 树结构

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React from 'react';
import { WTree } from 'w-react-ts';

let data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
];

export default () => (
  <WTree
    pl={20}
    indent={50}
    data={data}
    uniqueKey="label"
    showCheck={true}
    clickNodeChecked={true}
  />
);
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 显示数据 | array | [] |
| label | 指定节点显示文本为节点对象的某个属性值 | string | label |
| subNode | 指定子树为节点对象的某个属性值 | string | children |
| uniqueKey | 标志项唯一的字段名（父子节点关联选中必须设置） | string | id |
| indent | 层级缩进距离 | number | 32 |
| pl | 左边缩进距离 | number | 0 |
| className | 类名 | string | - |
| initExpanded | 默认展开 | boolean | true |
| showCheck | 显示复选框 | boolean | false |
| showArrow | 显示下拉箭头 | boolean | true |
| checkKey | 控制是否选中的字段名 | string | checked |
| checkDisabled | 禁用选中 | boolean | false |
| clickNodeExpanded | 单击节点折叠 | boolean | false |
| clickNodeChecked | 单击节点选中 | boolean | false |
| expandAction | 目录展开方式，可选：click \| hover | string | click |
| selectable | 是否选中整个节点 | (item)=>boolean | - |
| onClick | 点击节点 | function( {node, event} ) | - |
| onExpand | 切换节点显示隐藏 | function( {expanded, node} ) | - |
| onCheck | 点击选中 | function( {checked, node} ) | - |
| leftNode | 插在文本左边的节点 | function(item) | - |
| rightNode | 插在文本右边的节点 | function(item) | - |
