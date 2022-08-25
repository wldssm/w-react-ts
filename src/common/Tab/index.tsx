import React, { Component } from 'react';

import WTabPane from './WTabPane';
import './index.less';

interface Props {
  curTag: string;
  className?: string;
  onClick?: (...param: any) => any;
}

class WTab extends Component<Props> {
  static defaultProps = {
    curTag: '',
    className: '',
    onClick: () => {},
  };

  state = {
    curTag: '',
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.curTag !== prevProps.curTag) {
      this.init();
    }
  }

  init = () => {
    let { curTag } = this.props;
    if (curTag) {
      this.setState({ curTag });
    } else {
      let childs: any = this.props.children;
      if (childs) {
        let curTag = Array.isArray(childs) ? childs[0]?.props.tag : childs.props.tag;
        this.setState({ curTag });
      }
    }
  };

  click = (tag: string, index: number, item: any) => {
    this.props.onClick && this.props.onClick(tag, index, item);
  };

  render() {
    let { children, className } = this.props,
      { curTag } = this.state;
    return (
      <div className="tab-box">
        <div className={`t-top ${className}`}>
          {React.Children.map(children, (item: any, i) => {
            if (!item) return;
            let { label, tag } = item?.props;
            return (
              <div
                className={`item ${tag === curTag ? 'on' : ''}`}
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
            curTag: curTag,
          });
        })}
      </div>
    );
  }
}

export { WTab, WTabPane };
