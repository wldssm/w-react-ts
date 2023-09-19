import React, { Component, ReactNode, createRef } from 'react';

import WTabPane from './WTabPane';
import './index.less';

interface Props {
  curTag: string;
  extraNode?: { left?: ReactNode; right?: ReactNode } | ReactNode;
  className?: string;
  onClick?: (...param: any) => any;
  children?: React.ReactNode;
}

class WTab extends Component<Props> {
  static defaultProps = {
    curTag: '',
    extraNode: null,
    className: '',
    onClick: () => {},
  };

  state = {
    curTag: '',
  };
  tabRef: React.RefObject<HTMLDivElement> = createRef();

  componentDidMount() {
    this.tabRef?.current?.addEventListener('wheel', this.wheelTab, { passive: false });
    this.init();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.curTag !== prevProps.curTag) {
      this.init();
    }
  }

  componentWillUnmount(): void {
    this.tabRef?.current?.removeEventListener('wheel', this.wheelTab);
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

  // 横向滚动
  wheelTab = (event: any) => {
    event?.stopPropagation();
    event.preventDefault();

    const scrollValue = event.deltaY > 0 ? 100 : -100;
    if (this.tabRef?.current) {
      this.tabRef.current.scrollLeft += scrollValue;
    }

    // if(!this.tabRef?.current) return;

    // // 判断是否已经滚动到最左边
    // if (this.tabRef.current?.scrollLeft === 0) {
    //   // console.log('已经滚动到最左边');
    // }

    // // 判断是否已经滚动到最右边
    // if (this.tabRef.current?.scrollLeft === (this.tabRef.current?.scrollWidth - this.tabRef.current?.clientWidth)) {
    //   // console.log('已经滚动到最右边');
    // }

    // // 判断是否出现垂直滚动条
    // if (this.tabRef.current?.scrollWidth > this.tabRef.current?.clientWidth) {
    //   // console.log('内容超出容器高度，可能会出现垂直滚动条');
    // }
  };

  render() {
    let { children, className, extraNode } = this.props,
      { curTag } = this.state,
      isDom = extraNode?.['$$typeof' as keyof typeof extraNode];
    return (
      <div className="tab-box">
        <div className={`t-top ${className}`}>
          {extraNode?.['left' as keyof typeof extraNode]}
          <div className="t-top-center" ref={this.tabRef}>
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
          {isDom ? (extraNode as ReactNode) : extraNode?.['right' as keyof typeof extraNode]}
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
