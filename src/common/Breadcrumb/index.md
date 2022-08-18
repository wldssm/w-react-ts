---
title: Breadcrumb 面包屑
group:
  title: '通用'
---

## Breadcrumb 面包屑

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#0E3058"
 */
import React from 'react';
import { WBreadcrumb, WBreadcrumbItem } from 'w-react-ts';

export default () => (
  <WBreadcrumb>
    <WBreadcrumbItem>首页</WBreadcrumbItem>
    <WBreadcrumbItem>图片记录</WBreadcrumbItem>
    <WBreadcrumbItem>详情</WBreadcrumbItem>
  </WBreadcrumb>
);
```

### API

##### WBreadcrumb

| 参数      | 说明   | 类型            | 默认值 |
| --------- | ------ | --------------- | ------ |
| separator | 分隔符 | React.ReactNode | >      |
| className | 类名   | string          | -      |

##### WBreadcrumbItem

| 参数      | 说明     | 类型        | 默认值 |
| --------- | -------- | ----------- | ------ |
| className | 类名     | string      | -      |
| onClick   | 单击文本 | function(e) | -      |
