---
title: Drag 拖拽
group:
  title: '通用'
---

## Drag 拖拽

#### 使用方式

```js
import { WDrag } from 'w-react-ts';
new WDrag(boxEl, dragEl);
```

Demo:

```tsx
/**
 * defaultShowCode: false
 */
import React, { Fragment, useState, useEffect } from 'react';
import { WDrag, WDialog, WButton } from 'w-react-ts';

let [show, setShow] = useState(false);

const openDialog = () => {
  setShow(true);
};
const closeDialog = () => {
  setShow(false);
};

export default () => {
  useEffect(() => {
    if (show) {
      document.getElementsByClassName('p-main')[0].style.position = 'fixed';
      new WDrag(document.getElementsByClassName('p-main')[0]);
    }
  }, [show]);

  return (
    <Fragment>
      <WButton onClick={openDialog}>打开拖拽弹框</WButton>
      <WDialog title="拖拽框" show={show} showBtn={true} onClose={closeDialog} onSure={closeDialog}>
        <p style={{ padding: '28px', color: '#fff', textAlign: 'center' }}>该弹框可拖动</p>
      </WDialog>
    </Fragment>
  );
};
```

### API

| 参数   | 说明                                                   | 类型           | 默认值 |
| ------ | ------------------------------------------------------ | -------------- | ------ |
| boxEl  | 被拖动的容器                                           | HTMLDivElement | -      |
| dragEl | 拖拽的区域【可选】，不设置则被拖动的容器整体都可以拖动 | HTMLDivElement | -      |
