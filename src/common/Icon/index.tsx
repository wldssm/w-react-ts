import React, { Component } from 'react';

import './index.less';

interface Props {
  className?: string;
  onClick?: (e: Event) => any;
  title?: string;
  code: string;
}

class WIcon extends Component<Props> {
  static defaultProps = {
    className: '',
    onClick: () => {},
  };

  click = (e?: any) => {
    this.props.onClick && this.props.onClick(e);
  };
  render() {
    let { title, code, className } = this.props;
    return (
      <span
        title={title}
        onClick={this.click}
        className={`${code === '&#xe8fd;' ? 'iconfont i-icon-loading' : 'iconfont'} ${className}`}
        dangerouslySetInnerHTML={{ __html: code }}
      ></span>
    );
  }
}

export default WIcon;
