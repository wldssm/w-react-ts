import React, { Component, Fragment } from 'react';

import WIcon from '../Icon';
import WCheckBox from '../CheckBox';
import './index.less';

interface Props {
  title: string;
  fold: boolean;
  checked: boolean;
  className: string; // 类名
  insertHead?: any; // 插入头部的内容
  change: (...param: any) => any; // 折叠状态改变时
  check: (...param: any) => any; // 选中状态改变时
}
class Collapse extends Component<Props> {
  static defaultProps = {
    title: '标题',
    fold: true,
    checked: false,
    className: '',
    change: () => {},
    check: () => {},
  };

  // 切换折叠
  change = (type: string, val: boolean, e: any) => {
    e.stopPropagation();
    this.props.change && this.props.change(val, e);
  };
  // 切换选中
  check = (type: string, val: boolean, e: any) => {
    e.stopPropagation();
    this.props.check && this.props.check(val, e);
  };

  render() {
    let { title, fold, checked, className, children, insertHead } = this.props;
    return (
      <div
        className={`fold-cont-box${!fold && children ? ' active' : ''}${checked ? ' on' : ''} ${
          className ? className : ''
        }`}
      >
        <div className="fold-switch" onClick={this.change.bind(this, 'fold', !fold)}>
          <WCheckBox
            className="f-s-check"
            checked={checked}
            onChange={this.check.bind(this, 'checked')}
          />
          <span className="f-s-title">{title}</span>
          {insertHead}
          {children && (
            <WIcon className={`f-s-icon ${!fold ? ' ' + 'open' : ''}`} code="&#xe65e;" />
          )}
        </div>
        {!fold && children && <div className="fold-cont">{children}</div>}
      </div>
    );
  }
}

export default Collapse;
