import React, { Component } from 'react';

import './index.less';

interface Props {
  label: string; // 标签名
  tag: string;
  curTag: string;
  className?: string;
  index?: string;
  children?: React.ReactNode;
}

class AiTabPane extends Component<Props> {
  static defaultProps = {
    label: '标题',
    className: '',
    index: Math.random().toString(36).substring(2),
  };
  render() {
    let { children, tag, curTag, className, index } = this.props;
    return (
      curTag === tag && (
        <div className={`t-main ${className}`} key={index}>
          {children}
        </div>
      )
    );
  }
}

export default AiTabPane;
