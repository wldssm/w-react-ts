import React, { Component } from 'react';

import WIcon from '../Icon/index';
import './index.less';

interface Props {
  icon?: string;
  showLoading?: boolean;
  disabled?: boolean;
  width?: string;
  className?: string;
  onClick?: (e: Event) => any;
  children?: React.ReactNode;
}

class WButton extends Component<Props> {
  static defaultProps = {
    onClick: () => [],
    icon: '', // 图标code
    showLoading: false,
    disabled: false,
    className: '',
  };

  // 单击触发
  click = (e?: any) => {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(e);
    }
  };

  render() {
    let { children, showLoading, icon, disabled, className, width } = this.props;
    return (
      <button
        type="button"
        className={`ai-btn ${className} ${disabled ? 'disabled' : ''}`}
        style={{ width: width }}
        onClick={this.click.bind(this)}
      >
        {!showLoading && icon && <WIcon className="btn-icon" code={icon} />}
        {showLoading && <WIcon className="loading btn-icon" code="&#xe8fd;" />}
        {children}
      </button>
    );
  }
}

export default WButton;
