import React, { Component } from 'react';

import WIcon from '../WIcon';
import './index.less';

interface Props {
  checked: boolean,
  disabled: boolean,
  className?: string,
  onChange?: (...param: any) => any,
}

class AiCheckBox extends Component<Props> {
  static defaultProps = {
    checked: false,
    disabled: false,
    className: '',
    onChange: () => { }
  };

  check = (e?: any) => {
    e && e.preventDefault();
    if (this.props.disabled) return false;
    this.props.onChange && this.props.onChange(!this.props.checked, e);
  };
  render() {
    let { disabled, className, checked } = this.props;
    return (
      <div className={`icon-check ${disabled ? 'disabled' : ''} ${checked ? 'active' : ''} ${className}`} onClick={this.check}>
        {checked && <WIcon className="check-on" code='&#xe605;' />}
      </div>
    );
  }
}

export default AiCheckBox;