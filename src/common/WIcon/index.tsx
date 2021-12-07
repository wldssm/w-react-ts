import React, { Component } from 'react';

interface Props {
  className?: string,
  onClick?: (e: Event) => any,
  code: string
}

class WIcon extends Component<Props> {
  static defaultProps = {
    className: '',
    onClick: () => { }
  };

  click = (e?: any) => {
    this.props.onClick && this.props.onClick(e);
  };
  render() {
    return (
      <span onClick={this.click} className={`iconfont ${this.props.className}`} dangerouslySetInnerHTML={{ __html: this.props.code }}></span>
    );
  }
}

export default WIcon;