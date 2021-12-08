---
title: CheckBox 复选框
group: 
  title: '通用'
  
---

## CheckBox 复选框

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { Fragment, useState } from 'react';
import { WCheckBox } from 'w-react-ts';

let [checkStatus, setCheckStatus] = useState(true)
const onChange = (status)=> {
  setCheckStatus(status)
}

export default () =>
  <Fragment>
    <WCheckBox checked={checkStatus} onChange={onChange} />
    <br/>
    <WCheckBox disabled={true} />
</Fragment>
```

### API
|参数|说明|类型|默认值|
|--|--|--|--|
|checked|是否选中|boolean|false|
|disabled|是否禁用|boolean|false|
|className|类名|string|-|
|onChange|选中切换事件|function(checkedValue, event)|-|