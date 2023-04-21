import React, { Component } from 'react';

import WRadio from './WRadio';
import './index.less';

interface Props {
  curValue: boolean | string | number;
  name: string;
  disabled: boolean;
  type?: string; // 显示方式：dot圆点、button按钮
  dir?: string; // 文本显示位置
  className?: string;
  onChange: (...param: any) => any;
  children?: React.ReactNode;
}

class WRadioGroup extends Component<Props> {
  static defaultProps = {
    curValue: '',
    name: '',
    disabled: false,
    className: '',
    onChange: () => {},
  };
  state = {
    curTag: '',
  };
  // 切换
  change = (checked: boolean, rname: string, val: any, e: any) => {
    let { disabled, name } = this.props;
    if (disabled) return false;

    this.props.onChange(val, name, e);
  };
  render() {
    let { curValue, type, dir, disabled, className, children } = this.props;
    return (
      <div className={`radio-box-group${type === 'button' ? ' radio-button ' : ' '}${className}`}>
        {React.Children.map(children, (child: any, index) => {
          if (!child) return;

          let { dir: cDir, disabled: cDisabled, value } = child?.props;
          return React.cloneElement(child, {
            index: index,
            checked: curValue === value,
            dir: cDir || dir,
            disabled: disabled || cDisabled,
            type: type,
            onClick: this.change,
          });
        })}
      </div>
    );
  }
}

export { WRadio, WRadioGroup };
