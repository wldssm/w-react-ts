import React, { Component } from 'react';

import WIcon from '../Icon/index';
import styles from './index.less';

interface Props {
  icon?: string,
  showLoading?: boolean,
  disabled?: boolean,
  className?: string,
  onClick?: (e: Event) => any,
}

class WButton extends Component<Props> {
  static defaultProps = {
    onClick: () => [],
    icon: '',  // 图标code
    showLoading: false,
    disabled: false,
    className: ''
  };

  // 单击触发
  click = (e?: any) => {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(e);
    }
  };

  render() {
    let { children, showLoading, icon, disabled, className } = this.props;
    return (
      <button type="button" className={`${styles["ai-btn"]} ${className} ${disabled ? styles["disabled"] : ''}`} onClick={this.click.bind(this)}>
        {(!showLoading && icon) && <WIcon className="btn-icon" code={icon} />}
        {showLoading && <WIcon className={`${styles["loading"]} ${styles["btn-icon"]}`} code="&#xe8fd;" />}
        {children}
      </button>
    );
  }
}

export default WButton;