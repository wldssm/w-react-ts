import React, { Component } from 'react';
import WIcon from '../Icon';

import './index.less';

interface Props {
  content: any;
  position: string; // 垂直方向显示位置'top' | 'bottom' | 'center'
  maskClickable: boolean; // 是否允许背景点击
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
  className: string;
}

class AiToast extends Component<Props> {
  static defaultProps = {
    content: '',
    position: 'center',
    maskClickable: false,
    className: '',
  };

  // 显示位置
  get posi() {
    let { position } = this.props;
    if (position === 'top') return '20%';
    if (position === 'bottom') return '80%';
    return '50%';
  }

  // 渲染图标
  iconRender = () => {
    let { icon } = this.props;
    if (!icon) return null;
    if (icon === 'success')
      return (
        <div className="toast-icon">
          <WIcon code="&#xe6d0;" className="t-icon-success" />
        </div>
      );
    if (icon === 'fail')
      return (
        <div className="toast-icon">
          <WIcon code="&#xe600;" className="t-icon-fail" />
        </div>
      );
    if (icon === 'loading')
      return (
        <div className="toast-icon">
          <WIcon code="&#xe8fd;" className="t-icon-loading" />
        </div>
      );
    return <div className="toast-icon">{icon}</div>;
  };

  render() {
    let { content, maskClickable, className } = this.props;
    return (
      <div
        className={`toast-model ${className}`}
        style={{
          pointerEvents: maskClickable ? 'none' : 'all',
        }}
      >
        <div className="toast-content" style={{ top: this.posi }}>
          {this.iconRender()}
          {content}
        </div>
        <div className="toast-mask"></div>
      </div>
    );
  }
}

export default AiToast;
