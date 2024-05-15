import React, { Component, createRef } from 'react';
import WTooltip from '../Tooltip/index';

import './index.less';

interface Props {
  value: number | number[]; // 当前值
  min: number; // 最小值
  max: number; // 最大值
  step: number; // 步长
  label?: string; // label文本
  name?: string;
  range: boolean; // 是否为范围选择
  showTip: boolean; // 显示tooltip
  showRange: boolean; // 显示最大值最小值
  showInput: boolean; // 显示输入框
  disabled: boolean; // 禁用
  className: string;
  onChange?: (...param: any) => any; // 值改变时触发（松开鼠标后）
  onInput?: (...param: any) => any; // 拖拽、输入时时触发，未矫正最大最小
  onFocus?: (...param: any) => any; // 输入框获取焦点时触发
  onBlur?: (...param: any) => any; // 输入框失去焦点时触发
}

class Slider extends Component<Props> {
  static defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    range: false,
    showTip: true,
    showRange: false,
    showInput: false,
    disabled: false,
    name: '',
    className: '',
  };
  state = {
    newPosi: [0, 0], // 当前位置
    newValue: [0, 0], // 当前value值
    initPosi: 0, // 拖动的初始posi
    curIndex: -1, // 当前操作的点index，没操作则-1。
  };
  runwayRef: React.RefObject<HTMLDivElement> = createRef();
  dotRef: React.RefObject<HTMLDivElement> = createRef();
  inputRef: React.RefObject<HTMLInputElement> = createRef();
  runwayWidth = 0;
  startPageX = 0; // 鼠标相对页面的位置（鼠标按下圆点）
  isDrag = false; // 拖动中

  // 获取小数位个数
  get precision() {
    const { min, max, step } = this.props;
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
    if (this.props.value !== prevProps.value || this.props.range !== prevProps.range) {
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
    let { value, range } = this.props,
      realValue = value,
      newPosi = [0, 0];
    if (range) {
      realValue = typeof realValue === 'number' ? [realValue, 0] : realValue;

      realValue =
        realValue &&
        realValue.map((item, index) => {
          item = parseFloat((+item).toFixed(this.precision));
          item = this.getLimitValue(item);
          newPosi[index] = this.getCurPosi(item);
          return item;
        });

      if (realValue[0] > realValue[1]) {
        realValue = [realValue[1], realValue[0]];
        newPosi = [newPosi[1], newPosi[0]];
      }
    } else {
      // realValue = parseFloat((+realValue).toFixed(this.precision));
      realValue = [this.getLimitValue(realValue)];
      newPosi[0] = this.getCurPosi(realValue);
    }

    this.setState({
      newPosi,
      newValue: realValue,
    });
  };

  // 限定值的范围
  getLimitValue = (value: any) => {
    const { min, max } = this.props;
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    return value;
  };

  // 获取圆点当前位置
  getCurPosi = (value: any) => {
    const { min, max } = this.props;
    value = this.getLimitValue(value);
    return ((value - min) / (max - min)) * 100;
  };

  // 点击跑道选择
  clickRunway = (e: any) => {
    if (this.props.disabled) return false;
    e?.persist();
    e?.preventDefault();

    if (e.type === 'touchstart') {
      e = e.touches[0];
    }
    let runwayPosi: any = this.runwayRef?.current?.getBoundingClientRect();
    this.runwayWidth = runwayPosi?.right - runwayPosi?.left;
    let newPosi = ((e.pageX - runwayPosi?.left) / this.runwayWidth) * 100;

    let clickRes = this.calcStep(newPosi);
    if (clickRes) {
      let { range } = this.props,
        changeIndex = 0,
        { newPosi: clickPosi, newValue: clickValue } = clickRes,
        { newPosi: finalPosi, newValue: finalValue } = this.state;

      if (range && clickPosi > finalPosi[0]) {
        changeIndex = 1;
      }
      finalValue[changeIndex] = clickValue;
      finalPosi[changeIndex] = clickPosi;

      this.setState({ newPosi: finalPosi, newValue: finalValue }, () => {
        this.props.onInput &&
          this.props.onInput(range ? finalValue : finalValue[0], this.props.name);
        this.props.onChange &&
          this.props.onChange(range ? finalValue : finalValue[0], this.props.name);
      });
    }
  };
  // 鼠标按下圆点
  mouseDown = (index: number, e: any) => {
    if (this.props.disabled) return false;
    e?.persist();
    e?.preventDefault();
    e?.nativeEvent?.stopImmediatePropagation(); // 阻止冒泡，防止触发全局事件
    e.stopPropagation();

    let { newPosi } = this.state;

    this.isDrag = true;
    if (e.type === 'touchstart') {
      this.startPageX = e.touches[0].pageX;
    } else {
      this.startPageX = e.pageX;
    }

    this.setState(
      {
        initPosi: newPosi[index],
        curIndex: index,
      },
      () => {
        // 为了按键修改
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
    let { initPosi, curIndex, newPosi: finalPosi, newValue: finalValue } = this.state;

    e?.preventDefault();
    if (this.isDrag) {
      if (e.type === 'touchmove') {
        e = e.touches[0];
      }

      let { range } = this.props,
        diffX = ((e.pageX - this.startPageX) / this.runwayWidth) * 100,
        newPosi = initPosi + diffX,
        calcRes = this.calcStep(newPosi);

      if (calcRes) {
        finalValue[curIndex] = calcRes.newValue;
        finalPosi[curIndex] = calcRes.newPosi;

        let { value, posi, curIndex: newIndex } = this.getOrderValue(finalValue, finalPosi);

        this.setState({ newPosi: posi, newValue: value, curIndex: newIndex }, () => {
          this.props.onInput && this.props.onInput(range ? value : value[0], this.props.name);
        });
      }
    }
  };
  // 停止拖动
  dragEnd = () => {
    this.isDrag = false;
    let { newValue, newPosi, curIndex } = this.state,
      { name, range } = this.props;

    this.setState({ initPosi: newPosi[curIndex] });
    this.props.onChange && this.props.onChange(range ? newValue : newValue[0], name);
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

    let value = this.getLimitValue(realValue);
    if (realValue === value) {
      this.setState({
        newPosi: [this.getCurPosi(value)],
        newValue: [realValue, 0],
      });

      this.props.onInput && this.props.onInput(value, this.props.name);
    } else {
      this.setState({
        newValue: [realValue, 0],
      });
    }
  };
  // 回车提交
  pressSubmit = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      let curValue = this.getLimitValue(this.state.newValue[0]);
      this.setState({
        newPosi: [this.getCurPosi(curValue), 0],
        newValue: [curValue, 0],
      });
      this.props.onChange && this.props.onChange(curValue, this.props.name);
      this.props.onInput && this.props.onInput(curValue, this.props.name);
    }
  };
  // 输入框失去焦点
  inputBlur = () => {
    let { newValue, curIndex } = this.state,
      { name, value } = this.props;
    if (curIndex !== -1) {
      return false;
    }
    let realValue = this.getLimitValue(newValue[0]);
    if (realValue !== newValue[0]) {
      this.setState({
        newPosi: [this.getCurPosi(realValue), 0],
        newValue: [realValue, 0],
      });
    }
    if (realValue !== +value) {
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
      { step, name, range } = this.props,
      { newValue: newV, newPosi: newP, curIndex } = this.state,
      curValue: any = newV[curIndex];

    if (curKey === 37 || curKey === 40) {
      // 左移
      curValue -= step;
    } else if (curKey === 38 || curKey === 39) {
      // 右
      curValue += step;
    }

    curValue = this.getLimitValue(curValue);
    if (curValue !== newV[curIndex]) {
      newV[curIndex] = curValue;
      newP[curIndex] = this.getCurPosi(curValue);

      let { value, posi, curIndex: newIndex } = this.getOrderValue(newV, newP);
      this.setState({
        curIndex: newIndex,
        newPosi: value,
        newValue: posi,
      });
      this.props.onChange && this.props.onChange(range ? value : value[0], name);
    }
  };
  // 点击其他区域圆点失去焦点
  dotBlur = () => {
    this.setState({ curIndex: -1 });
  };

  // 根据圆点位置，获取横线位置
  getBarPosi = () => {
    let { newPosi } = this.state,
      { range } = this.props;

    if (!range) {
      return { width: newPosi[0] + '%' };
    }

    return { width: newPosi[1] - newPosi[0] + '%', left: newPosi[0] + '%' };
  };

  // 获取顺序值[min,max]
  getOrderValue = (value: any, posi: any) => {
    let { range } = this.props,
      { curIndex } = this.state;
    if (range && value[0] > value[1]) {
      value = [value[1], value[0]];
      posi = [posi[1], posi[0]];
      if (curIndex !== -1) {
        curIndex = curIndex === 0 ? 1 : 0;
      }
    }
    return { value, posi, curIndex };
  };

  // 单圆点渲染
  dotStyleRender = (index: number, newPosi: any) => {
    let { curIndex } = this.state;
    return (
      <div
        data-index={index}
        className="slider-dot-box"
        style={{ left: newPosi + '%' }}
        onTouchStart={(e) => this.mouseDown(index, e)}
        onMouseDown={(e) => this.mouseDown(index, e)}
      >
        <div
          ref={this.dotRef}
          className={`slider-dot${curIndex === index ? ' on' : ''}`}
          onKeyDown={(e) => this.keyPress(e)}
          onBlur={this.dotBlur}
          tabIndex={-1}
        ></div>
      </div>
    );
  };

  // 圆点位置渲染
  dotRender = (index: number) => {
    let { newPosi, newValue } = this.state,
      { showTip } = this.props;
    return showTip ? (
      <WTooltip content={newValue[index]}>{this.dotStyleRender(index, newPosi[index])}</WTooltip>
    ) : (
      this.dotStyleRender(index, newPosi[index])
    );
  };

  render() {
    let { newValue } = this.state,
      { disabled, min, max, label, className, showRange, showInput, range } = this.props;
    return (
      <div className={`slider-box ${className || ''}${disabled ? ' disabled' : ''}`}>
        {label && <p className="slider-label">{label}</p>}
        <div className="slider-cont">
          <div className="slider-main">
            {/* runway */}
            <div
              className="slider-runway"
              ref={this.runwayRef}
              onTouchStart={this.clickRunway}
              onMouseDown={this.clickRunway}
            >
              <div className="slider-bar" style={this.getBarPosi()}></div>
              {this.dotRender(0)}
              {range && this.dotRender(1)}
            </div>
            {/* mark */}
            {showRange && (
              <div className="mark-box">
                <span className="m-left">{min}</span>
                <span className="m-right">{max}</span>
              </div>
            )}
          </div>
          {showInput && !range && (
            <input
              ref={this.inputRef}
              type="text"
              onChange={this.change}
              value={newValue[0]}
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
