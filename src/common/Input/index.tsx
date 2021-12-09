import React, { Component } from 'react';

import './index.less';

interface Props {
  type: string;
  value?: string; // 输入框的值
  name?: string;
  showPwd: boolean; // type为password是否显示明文
  maxLength: number;
  placeholder: string;
  autoComplete: string; // 是否记住密码
  width: string;
  className: string;
  onChange: (...param: any) => any; // 输入事件
  onEnter: (...param: any) => any; // 回车事件
  leftNode?: any; // 输入框左边插槽
  rightNode?: any; // 输入框右边插槽
}

class WInput extends Component<Props> {
  static defaultProps = {
    type: 'text',
    showPwd: false,
    className: '',
    placeholder: '请输入',
    autoComplete: 'off',
    onChange: () => {},
    onEnter: () => {},
  };

  // 双向绑定数据
  change = (e: any) => {
    const target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.onChange(this.props.name, value);
  };

  // 回车提交
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      this.props.onEnter(this.props.name);
    }
  };

  render() {
    let {
      value,
      type,
      showPwd,
      placeholder,
      maxLength,
      className,
      autoComplete,
      leftNode,
      rightNode,
      width,
    } = this.props;
    return (
      <div className={`i-txt-box ${className}`} style={{ width: width }}>
        {leftNode}
        <input
          type={type && !showPwd ? type : 'text'}
          value={value}
          autoComplete={autoComplete}
          className="i-txt"
          onChange={this.change}
          onKeyPress={this.keyPress}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {rightNode}
      </div>
    );
  }
}

export default WInput;
