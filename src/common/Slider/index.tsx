import React, { Component, createRef } from 'react';
import WTooltip from '../Tooltip/index';
import { isTouchDevice } from '../../assets/js/utils';

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
  onFocus?: (...param: any) => any; // 输入框获取焦点时触发
  onBlur?: (...param: any) => any; // 输入框失去焦点时触发
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
  runwayRef: React.RefObject<HTMLDivElement> = createRef();
  dotRef: React.RefObject<HTMLDivElement> = createRef();
  inputRef: React.RefObject<HTMLInputElement> = createRef();
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
    window.removeEventListener('touchmove', this.draging);
    window.removeEventListener('mouseup', this.dragEnd);
    window.removeEventListener('touchend', this.dragEnd);
    this.setState = () => {
      return;
    };
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
    if (isTouchDevice() && e.type !== 'touchstart') return false;
    if (this.props.disabled) return false;
    e?.persist();
    e?.preventDefault();

    if (e.type === 'touchstart') {
      e = e.touches[0];
    }
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
    if (isTouchDevice() && e.type !== 'touchstart') return false;
    if (this.props.disabled) return false;
    e?.persist();
    e?.preventDefault();
    e?.nativeEvent?.stopImmediatePropagation(); // 阻止冒泡，防止触发全局事件
    e.stopPropagation();

    this.isDrag = true;
    if (e.type === 'touchstart') {
      this.startPageX = e.touches[0].pageX;
    } else {
      this.startPageX = e.pageX;
    }

    this.setState(
      {
        initPosi:
          this.inputRef?.current === document.activeElement
            ? this.state.newPosi
            : this.getCurPosi(this.props.value),
        dotActive: true,
      },
      () => {
        this.dotRef?.current?.focus();
      },
    );
    let runwayPosi: any = this.runwayRef?.current?.getBoundingClientRect();
    this.runwayWidth = runwayPosi?.right - runwayPosi?.left;

    window.addEventListener('mousemove', this.draging, { passive: false });
    window.addEventListener('touchmove', this.draging, { passive: false });
    window.addEventListener('mouseup', this.dragEnd, { passive: false });
    window.addEventListener('touchend', this.dragEnd, { passive: false });
  };
  // 拖动中
  draging = (e: any) => {
    let { initPosi } = this.state;
    e?.preventDefault();
    if (this.isDrag) {
      if (e.type === 'touchmove') {
        e = e.touches[0];
      }

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
    let { newValue, newPosi } = this.state,
      { value, name } = this.props;
    if (newValue !== value) {
      this.setState({ initPosi: newPosi });
      this.props.onChange && this.props.onChange(newValue, name);
    }
    window.removeEventListener('mousemove', this.draging);
    window.removeEventListener('touchmove', this.draging);
    window.removeEventListener('mouseup', this.dragEnd);
    window.removeEventListener('touchend', this.dragEnd);
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
      realValue = target.type === 'checkbox' ? target.checked : target.value;
    if (!/^-?[0-9]*$|^-?[0-9]+(\.[0-9]*)?$/.test(realValue)) {
      return false;
    }

    let value = this.getCurValue(realValue);
    if (realValue === value) {
      this.setState({
        newPosi: this.getCurPosi(value),
        newValue: realValue,
      });

      this.props.onInput && this.props.onInput(value, this.props.name);
    } else {
      this.setState({
        newValue: realValue,
      });
    }
  };
  // 回车提交
  pressSubmit = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      let curValue = this.getCurValue(this.state.newValue);
      this.setState({
        newPosi: this.getCurPosi(curValue),
        newValue: curValue,
      });
      this.props.onChange && this.props.onChange(curValue, this.props.name);
    }
  };
  // 输入框失去焦点
  inputBlur = () => {
    let { newValue, dotActive } = this.state,
      { name, value } = this.props;
    if (dotActive) {
      return false;
    }
    let realValue = this.getCurValue(newValue);
    if (realValue !== newValue) {
      this.setState({
        newPosi: this.getCurPosi(realValue),
        newValue: realValue,
      });
    }
    if (realValue !== value) {
      this.props.onInput && this.props.onInput(realValue, name);
      this.props.onChange && this.props.onChange(realValue, name);
    }
    this.props.onBlur && this.props.onBlur(realValue, name);
  };
  // 输入框获取焦点时
  inputFocus = (e: any) => {
    let { name, value } = this.props;
    this.props.onFocus && this.props.onFocus(value, name, e);
  };

  // 左右按键位移
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode,
      { step, name } = this.props,
      curValue = this.state.newValue;

    if (curKey === 37 || curKey === 40) {
      // 左移
      curValue -= step;
    } else if (curKey === 38 || curKey === 39) {
      // 右
      curValue += step;
    }
    curValue = this.getCurValue(curValue);
    if (curValue !== this.state.newValue) {
      this.setState({
        newPosi: this.getCurPosi(curValue),
        newValue: curValue,
      });
      this.props.onChange && this.props.onChange(curValue, name);
    }
  };
  // 点击其他区域圆点失去焦点
  dotBlur = () => {
    this.setState({ dotActive: false });
  };
  // 圆点渲染
  dotRender = (newPosi: any, dotActive: any) => {
    return (
      <div
        className="slider-dot-box"
        style={{ left: newPosi + '%' }}
        onMouseDown={this.mouseDown}
        onTouchStart={this.mouseDown}
      >
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
            <div
              className="slider-runway"
              ref={this.runwayRef}
              onMouseDown={this.clickRunway}
              onTouchStart={this.clickRunway}
            >
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
              ref={this.inputRef}
              type="text"
              onChange={this.change}
              value={newValue}
              autoComplete="off"
              disabled={disabled}
              spellCheck={false}
              onKeyPress={this.pressSubmit}
              onFocus={this.inputFocus}
              onBlur={this.inputBlur}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
