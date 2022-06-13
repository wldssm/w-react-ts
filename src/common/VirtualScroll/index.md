---
title: VirtualScroll 无限虚拟滚动
group:
  title: '通用'
---

## VirtualScroll 无限虚拟滚动

### Demo

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { WVirtualScroll } from 'w-react-ts';
import '../../assets/css/demo.css';

export default () => {
  let [curPage, setCurPage] = useState(1),
    [data, setData] = useState([...Array(20).keys()]);

  const loadMore = (page: any) => {
    page = page || 1;
    data.push(...Array(20).keys());
    setCurPage(page);
    setData(data);
  };
  return (
    <WVirtualScroll
      flexNum={15}
      data={data}
      itemMinHeight={40}
      render={(item, index) => index}
      total={65}
      curPage={curPage}
      pageSize={20}
      loadMore={loadMore}
    />
  );
};
```

### API

| 参数          | 说明                        | 类型                              | 默认值      |
| ------------- | --------------------------- | --------------------------------- | ----------- |
| data          | 数据源                      | []                                | []          |
| total         | `无限加载时`的数据总条数    | number                            | 0           |
| pageSize      | `无限加载时`的分页 pageSize | number                            | 20          |
| curPage       | `无限加载时`的当前页        | number                            | 1           |
| itemMinHeight | 数据项的最小高度            | number                            | 20          |
| flexNum       | 缓存多少条，越大越流畅      | number                            | 0           |
| fill          | 初始是否预填充 bottom       | boolean                           | false       |
| boxRef        | 外容器 ref                  | React.RefObject\<HTMLDivElement\> | createRef() |
| itemClassName | 每个子项的类名              | string                            | -           |
| className     | 类名                        | string                            | -           |
| height        | 外容器高度                  | string                            | 100%        |
| render        | 渲染 list 内容              | function(item, index)             | -           |
| loadMore      | `无限加载时`加载更多数据    | function(page)                    | -           |
