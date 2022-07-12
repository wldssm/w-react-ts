import React, { Component } from 'react';

import WIcon from '../Icon';
import './index.less';

interface Props {
  options: []; // 下拉菜单选项
  name?: string;
  prop?: string;
  placeholder: string;
  expanded: boolean; // 默认是否展开
  curIndex: number;
  disabled: boolean;
  width: string;
  canInput: boolean; // 能否输入
  value?: string; // 输入框的值
  maxLength?: number;
  className: string;
  leftNode?: any; // 输入框左边插槽
  rightNode?: any; // 输入框右边插槽
  onClick: (...param: any) => any; // 单击下拉菜单
  onSelect: (...param: any) => any; // 选中下拉菜单选项
  onChange: (...param: any) => any; // 输入事件
  onEnter: (...param: any) => any; // 回车事件
  onFocus?: (...param: any) => any; // 输入框获取焦点时触发
  onBlur?: (...param: any) => any; // 输入框失去焦点时触发
  optionRight: (...param: any) => any; // 选项插槽
  optionLeft: (...param: any) => any; // 选项插槽
}

class WDropDown extends Component<Props> {
  static defaultProps = {
    options: [],
    placeholder: '请选择',
    expanded: false,
    curIndex: 0,
    disabled: false,
    canInput: false,
    value: '',
    className: '',
    onClick: () => {},
    onChange: () => {},
    onEnter: () => {},
    onSelect: () => {},
    optionRight: () => {},
    optionLeft: () => {},
  };
  updateTimer: any = null;
  state = {
    ifExpanded: true,
  };

  // 当前显示的curIndex
  get curIndex() {
    let { options, curIndex } = this.props,
      len = options?.length || 0;
    if (len === 0) {
      return -1;
    }
    if (curIndex > len - 1) {
      return len - 1;
    }
    return curIndex;
  }

  componentDidMount() {
    let { expanded } = this.props;
    this.setState({
      ifExpanded: expanded,
    });

    document.addEventListener('click', this.hide);
  }
  componentWillUnmount() {
    if (this.updateTimer) clearTimeout(this.updateTimer);
    document.removeEventListener('click', this.hide);
  }
  // 点击其他区域隐藏
  hide = () => {
    if (this.props.disabled) return false;
    this.setState({ ifExpanded: false });
  };

  // 双向绑定数据
  change = (e: any) => {
    const target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.onChange(value, this.props.name);
  };

  // 回车提交
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      this.props.onEnter(this.props.name);
    }
  };

  // 获得焦点
  inputFocus = () => {
    this.props.onFocus && this.props.onFocus(this.props.name);
  };
  // 失去焦点
  inputBlur = () => {
    this.props.onBlur && this.props.onBlur(this.props.name);
  };

  // 整体点击
  click = (status: boolean, e: any) => {
    let { options, name } = this.props;
    e.preventDefault();
    if (this.props.disabled) return false;
    let curStatus = options?.length <= 0 ? status : !status;
    this.props.onClick(name, curStatus, options);
    if (options?.length <= 0) return false;
    this.toggle(status, e);
  };
  // 切换显示隐藏
  toggle = (status: boolean, e: any) => {
    if (this.props.disabled) return false;
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation(); // 阻止冒泡，防止触发全局事件
    this.updateTimer = setTimeout(() => {
      this.setState({ ifExpanded: !status });
    }, 0);
  };

  // 单击选项
  select = (item: any, index: number) => {
    this.props.onSelect(index, this.props.name, item);
  };

  render() {
    let { ifExpanded } = this.state,
      {
        value,
        placeholder,
        maxLength,
        className,
        leftNode,
        rightNode,
        options,
        canInput,
        width,
        prop,
        optionLeft,
        optionRight,
        disabled,
      } = this.props;
    return (
      <div
        className={`el-dropdown ${className}${disabled ? ' disabled' : ''}`}
        style={{ width: width }}
        onClick={this.click.bind(this, ifExpanded)}
      >
        {leftNode}
        {!canInput ? (
          <div className={`i-txt ${this.curIndex < 0 ? 'i-txt-place' : ''}`}>
            {this.curIndex >= 0
              ? prop && options[this.curIndex]
                ? options[this.curIndex][prop]
                : typeof options[this.curIndex] === 'object'
                ? JSON.stringify(options[this.curIndex])
                : options[this.curIndex]
              : placeholder}
          </div>
        ) : (
          <input
            type="text"
            value={value}
            autoComplete="off"
            className="i-txt"
            onChange={this.change}
            onKeyPress={this.keyPress}
            onFocus={this.inputFocus}
            onBlur={this.inputBlur}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        )}
        {rightNode}
        <WIcon
          className="icon-arrow"
          onClick={this.toggle.bind(this, ifExpanded)}
          code="&#xeb6d;"
        />
        {/* options */}
        {ifExpanded && options.length > 0 && (
          <div className="s-dd-box">
            {options.map((item, index) => {
              return (
                <div
                  className={`dd-item ${index === this.curIndex ? 'active' : ''}`}
                  key={Math.random().toString(36).substring(2)}
                  onClick={this.select.bind(this, item, index)}
                >
                  {optionLeft(item, index)}
                  {prop ? item[prop] : typeof item === 'object' ? JSON.stringify(item) : item}
                  {optionRight(item, index)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default WDropDown;
