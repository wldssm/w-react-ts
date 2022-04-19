import React, { Component } from 'react';

import WIcon from '../Icon';
import './index.less';

interface Props {
  value?: string; // (不能写默认值，不然dumi会刷新)
  name: string;
  className: string;
  suffix: string; // 后缀（例：%）
  change: (...param: any) => any; // 输入框改变
  onEnter: (...param: any) => any; // 输入框回车
  enlarge: (...param: any) => any; // 点击放大
  narrow: (...param: any) => any; // 点击缩小
}

class InputNumber extends Component<Props> {
  static defaultProps = {
    name: '',
    className: '',
    suffix: '',
    change: () => {},
    onEnter: () => {},
    enlarge: () => {},
    narrow: () => {},
  };

  // 双向绑定数据
  change = (e: any) => {
    let target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value,
      { name, suffix } = this.props;
    if (suffix) {
      let reg = new RegExp(`${suffix}$`);
      value = ('' + value).replace(reg, '');
    }
    this.props.change(value, name);
  };
  // 回车提交
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      this.props.onEnter(this.props.name);
    }
  };
  // 放大
  enlarge = () => {
    this.props.enlarge();
  };
  // 缩小
  narrow = () => {
    this.props.narrow();
  };
  render() {
    let { className, value, name, suffix } = this.props;
    return (
      <div className={`zoomin-box ${className}`}>
        <WIcon className="icom-zoomin" onClick={this.narrow} code="&#xe68a;" />
        <input
          type="text"
          onChange={this.change}
          value={value + suffix}
          autoComplete="off"
          name={name}
          onKeyPress={this.keyPress}
        />
        <WIcon className="icom-zoomin" onClick={this.enlarge} code="&#xe643;" />
      </div>
    );
  }
}

export default InputNumber;
