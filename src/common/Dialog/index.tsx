import React, { Component } from 'react';

import WIcon from '../Icon';
import WButton from '../Button';
import './index.less';

interface Props {
  show: boolean; // 显示弹框
  title: string; // 标题
  showHeader: boolean;
  showBtn: boolean;
  btnLoading: boolean;
  btnDisabled: boolean;
  className: string;
  headNode: any; // 头部插槽
  onClose: () => any;
  onSure: () => any;
}

class WDialog extends Component<Props> {
  static defaultProps = {
    show: false,
    title: '提示',
    showHeader: true,
    showBtn: false,
    btnLoading: false,
    btnDisabled: false,
    className: '',
  };

  // 关闭弹框
  close = () => {
    this.props.onClose();
  };
  // 弹框确定
  sure = () => {
    this.props.onSure();
  };
  render() {
    let {
      show,
      title,
      children,
      showHeader,
      headNode,
      className,
      showBtn,
      btnLoading,
      btnDisabled,
    } = this.props;
    return (
      show && (
        <div className="pop-model">
          <div className={`p-main ${className}`}>
            {/* head */}
            {showHeader && (
              <div className="p-head">
                {headNode}
                <p className="title">{title}</p>
                <WIcon className="i-close" onClick={this.close} code="&#xe600;" />
              </div>
            )}
            {/* mian */}
            {children}
            {showBtn && (
              <div className="btn-cont">
                <WButton className="btn-cancel" onClick={this.close}>
                  取消
                </WButton>
                <WButton
                  className="btn-sure"
                  disabled={btnDisabled}
                  showLoading={btnLoading}
                  onClick={this.sure}
                >
                  确定
                </WButton>
              </div>
            )}
          </div>
          <div className="pop-mask"></div>
        </div>
      )
    );
  }
}

export default WDialog;
