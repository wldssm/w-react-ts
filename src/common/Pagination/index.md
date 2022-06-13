---
title: Pagination 分页
group:
  title: '通用'
---

## Pagination 分页

### Demo

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React, { useState } from 'react';
import { WPagination } from 'w-react-ts';

export default () => {
  let [curPage, setCurPage] = useState(1),
    total = 21;

  const getListByPage = (page) => {
    page = page || 1;
    setCurPage(page);
    // ... 根据页码获取数据
  };
  return <WPagination total={total} curPage={curPage} onChange={getListByPage} />;
};
```

### API

| 参数      | 说明                         | 类型           | 默认值 |
| --------- | ---------------------------- | -------------- | ------ |
| showTotal | 显示总页数                   | boolean        | true   |
| total     | 数据总条数                   | number         | 0      |
| pageSize  | 每页显示条数                 | number         | 5      |
| curPage   | 当前页码                     | number         | 1      |
| showNum   | 可见页码数                   | number         | 7      |
| className | 类名                         | string         | -      |
| onChange  | 切换页码、回车、失去焦点触发 | function(page) | -      |
| onFocus   | 输入框获得焦点时触发         | function()     | -      |
| onBlur    | 输入框失去焦点时触发         | function(page) | -      |
