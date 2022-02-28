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
  change: (...param: any) => any; // 折叠、选中状态改变时
}
class Collapse extends Component<Props> {
  static defaultProps = {
    title: '标题',
    fold: true,
    checked: false,
    className: '',
    change: () => {},
  };

  // 切换折叠、选中
  switch = (type: string, val: boolean, e: any) => {
    e.stopPropagation();
    this.props.change && this.props.change(type, val, e);
  };

  render() {
    let { title, fold, checked, className, children, insertHead } = this.props;
    return (
      <div
        className={`fold-cont-box${!fold && children ? ' active' : ''}${checked ? ' on' : ''} ${
          className ? className : ''
        }`}
      >
        <div className="fold-switch" onClick={this.switch.bind(this, 'fold', !fold)}>
          <WCheckBox
            className="f-s-check"
            checked={checked}
            onChange={this.switch.bind(this, 'checked')}
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
