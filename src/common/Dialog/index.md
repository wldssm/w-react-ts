---
title: Dialog 对话框
group:
  title: '通用'
---

## Dialog 对话框

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { Fragment, useState } from 'react';
import { WDialog, WButton } from 'w-react-ts';

let [show, setShow] = useState(false);
const openDialog = () => {
  setShow(true);
};
const closeDialog = () => {
  setShow(false);
};

export default () => (
  <Fragment>
    <WButton onClick={openDialog}>打开弹框</WButton>
    <WDialog show={show} showBtn={true} onClose={closeDialog} onSure={closeDialog}>
      <p style={{ padding: '28px', color: '#fff', textAlign: 'center' }}>
        富强明主文明和谐自由平等公正法治爱国敬业诚信友善
      </p>
    </WDialog>
  </Fragment>
);
```

### API

| 参数          | 说明                 | 类型     | 默认值 |
| ------------- | -------------------- | -------- | ------ |
| show          | 显示弹框             | boolean  | false  |
| title         | 标题                 | string   | 提示   |
| showHeader    | 是否显示标题         | boolean  | true   |
| showBtn       | 是否显示按钮         | boolean  | false  |
| btnLoading    | 确定按钮显示 loading | boolean  | false  |
| btnDisabled   | 确定按钮是否禁用     | boolean  | false  |
| maskClickable | 点击背景关闭弹框     | boolean  | false  |
| className     | 类名                 | string   | -      |
| headNode      | 头部插入内容         | any      | -      |
| onClose       | 弹框关闭事件         | function | -      |
| onSure        | 弹框确定按钮事件     | function | -      |
