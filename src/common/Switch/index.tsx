import React, { Component } from 'react';

import './index.less';

interface Props {
  value: boolean;
  name: string;
  disabled: boolean;
  width?: string;
  className: string;
  change: (...params: any) => any;
}

class Switch extends Component<Props> {
  static defaultProps = {
    value: false,
    name: '',
    disabled: false,
    className: '',
    change: () => {},
  };
  state = {
    curValue: false,
  };

  componentDidMount() {
    this.setState({ curValue: this.props.value });
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.value !== prevProps.value) {
      this.setState({ curValue: this.props.value });
    }
  }

  // 切换状态
  switch = () => {
    if (this.props.disabled) return false;
    this.setState(
      (pre: any) => {
        return {
          curValue: !pre.curValue,
        };
      },
      () => {
        this.props.change(this.state.curValue, this.props.name);
      },
    );
  };
  render() {
    let { disabled, className, width } = this.props,
      { curValue } = this.state;
    return (
      <span
        className={`switch-box${curValue ? ' on' : ''}${disabled ? ' disabled' : ''} ${
          className || ''
        }`}
        style={{ width: width }}
        onClick={this.switch}
      ></span>
    );
  }
}

export default Switch;
