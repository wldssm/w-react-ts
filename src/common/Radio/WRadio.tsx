import React, { Component } from 'react';

// 资源
import './index.less';

interface Props {
  value: boolean | string | number;
  name: string;
  index?: string; // 父组件
  type?: string; // 显示方式：default、button
  disabled: boolean;
  checked: boolean;
  dir?: string; // 文本显示位置
  className?: string;
  onClick: (...param: any) => any;
  children?: React.ReactNode;
}

class WRadio extends Component<Props> {
  static defaultProps = {
    value: '',
    name: '',
    checked: false,
    disabled: false,
    className: '',
    onClick: () => {},
  };
  // 切换
  change = (e: any) => {
    let { value, disabled, checked, name } = this.props;
    if (disabled) return false;
    this.props.onClick(checked, name, value, e);
  };
  render() {
    let { type, dir, checked, disabled, className, children, index } = this.props;

    return (
      <div
        className={`radio-box ${className}${disabled ? ' disabled' : ''}${checked ? ' on' : ''}`}
        onClick={this.change}
        key={index}
      >
        {dir && dir !== 'right' && children && <span className="title">{children}</span>}
        {type !== 'button' && (
          <span className={`radio-dot ${dir && dir !== 'right' ? 't-r' : 't-l'}`}></span>
        )}
        {(!dir || dir === 'right') && children && <span className="title">{children}</span>}
      </div>
    );
  }
}

export default WRadio;
