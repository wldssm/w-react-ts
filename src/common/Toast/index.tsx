import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import InnerToast from './toast';
import { deepExtend } from '../../assets/js/utils';

let containers: any[] = [],
  timer: any = null,
  defaultProps = {
    duration: 2000, // 提示持续时间，若为 0 则不会自动关闭
  };

// 显示
function show(param: any) {
  let props = deepExtend(defaultProps, typeof param === 'string' ? { content: param } : param);
  clear();
  const container = document.createElement('div');
  document.body.appendChild(container);
  containers.push(container);

  let TempToast = () => {
    // 是否自动关闭
    useEffect(() => {
      if (props.duration === 0) {
        return;
      }
      timer = window.setTimeout(function () {
        unmount(container);
      }, props.duration);
      return () => {
        window.clearTimeout(timer);
      };
    }, []);
    return <InnerToast {...props} />;
  };

  ReactDOM.render(<TempToast />, container);
}
// 清除
function clear() {
  while (true) {
    let container = containers.pop();
    if (!container) break;
    unmount(container);
  }
}
// 卸载
function unmount(container: any) {
  let unmountResult = ReactDOM.unmountComponentAtNode(container);
  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

const Toast = {
  show,
  clear,
};

export default Toast;
