import React, { Component } from 'react';

import './index.less';

interface Props {
  label: string; // 标签名
  tag: string;
  curTag: string;
  className?: string;
}

class AiTabPane extends Component<Props> {
  static defaultProps = {
    label: '标题',
    className: '',
  };
  render() {
    let { children, tag, curTag, className } = this.props;
    return (
      curTag === tag && (
        <div className={`t-main ${className}`} key={Math.random().toString(36).substring(2)}>
          {children}
        </div>
      )
    );
  }
}

export default AiTabPane;
