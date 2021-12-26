import React, { Component, createRef } from 'react';

import './index.less';

interface Props {
  value: number; // 当前值
  min: number; // 最小值
  max: number; // 最大值
  step: number; // 步长
  showInput: boolean; // 显示输入框
  className: string;
  onChange?: (...param: any) => any;
}

class Slider extends Component<Props> {
  static defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    className: '',
  };
  state = {
    dotLeft: 0, //
  };
  runwayRef: React.RefObject<HTMLInputElement> = createRef();
  dotRef: React.RefObject<HTMLInputElement> = createRef();
  dotStartX = 0; // 鼠标相对页面的位置（鼠标按下圆点）
  isDrag = false; // 拖动中

  // get curValue() {
  //   let runwayPosi: any = this.runwayRef?.current?.getBoundingClientRect() || {};
  //   console.log(runwayPosi);

  // }

  // 点击选择
  clickRunway = (e: any) => {
    console.log(e.pageX);
  };
  // 鼠标按下
  mouseDown = (e: any) => {
    e.preventDefault();
    e?.persist();
    e?.nativeEvent?.stopImmediatePropagation();
    e?.stopPropagation();

    this.isDrag = true;
    this.dotStartX = e.pageX;

    console.log(e.target.offsetLeft);
    console.log(e.target.getClientRects());
    console.log(e.target.getBoundingClientRect());

    console.log(3, e);
  };
  // 鼠标移动
  mouseMove = (e: any) => {
    e?.persist();
    if (this.isDrag) {
      let diffX = e.pageX - this.dotStartX;
      this.dotRef.current;
    }
  };
  stopMove = () => {
    this.isDrag = false;
  };

  render() {
    return (
      <div className="slider-box">
        <div className="slider-runway" ref={this.runwayRef} onMouseDown={this.clickRunway}>
          {/* <div className="slider-runway" ref={this.runwayRef} onClick={this.clickRunway}> */}
          <div className="slider-bar"></div>
          <div
            className="slider-dot"
            ref={this.dotRef}
            style={{ left: this.dotLeft }}
            onMouseDown={this.mouseDown}
            onMouseMove={this.mouseMove}
            onMouseUp={this.stopMove}
          ></div>
        </div>
      </div>
    );
  }
}

export default Slider;
