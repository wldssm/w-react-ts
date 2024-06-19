---
title: ViewImg 图片预览
group:
  title: '通用'
---

## ViewImg 图片预览

Demo:

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React, { Fragment, useState } from 'react';
import img from '../../assets/img/logo.png';
import { WViewImg, WButton } from 'w-react-ts';

export default () => {
  let [show, setShow] = useState(),
    switchShow = (status) => {
      setShow(status);
    };
  return (
    <Fragment>
      <WButton onClick={() => switchShow(true)}>预览</WButton>
      <WViewImg src={img} show={show} onClose={() => switchShow(false)} />
    </Fragment>
  );
};
```

### API

| 参数      | 说明                           | 类型        | 默认值 |
| --------- | ------------------------------ | ----------- | ------ |
| src       | 图片 src 地址                  | string      |
| show      | 是否显示预览图                 | boolean     | false  |
| list      | 预览图片组，可左右切换【可选】 | array       | []     |
| showPix   | 图片像素化                     | boolean     | true   |
| className | 类名                           | string      | -      |
| onClose   | 单击任意位置触发关闭           | function(e) | -      |
