---
title: Upload 上传
group:
  title: '通用'
---

## Upload 上传

### Demo

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { WUpload, WButton } from 'w-react-ts';

export default () => (
  <WUpload>
    <WButton>获取文件</WButton>
  </WUpload>
);
```

### API

| 参数      | 说明           | 类型                                               | 默认值 |
| --------- | -------------- | -------------------------------------------------- | ------ |
| name      | 字段名         | string                                             | -      |
| accept    | 可上传文件类型 | string，可选值：pdf / mp4 / img / apk / docx / all | img    |
| disabled  | 是否禁用       | boolean                                            | false  |
| multiple  | 可否多选       | boolean                                            | false  |
| className | 类名           | string                                             | -      |
| onChange  | 选中文件后     | function(fileArr, name, e)                         | -      |
