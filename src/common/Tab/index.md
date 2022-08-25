---
title: Tab 标签页
group:
  title: '通用'
---

## Tab 标签页

Demo:

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React, { useState } from 'react';
import { WTab, WTabPane } from 'w-react-ts';

export default () => {
  let [curTag, setCurTag] = useState('tab1'),
    changeTab = (tag) => {
      setCurTag(tag);
    };
  return (
    <WTab curTag={curTag} onClick={changeTab}>
      <WTabPane label="tab1" tag="tab1">
        tab1
      </WTabPane>
      <WTabPane label="tab2" tag="tab2">
        tab2
      </WTabPane>
    </WTab>
  );
};
```

### API

##### WTab

| 参数      | 说明               | 类型                            | 默认值         |
| --------- | ------------------ | ------------------------------- | -------------- |
| curTag    | 当前选中面板的 tag | string                          | 第一个面板 tag |
| className | 头部类名           | string                          | -              |
| onClick   | 头部选项卡单击事件 | function(tag, index, childPane) | -              |

##### WTabPane

| 参数      | 说明             | 类型   | 默认值 |
| --------- | ---------------- | ------ | ------ |
| tag       | 选项卡对应的 key | string | -      |
| label     | 选项卡文字       | string | 标题   |
| className | 主体类名         | string | -      |
