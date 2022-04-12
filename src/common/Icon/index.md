---
title: Icon 图标
group:
  title: '通用'
---

## Icon 图标

#### 使用方式

```bash
import { WIcon } from 'w-react-ts';
<WIcon code={unicode值} />  // 传入unicode值即可。
```

### Demo

##### <font color="#dd0000">tips：单击可复制 unicode 值。</font>

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { WIcon, WToast } from 'w-react-ts';
import fonts from '../../assets/font/iconfont.json';
import '../../assets/font/demo.css';

// 拷贝
function copyUnicode(cont) {
  if (!document.queryCommandSupported('copy')) {
    return false;
  }

  let input = document.createElement('input');
  input.value = cont;
  document.body.appendChild(input);
  input.select();

  const result = document.execCommand('copy');
  document.body.removeChild(input);
  input = null;
  WToast.show(`复制成功: ${cont}`);
}

export default () => {
  return fonts?.glyphs?.map((item, index) => {
    return (
      <div
        key={index}
        className="icon-item"
        onClick={() => {
          copyUnicode(`&#x${item?.unicode};`);
        }}
      >
        <WIcon code={`&#x${item?.unicode};`} className="icon-font" />
        <p className="icon-txt">{`&#x${item?.unicode};`}</p>
      </div>
    );
  });
};
```

### API

| 参数      | 说明         | 类型              | 默认值 |
| --------- | ------------ | ----------------- | ------ |
| code      | 图标编码     | string【unicode】 | -      |
| className | 类名         | string            | -      |
| onClick   | 图标单击事件 | function(e)       | -      |
