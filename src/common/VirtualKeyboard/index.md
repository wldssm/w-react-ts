---
title: VirtualKeyboard 虚拟键盘
group:
  title: '通用'
---

## VirtualKeyboard 虚拟键盘

Demo:

```tsx
/**
 * defaultShowCode: true
 * background: "#081D36"
 */
import React, { Fragment, useState, createRef, useEffect } from 'react';
import { WVirtualKeyboard, WInput } from 'w-react-ts';

export default () => {
  let [value, setValue] = useState(),
    [show, setShow] = useState(),
    inputRef = createRef(),
    [inputDom, setInputDom] = useState(),
    change = (value) => {
      setValue(value);
    },
    switchShow = (status) => {
      setShow(status);
    };
  useEffect(() => {
    setInputDom(inputRef?.current?.inputRef?.current);
  }, []);
  return (
    <Fragment>
      <WInput
        width="200px"
        value={value}
        name="test"
        onChange={change}
        ref={inputRef}
        onFocus={() => switchShow(true)}
        onBlur={() => switchShow(false)}
      />
      <WVirtualKeyboard
        show={show}
        value={value}
        name="test"
        onChange={change}
        inputDom={inputDom}
        onClose={() => switchShow(false)}
      />
    </Fragment>
  );
};
```

### API

| 参数      | 说明                | 类型                           | 默认值 |
| --------- | ------------------- | ------------------------------ | ------ |
| show      | 是否显示            | boolean                        | false  |
| value     | 绑定输入框的值      | string                         | -      |
| name      | 绑定输入框的 name   | string                         | -      |
| type      | 线盘类型            | number 数字键盘、text 字母键盘 | text   |
| inputDom  | 绑定的 input 的 dom | HTMLInputElement               | -      |
| autoPosi  | 位置随输入框变动    | boolean                        | true   |
| className | 类名                | string                         | -      |
| onChange  | 单击按键输入时触发  | function(value, name)          | -      |
| onEnter   | 单击回车时触发      | function(value, name)          | -      |
| onClose   | 单击关闭时触发      | function(e)                    | -      |
