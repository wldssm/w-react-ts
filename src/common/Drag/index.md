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

const switchDialog = (status) => {
  setShow(status);
};

export default () => {
  useEffect(() => {
    if (show) {
      const boxEl = document.getElementsByClassName('p-main')[0];
      boxEl.style.position = 'fixed';
      new WDrag(boxEl);
    }
  }, [show]);

  return (
    <Fragment>
      <WButton onClick={() => switchDialog(true)}>打开拖拽弹框</WButton>
      <WDialog
        title="拖拽框"
        show={show}
        showBtn={true}
        onClose={() => switchDialog(false)}
        onSure={() => switchDialog(false)}
      >
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
