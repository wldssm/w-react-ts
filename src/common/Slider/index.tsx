import React, { Component, createRef } from 'react';
import WTooltip from '../Tooltip/index';

import './index.less';

interface Props {
  value: number; // 当前值
  min: number; // 最小值
  max: number; // 最大值
  step: number; // 步长
  label?: string; // label文本
  name?: string;
  showTip: boolean; // 显示tooltip
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
    showTip: true,
    showRange: false,
    showInput: false,
    disabled: false,
    name: '',
    className: '',
  };
  state = {
    newPosi: 0, // 当前位置
    newValue: 0, // 当前value值
    initPosi: 0, // 初始posi
    dotActive: false, // 点是否激活状态
  };
  runwayRef: React.RefObject<HTMLInputElement> = createRef();
  dotRef: React.RefObject<HTMLDivElement> = createRef();
  runwayWidth = 0;
  startPageX = 0; // 鼠标相对页面的位置（鼠标按下圆点）
  isDrag = false; // 拖动中

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
    this.initUpdate();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.value !== prevProps.value) {
      this.initUpdate();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.draging);
    window.removeEventListener('mouseup', this.dragEnd);
  }

  // 初始数据更新位置
  initUpdate = () => {
    let { value } = this.props;
    value = parseFloat((+value).toFixed(this.precision));
    value = this.getCurValue(value);

    this.setState({
      newPosi: this.getCurPosi(value),
      newValue: value,
    });
  };

  // 获取当前值
  getCurValue = (value: any) => {
    let { min, max } = this.props;
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    return value;
  };

  // 获取圆点当前位置
  getCurPosi = (value: any) => {
    let { min, max } = this.props;
    value = this.getCurValue(value);
    return ((value - min) / (max - min)) * 100;
  };

  // 点击跑道选择
  clickRunway = (e: any) => {
    if (this.props.disabled) return false;
    e?.persist();
    e.preventDefault();

    let runwayPosi: any = this.runwayRef?.current?.getBoundingClientRect();
    this.runwayWidth = runwayPosi?.right - runwayPosi?.left;
    let newPosi = ((e.pageX - runwayPosi?.left) / this.runwayWidth) * 100;

    this.setState({ ...this.calcStep(newPosi) }, () => {
      this.props.onInput && this.props.onInput(this.state.newValue, this.props.name);
      this.props.onChange && this.props.onChange(this.state.newValue, this.props.name);
    });
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

    this.setState(
      {
        initPosi: this.getCurPosi(this.props.value),
        dotActive: true,
      },
      () => {
        this.dotRef?.current?.focus();
      },
    );
    let runwayPosi: any = this.runwayRef?.current?.getBoundingClientRect();
    this.runwayWidth = runwayPosi?.right - runwayPosi?.left;

    window.addEventListener('mousemove', this.draging);
    window.addEventListener('mouseup', this.dragEnd);
  };
  // 拖动中
  draging = (e: any) => {
    let { initPosi } = this.state;
    e.preventDefault();
    if (this.isDrag) {
      let diffX = ((e.pageX - this.startPageX) / this.runwayWidth) * 100,
        newPosi = initPosi + diffX;

      this.setState({ ...this.calcStep(newPosi) }, () => {
        this.props.onInput && this.props.onInput(this.state.newValue, this.props.name);
      });
    }
  };
  // 停止拖动
  dragEnd = () => {
    this.isDrag = false;
    this.setState({ initPosi: this.state.newPosi });
    this.props.onChange && this.props.onChange(this.state.newValue, this.props.name);
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

    return {
      newPosi: curStep * stepLen,
      newValue: value,
    };
  };

  // 双向绑定数据
  change = (e: any) => {
    let target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value;

    value = this.getCurValue(value);
    this.setState({
      newPosi: this.getCurPosi(value),
      newValue: value,
    });
    this.props.onInput && this.props.onInput(value, this.props.name);
  };
  // 回车提交
  pressSubmit = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      let curValue = this.state.newValue;
      this.setState({
        newPosi: this.getCurPosi(curValue),
        newValue: curValue,
      });
      this.props.onChange && this.props.onChange(curValue, this.props.name);
    }
  };

  // 左右按键位移
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode,
      { step } = this.props,
      curValue = this.state.newValue;

    if (curKey === 37 || curKey === 40) {
      // 左移
      curValue -= step;
    } else if (curKey === 38 || curKey === 39) {
      // 右
      curValue += step;
    }
    this.setState({
      newPosi: this.getCurPosi(curValue),
      newValue: this.getCurValue(curValue),
    });
    this.props.onChange && this.props.onChange(curValue, this.props.name);
  };
  // 点击其他区域圆点失去焦点
  dotBlur = () => {
    this.setState({ dotActive: false });
  };
  // 圆点渲染
  dotRender = (newPosi: any, dotActive: any) => {
    return (
      <div className="slider-dot-box" style={{ left: newPosi + '%' }} onMouseDown={this.mouseDown}>
        <div
          ref={this.dotRef}
          className={`slider-dot${dotActive ? ' on' : ''}`}
          onKeyDown={this.keyPress}
          onBlur={this.dotBlur}
          tabIndex={-1}
        ></div>
      </div>
    );
  };

  render() {
    let { newPosi, newValue, dotActive } = this.state,
      { disabled, min, max, label, className, showRange, showInput, showTip } = this.props;
    return (
      <div className={`slider-box ${className || ''}${disabled ? ' disabled' : ''}`}>
        {label && <p className="slider-label">{label}</p>}
        <div className="slider-cont">
          <div className="slider-main">
            {/* runway */}
            <div className="slider-runway" ref={this.runwayRef} onMouseDown={this.clickRunway}>
              <div className="slider-bar" style={{ width: newPosi + '%' }}></div>
              {showTip ? (
                <WTooltip content={newValue}>{this.dotRender(newPosi, dotActive)}</WTooltip>
              ) : (
                this.dotRender(newPosi, dotActive)
              )}
            </div>
            {/* mark */}
            {showRange && (
              <div className="mark-box">
                <span className="m-left">{min}</span>
                <span className="m-right">{max}</span>
              </div>
            )}
          </div>
          {showInput && (
            <input
              type="text"
              onChange={this.change}
              value={newValue}
              autoComplete="off"
              disabled={disabled}
              spellCheck={false}
              onKeyPress={this.pressSubmit}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
