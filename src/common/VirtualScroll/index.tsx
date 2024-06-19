import React, { Component, createRef } from 'react';
import './index.less';

interface Props {
  data: any[]; // 数据源
  total: number; // 无限加载时的数据总条数
  pageSize: number; // 无限加载时的分页pageSize
  curPage: number; // 无限加载时的当前页
  itemMinHeight: number; // 数据项的最小高度
  flexNum: number; // 缓存多少条，越大越流畅BufferSize
  fill: boolean; // 初始是否预填充bottom
  boxRef: React.RefObject<HTMLDivElement>; // 外容器ref
  height?: string; // 外容器高度
  itemClassName: string | ((...param: any) => any);
  className?: string;
  render: (...param: any) => any; // 渲染list内容
  loadMore?: (...param: any) => any; // 无限加载时加载更多数据
  onClick?: (...param: any) => any; // 点击子项
}

class VirtualScroll extends Component<Props> {
  static defaultProps = {
    data: [],
    total: 0,
    pageSize: 20,
    curPage: 1,
    itemMinHeight: 20,
    flexNum: 0,
    fill: false,
    boxRef: createRef(),
    itemClassName: '',
    className: '',
  };
  // boxRef: React.RefObject<HTMLDivElement> = createRef(); // 容器
  contRef: React.RefObject<HTMLDivElement> = createRef(); // 内容
  state = {
    showList: [], // 当前显示的list
    startIndex: 0, // 显示的起始下标
    scrollTop: 0, // 滚动高度
    paddingTop: 0,
    paddingBottom: 0,
  };
  isRolling = false; // 滚动中

  componentDidMount() {
    this.init();
    this.getShowList();
    this.props.boxRef?.current?.addEventListener('scroll', this.onScroll, { passive: false });
  }
  componentWillUnmount() {
    this.props.boxRef?.current?.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.data !== prevProps.data || this.props.height !== prevProps.height) {
      this.init();
      this.getShowList();
    }
  }

  // 显示的数据条数（注：高度不能正好，必须可出现滚动条。）
  get showNum() {
    let { flexNum, itemMinHeight } = this.props,
      boxPosi: any = this.props.boxRef?.current?.getBoundingClientRect() || {},
      height = boxPosi?.bottom - boxPosi?.top || 0,
      num: any = height / itemMinHeight;
    return Math.ceil(num) + 1 + flexNum;
  }

  // 初始化
  init = () => {
    let { pageSize, curPage, data, total, fill, itemMinHeight } = this.props;

    // 初始填充bottom
    if (fill && this.state.paddingBottom === 0) {
      let paddingBottom = 0,
        len = total > 0 ? total : data.length;
      if (len > this.showNum) {
        len = len - this.showNum;
        paddingBottom = itemMinHeight * len;
        this.setState({ paddingBottom });
      }
    }

    // 无限加载的初始化
    if (total > 0 && data.length < total && this.showNum > data.length) {
      // 初始数据太少导致无法变更startIndex
      let nums = Math.ceil((this.showNum - data.length) / pageSize);
      for (let i = 0; i < nums; i++) {
        this.props.loadMore && this.props.loadMore(++curPage);
      }
    }
  };

  //总页数
  getPageNum = () => {
    let { total, pageSize } = this.props;
    return Math.ceil(total / pageSize);
  };

  // 获取显示的数据
  getShowList = (dir?: string, curChangeSize: number = 0) => {
    let { startIndex, paddingTop, paddingBottom, scrollTop } = this.state,
      { data, itemMinHeight } = this.props;
    startIndex = dir ? startIndex : 0;
    const showList = data.slice(startIndex, startIndex + this.showNum);

    if (dir) {
      setTimeout(() => {
        let contEl: any = this.contRef?.current,
          showItems = contEl?.childNodes || {},
          innerIndex = 0;

        if (dir === 'up') {
          if (startIndex + this.showNum >= data.length) {
            paddingBottom = 0;
          } else {
            if (curChangeSize <= this.showNum) {
              innerIndex = this.showNum - curChangeSize;
            } else {
              paddingBottom -= (curChangeSize - this.showNum) * itemMinHeight;
            }

            let lastItem = showItems[this.showNum - 1]?.getBoundingClientRect() || {},
              changeItem = showItems[innerIndex]?.getBoundingClientRect() || {};
            paddingBottom -= lastItem?.bottom - changeItem?.top;

            paddingBottom = paddingBottom > 0 ? paddingBottom : 0;
          }
          this.setState({ paddingBottom });
        } else {
          if (startIndex <= 0) {
            paddingTop = 0;
          } else {
            innerIndex = this.showNum - 1;

            if (curChangeSize <= this.showNum) {
              innerIndex = curChangeSize - 1;
            } else {
              paddingTop -= (curChangeSize - this.showNum) * itemMinHeight;
            }

            let firstItem = showItems[0]?.getBoundingClientRect() || {},
              changeItem = showItems[innerIndex]?.getBoundingClientRect() || {};
            paddingTop -= changeItem?.bottom - firstItem?.top;

            let minPaddingTop = startIndex * itemMinHeight;
            paddingTop = paddingTop > minPaddingTop ? paddingTop : minPaddingTop;
          }
          this.setState({ paddingTop });
        }
      }, 0);
      this.setState({ showList });
      return;
    }
    if (scrollTop) {
      this.contRef?.current?.scrollIntoView({ block: 'start' });
    }
    this.setState({ showList, startIndex, paddingTop: 0, paddingBottom: 0 });
  };

  // 上滚（计算滚动了多少个元素距离）
  upScroll = (curScrollTop: number) => {
    let { data, flexNum, itemMinHeight } = this.props,
      { startIndex, paddingTop } = this.state,
      showList: any = this.contRef.current?.childNodes || [],
      boxTop = this.props.boxRef?.current?.offsetTop || 0,
      curChangeSize = 0;

    if (startIndex + this.showNum < data.length) {
      showList = [].slice.call(showList);

      let firstItem = showList[0]?.getBoundingClientRect() || {},
        flexItem = showList[flexNum]?.getBoundingClientRect() || {},
        flexH = flexItem?.top - firstItem?.top || itemMinHeight,
        lastItem = showList[this.showNum - 1]?.getBoundingClientRect() || {},
        lastH = lastItem?.bottom - lastItem?.top || 0,
        lastBottom = lastH + showList[this.showNum - 1]?.offsetTop - boxTop, // 最后一个元素底部距离父元素顶部的距离
        curThreshold = paddingTop + flexH; // 临界值

      if (curScrollTop > curThreshold) {
        let overGap = curScrollTop - lastBottom,
          stepGap = overGap / itemMinHeight;
        if (overGap > 0) {
          // 超出最后一个
          stepGap = Math.floor(stepGap);
          curChangeSize = stepGap + this.showNum;
        } else {
          stepGap = Math.ceil(-stepGap);
          if ((stepGap + '').indexOf('.') >= 0) {
            stepGap += 1;
          }
          curChangeSize = this.showNum - stepGap;
          curChangeSize = curChangeSize > 0 ? curChangeSize : 0;

          for (let i = curChangeSize; i < this.showNum; i++) {
            let curBottom = showList[i]?.offsetTop - boxTop + showList[i]?.clientHeight;

            if (curBottom > curScrollTop) {
              break;
            } else {
              curChangeSize++;
            }
          }
        }
        if (startIndex + curChangeSize + this.showNum > data.length) {
          // console.log('最后');
          curChangeSize = data.length - this.showNum - startIndex;
        }
        startIndex += curChangeSize;

        if (curChangeSize < this.showNum) {
          paddingTop = showList[curChangeSize]?.offsetTop - boxTop || paddingTop;
        } else {
          paddingTop = lastBottom + (curChangeSize - this.showNum) * itemMinHeight;
        }
        let minPaddingTop = startIndex * itemMinHeight;
        paddingTop = paddingTop > minPaddingTop ? paddingTop : minPaddingTop;
      }
    }
    if (startIndex !== this.state.startIndex) {
      this.setState({ startIndex, paddingTop, scrollTop: curScrollTop }, () => {
        this.getShowList('up', curChangeSize);
      });
    } else {
      this.setState({ scrollTop: curScrollTop });
    }

    let { curPage, total } = this.props;
    if (total > 0 && data.length < total && startIndex + this.showNum >= data.length) {
      this.props.loadMore && this.props.loadMore(curPage + 1);
    }
    // console.log(2, 'index', '上滚', startIndex);
  };
  // 下滚
  downScroll = (curScrollTop: number) => {
    let { flexNum, itemMinHeight } = this.props,
      { startIndex, paddingTop, paddingBottom } = this.state,
      showList: any = this.contRef.current?.childNodes || [],
      boxEl = this.props.boxRef?.current,
      curChangeSize = 0;

    if (startIndex > 0) {
      showList = [].slice.call(showList);

      let flexH = itemMinHeight;
      if (flexNum > 0) {
        flexH = showList[flexNum + 1]?.offsetTop - showList[0]?.offsetTop || flexH;
      }
      let boxH = boxEl?.clientHeight || 0,
        boxTop = boxEl?.offsetTop || 0,
        lastItem = showList[this.showNum - 1]?.getBoundingClientRect() || {},
        lastH = lastItem?.bottom - lastItem?.top || 0,
        lastBottom = lastH + showList[this.showNum - 1]?.offsetTop - boxTop, // 最后一个元素底部距离父元素顶部的距离
        curThreshold = paddingTop + flexH; // 临界值

      let canFlex = lastBottom - flexH >= curScrollTop + boxH;
      if (curScrollTop < curThreshold && canFlex) {
        let overGap = curScrollTop - paddingTop,
          stepGap = overGap / itemMinHeight;
        if (overGap >= 0) {
          curChangeSize = flexNum > 0 ? flexNum : 1;
        } else {
          // 超出第一个
          stepGap = Math.ceil(-stepGap);
          curChangeSize = stepGap + flexNum;
        }
        if (startIndex - curChangeSize < 0) {
          // console.log('最后');
          curChangeSize = startIndex;
        }
        startIndex -= curChangeSize;

        let innerIndex = 0;
        if (curChangeSize <= this.showNum) {
          innerIndex = this.showNum - curChangeSize;
        } else {
          paddingBottom += (curChangeSize - this.showNum) * itemMinHeight;
        }
        let changeItem = showList[innerIndex]?.getBoundingClientRect() || {};
        paddingBottom += lastItem?.bottom - changeItem?.top;
      }
    }

    if (startIndex !== this.state.startIndex) {
      this.setState({ startIndex, paddingBottom, scrollTop: curScrollTop }, () => {
        this.getShowList('down', curChangeSize);
      });
    } else {
      this.setState({ scrollTop: curScrollTop });
    }

    // console.log(1, 'index', '下滚', startIndex);
  };

  onScroll = (e: any) => {
    if (this.isRolling) {
      return;
    }
    this.isRolling = true;
    requestAnimationFrame(() => {
      this.isRolling = false;
    });

    let { scrollTop } = this.state,
      curScrollTop = e.target.scrollTop,
      disPosi = curScrollTop - scrollTop;
    if (disPosi > 0) {
      this.upScroll(curScrollTop);
    } else {
      this.downScroll(curScrollTop);
    }
  };

  // 单项点击
  clickItem = (item: any, index: any, e: any) => {
    this.props.onClick && this.props.onClick(item, index, e);
  };

  render() {
    const { className, render, boxRef, height, itemClassName } = this.props,
      { showList, startIndex, paddingTop, paddingBottom } = this.state;
    return (
      <div className={`virtual-box ${className}`} ref={boxRef} style={{ height: height }}>
        <div
          className="box-cont"
          ref={this.contRef}
          style={{ padding: `${paddingTop}px 0 ${paddingBottom}px` }}
        >
          {showList.map((item, index) => {
            let curIndex = startIndex + index;
            return (
              <div
                key={curIndex}
                className={`item ${
                  typeof itemClassName === 'string' ? itemClassName : itemClassName(item, curIndex)
                }`}
                onClick={this.clickItem.bind(this, item, curIndex)}
              >
                {render(item, curIndex)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default VirtualScroll;
