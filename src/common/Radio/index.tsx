import React, { Component } from 'react';

// 资源
import './index.less';

interface Props {
  value: boolean;
  disabled: boolean;
  dir?: string; // 文本显示位置
  className?: string;
  onClick: (...param: any) => any;
}

class WRadio extends Component<Props> {
  static defaultProps = {
    value: false,
    dir: 'right',
    disabled: false,
    className: '',
    onClick: () => {},
  };
  // 切换
  change = () => {
    let { value, disabled } = this.props;
    if (disabled) return false;
    this.props.onClick(!value);
  };
  render() {
    let { value, dir, disabled, className, children } = this.props;
    return (
      <div
        className={`radio-box ${className}${disabled ? ' disabled' : ''}${value ? ' on' : ''}`}
        onClick={this.change}
      >
        {dir !== 'right' && children && <span className="title t-l">{children}</span>}
        <span className="radio-dot"></span>
        {dir === 'right' && children && <span className="title t-r">{children}</span>}
      </div>
    );
  }
}

export default WRadio;
