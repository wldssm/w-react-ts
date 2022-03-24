import React, { Component } from 'react';

import WTabPane from './WTabPane';
import './index.less';

interface Props {
  initTag: string;
  className?: string;
  onClick?: (...param: any) => any;
}

class WTab extends Component<Props> {
  static defaultProps = {
    initTag: '',
    className: '',
    onClick: () => {},
  };

  state = {
    curTag: '',
  };

  componentDidMount() {
    if (this.props.initTag) {
      this.setState({ curTag: this.props.initTag });
    } else {
      let childs: any = this.props.children;
      if (childs) {
        let curTag = Array.isArray(childs) ? childs[0]?.props.tag : childs.props.tag;
        this.setState({ curTag: curTag });
      }
    }
  }

  click = (tag: string, index: number, item: any) => {
    this.props.onClick && this.props.onClick(tag, index, item);
    this.setState({ curTag: tag });
  };

  render() {
    let { children, className } = this.props;
    return (
      <div className="tab-box">
        <div className={`t-top ${className}`}>
          {React.Children.map(children, (item: any, i) => {
            if (!item) return;
            let { label, tag } = item?.props;
            return (
              <div
                className={`item ${tag === this.state.curTag ? 'on' : ''}`}
                onClick={this.click.bind(this, tag, i, item)}
                key={i}
              >
                {typeof label === 'function' ? label() : label}
              </div>
            );
          })}
        </div>
        {React.Children.map(children, (child: any, index) => {
          if (!child) return;
          return React.cloneElement(child, {
            index: index,
            curTag: this.state.curTag,
          });
        })}
      </div>
    );
  }
}

export { WTab, WTabPane };
