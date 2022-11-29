---
title: Table 表格
group:
  title: '通用'
---

## Table 表格

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { Fragment } from 'react';
import { WTable, WTableColumn, WIcon } from 'w-react-ts';

let tableData = [
  {
    date: '2016-05-02',
    name: 'W1',
    zip: 200333,
  },
  {
    date: '',
    name: 'W2',
    zip: 200333,
  },
];

export default () => (
  <WTable data={tableData}>
    <WTableColumn width="15%" render={(data) => <WIcon code="&#xe679;" />} />
    <WTableColumn
      width="30%"
      label={() => (
        <Fragment>
          随意
          <WIcon code="&#xe675;" />
        </Fragment>
      )}
      prop="zip"
    />
    <WTableColumn width="20%" label="名字" prop="name" />
    <WTableColumn width="35%" label="时间" prop="date" fmt="-" />
  </WTable>
);
```

### API

##### WTable

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据 | any[] | [] |
| showHeader | 是否显示头部 | boolean | true |
| className | 类名 | string | - |
| clickRow | 单击行 | thead：function(e) <br/> tbody：function(rowData, index, e) | - |
| clickThCol | 单击头部单元格 | function(index, label, e) | - |

##### WTableColumn

| 参数      | 说明                 | 类型                           | 默认值 |
| --------- | -------------------- | ------------------------------ | ------ |
| label     | 头部单元格显示内容   | string \| function(index)      | -      |
| prop      | 单元格数据的属性名   | string                         | -      |
| width     | 单元格宽度           | string                         | -      |
| fmt       | 空数据时显示的占位   | string                         | -      |
| ellipsis  | 是否根据宽度自动省略 | boolean                        | false  |
| align     | 列的对齐方式         | left \| right \| center        | center |
| className | tbody 单元格类名     | string                         | -      |
| render    | 渲染数据单元格内容   | fcuntion(rowData, rowIndex)    | -      |
| onClick   | 单击单元格           | function(rowData, rowIndex, e) | -      |
