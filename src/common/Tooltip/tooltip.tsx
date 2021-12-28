import React, { Component } from 'react';

import './index.less';

interface Props {
  content: string;
  dir: string; // 气泡框剪头方向：top、bottom、right、left
}

class InnerTooltip extends Component<Props> {
  static defaultProps = {
    content: '2323',
    dir: 'top',
    className: '',
  };
  render() {
    console.log(225555);

    let { content } = this.props;
    return (
      <div className="tooltip-box">
        {content}
        <div className="tip-arrow"></div>
      </div>
    );
  }
}

export default InnerTooltip;
