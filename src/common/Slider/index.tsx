import React, { Component, createRef } from 'react';
// import { WTooltip } from '../Tooltip/index';

import './index.less';

interface Props {
  value: number; // 当前值
  min: number; // 最小值
  max: number; // 最大值
  step: number; // 步长
  label?: string; // label文本
  showRange: boolean; // 显示最大值最小值
  showInput: boolean; // 显示输入框
  disabled: boolean; // 禁用
  className: string;
  onChange?: (...param: any) => any; // 值改变时触发（松开鼠标后）
  onInput?: (...param: any) => any; // 拖拽时触发
}

class Slider extends Component<Props> {
  static defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    label: '3434',
    showRange: true,
    disabled: false,
    className: '',
  };
  state = {
    newPosi: 0, // 当前位置
  };
  runwayRef: React.RefObject<HTMLInputElement> = createRef();
  runwayWidth = 0;
  startPageX = 0; // 鼠标相对页面的位置（鼠标按下圆点）
  newValue = 0; // 当前value值
  isDrag = false; // 拖动中

  // 获取圆点当前位置
  get curPosi() {
    let { value, min, max } = this.props;
    return ((value - min) / (max - min)) * 100;
  }
  // 获取小数位个数
  get precision() {
    let { min, max, step } = this.props;
    let precisions = [min, max, step].map((item) => {
      let decimal = ('' + item).split('.')[1];
      return decimal ? decimal.length : 0;
    });
    return Math.max.apply(null, precisions);
  }

  componentDidMount() {
    this.setState({ newPosi: this.curPosi });
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.draging);
    window.removeEventListener('mouseup', this.dragEnd);
  }

  // 点击跑道选择
  clickRunway = (e: any) => {
    if (this.props.disabled) return false;
    e?.persist();
    e.preventDefault();

    let runwayPosi: any = this.runwayRef?.current?.getBoundingClientRect();
    this.runwayWidth = runwayPosi?.right - runwayPosi?.left;
    let newPosi = ((e.pageX - runwayPosi?.left) / this.runwayWidth) * 100;

    this.calcStep(newPosi);
    this.props.onChange && this.props.onChange(this.newValue);
  };
  // 鼠标按下圆点
  mouseDown = (e: any) => {
    if (this.props.disabled) return false;
    e?.persist();
    e.preventDefault();
    e?.nativeEvent?.stopImmediatePropagation(); // 阻止冒泡，防止触发全局事件
    e.stopPropagation();

    this.isDrag = true;
    this.startPageX = e.pageX;

    let runwayPosi: any = this.runwayRef?.current?.getBoundingClientRect();
    this.runwayWidth = runwayPosi?.right - runwayPosi?.left;

    window.addEventListener('mousemove', this.draging);
    window.addEventListener('mouseup', this.dragEnd);
  };
  // 拖动中
  draging = (e: any) => {
    e.preventDefault();
    if (this.isDrag) {
      let diffX = ((e.pageX - this.startPageX) / this.runwayWidth) * 100,
        newPosi = this.curPosi + diffX;
      this.calcStep(newPosi);
    }
  };
  // 停止拖动
  dragEnd = () => {
    this.isDrag = false;
    this.props.onChange && this.props.onChange(this.newValue);
    window.removeEventListener('mousemove', this.draging);
    window.removeEventListener('mouseup', this.dragEnd);
  };
  // 计算当前值
  calcStep = (newPosi: any) => {
    if (newPosi === null || isNaN(newPosi)) return;
    if (newPosi < 0) {
      newPosi = 0;
    } else if (newPosi > 100) {
      newPosi = 100;
    }
    let { min, max, step } = this.props,
      stepLen = 100 / ((max - min) / step), // 每个间隔多少百分比
      curStep = Math.round(newPosi / stepLen), // 当前位移在多少间隔
      value = curStep * step + min;
    value = parseFloat(value.toFixed(this.precision));

    this.newValue = value;
    this.setState({ newPosi: curStep * stepLen });
    this.props.onInput && this.props.onInput(value);
  };

  // 双向绑定数据
  change = (e: any) => {
    const target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value;
    // this.props.change(this.props.name, value);
  };
  // 回车提交
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      // this.props.onEnter(this.props.name);
    }
  };

  render() {
    let { newPosi } = this.state,
      { disabled, min, max, label, className, showRange, value } = this.props;
    return (
      <div className={`slider-box ${className ? className : ''}`}>
        <p className="slider-label">{label}</p>
        <div className="slider-cont">
          {/* main */}
          <div className="slider-main">
            {/* runway */}
            <div
              className={`slider-runway ${disabled ? 'disabled' : ''}`}
              ref={this.runwayRef}
              onMouseDown={this.clickRunway}
            >
              <div className="slider-bar" style={{ width: newPosi + '%' }}></div>
              <div
                className="slider-dot-box"
                style={{ left: newPosi + '%' }}
                onMouseDown={this.mouseDown}
              >
                <div className="slider-dot"></div>
              </div>
            </div>
            {/* mark */}
            {showRange && (
              <div className="mark-box">
                <span className="m-left">{min}</span>
                <span className="m-right">{max}</span>
              </div>
            )}
          </div>
          {/* input */}
          <input
            type="text"
            onChange={this.change}
            value={this.newValue}
            autoComplete="off"
            onKeyPress={this.keyPress}
          />
        </div>
      </div>
    );
  }
}

export default Slider;
