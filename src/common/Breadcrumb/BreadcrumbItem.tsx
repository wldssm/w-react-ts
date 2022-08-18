import React, { Component, Fragment } from 'react';

import './index.less';

interface Props {
  separator?: React.ReactNode;
  className?: string;
  onClick?: (...param: any) => any; // 单击文本
}
class WBreadcrumbItem extends Component<Props> {
  static defaultProps = {
    className: '',
    onClick: () => {},
  };

  click = (e: any) => {
    this.props.onClick && this.props.onClick(e);
  };

  render() {
    let { children, className, separator } = this.props;

    return (
      <Fragment>
        <span className={`breadcrumb-item ${className}`} onClick={this.click}>
          {children}
        </span>
        <span className="breadcrumb-item-separator">{separator}</span>
      </Fragment>
    );
  }
}

export default WBreadcrumbItem;
