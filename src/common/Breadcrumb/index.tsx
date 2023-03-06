import React, { Component } from 'react';

import WBreadcrumbItem from './BreadcrumbItem';
import './index.less';

interface Props {
  separator?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
class WBreadcrumb extends Component<Props> {
  static defaultProps = {
    separator: '>',
    className: '',
  };

  render() {
    let { separator, children, className } = this.props;
    return (
      <div className={`breadcrumb-box ${className}`}>
        {React.Children.map(children, (child: any) => {
          return (
            child &&
            React.cloneElement(child, {
              separator,
            })
          );
        })}
      </div>
    );
  }
}

export { WBreadcrumb, WBreadcrumbItem };
